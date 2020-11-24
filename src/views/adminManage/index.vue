<template>
  <div class="app-main">
    <div class="app-container">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkTo(userLinkOptions[1].link)">用户管理</el-link>
            </div>
            <div v-if="getAll" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(userLinkOptions[0].link)">{{ userLinkOptions[0].name }}</el-link>
            </div>
            <div v-if="userList" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(userLinkOptions[1].link)">{{ userLinkOptions[1].name }}</el-link>
            </div>
            <div style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(userLinkOptions[2].link)">{{ userLinkOptions[2].name }}</el-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkTo(groupLinkOptions[1].link)">组管理</el-link>
            </div>
            <div v-if="userCreate" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(groupLinkOptions[0].link)">{{ groupLinkOptions[0].name }}</el-link>
            </div>
            <div v-if="userList" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(groupLinkOptions[1].link)">{{ groupLinkOptions[1].name }}</el-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkTo(tenantsLinkOptions[1].link)">租户管理</el-link>
            </div>
            <div v-if="userCreate" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(tenantsLinkOptions[0].link)">{{ tenantsLinkOptions[0].name }}</el-link>
            </div>
            <div v-if="userList" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(tenantsLinkOptions[1].link)">{{ tenantsLinkOptions[1].name }}</el-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkTo(authorizationsLinkOptions[0].link)">授权管理</el-link>
            </div>
            <div v-if="userList" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(authorizationsLinkOptions[0].link)">{{ authorizationsLinkOptions[0].name }}</el-link>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminManage',
  data() {
    return {
      adminListData: [{ label: 'user' }],
      userCreate: sessionStorage.getItem('user_create'),
      userList: sessionStorage.getItem('user_list'),
      groupCreate: sessionStorage.getItem('group_create'),
      groupList: sessionStorage.getItem('group_list'),
      tenantCreate: sessionStorage.getItem('tenant_create'),
      tenantList: sessionStorage.getItem('tenant_list'),
      authorizationCreate: sessionStorage.getItem('authorization_create'),
      authorizationList: sessionStorage.getItem('authorization_list'),
      userLinkOptions: [{ name: '创建新用户', link: '/adminManage/users/form', rel: 'create' }, { name: '用户列表', link: '/adminManage/users/index', rel: 'list' },
        { name: '我的简介', link: '/adminManage/users/edit' }],
      groupLinkOptions: [{ name: '创建新组', link: '/adminManage/groups/form', rel: 'create' }, { name: '组列表', link: '/adminManage/groups/index', rel: 'list' }],
      tenantsLinkOptions: [{ name: '创建新租户', link: '/adminManage/tenants/form', rel: 'create' }, { name: '租户列表', link: '/adminManage/tenants/index', rel: 'list' }],
      authorizationsLinkOptions: [{ name: '管理授权', link: '/adminManage/authorizations/index', rel: 'list' }]
    }
  },
  computed: {
    getAll() {
      return sessionStorage.getItem('user_create')
    }
  },
  created() {
    this.getAllResourceOpts()
  },
  methods: {
    linkTo(link) {
      let params = {}
      if (link === '/adminManage/users/edit') {
        params = {
          id: this.$utils.getLoginInfo('zy-user-id'),
          first: this.$utils.getLoginInfo('zy-user-first'),
          last: this.$utils.getLoginInfo('zy-user-last'),
          email: this.$utils.getLoginInfo('zy-user-email')
        }
      } else {
        params = undefined
      }
      this.$router.push({
        path: link,
        query: {
          ...params,
          t: +new Date()
        }
      })
    },
    getAllResourceOpts() {
      const allP = Promise.all([
        this.$fetch('/ws/admin/user/resource/options?resourceId=1', {}, 'get'),
        this.$fetch('/ws/admin/group/resource/options?resourceId=2', {}, 'get'),
        this.$fetch('/ws/admin/tenant/resource/options?resourceId=11', {}, 'get'),
        this.$fetch('/ws/admin/authorization/resource/options?resourceId=4', {}, 'get'),
        this.$fetch('/ws/admin/tenant/resource/member/options?resourceId=12', {}, 'get'),
        this.$fetch('/ws/admin/group/resource/membership/options?resourceId=3', {}, 'get')
      ])
      allP
        .then((res) => {
          if (res[0].code === '0000') {
            const operPermissions = res[0].data.links.map(item => {
              return item.rel
            })
            sessionStorage.setItem('user_opermissions', operPermissions)
          }
          if (res[1].code === '0000') {
            const operPermissions = res[1].data.links.map(item => {
              return item.rel
            })
            sessionStorage.setItem('group_opermissions', operPermissions)
          }
          if (res[2].code === '0000') {
            const operPermissions = res[2].data.links.map(item => {
              return item.rel
            })
            sessionStorage.setItem('tenant_opermissions', operPermissions)
          }
          if (res[3].code === '0000') {
            const operPermissions = res[3].data.links.map(item => {
              return item.rel
            })
            sessionStorage.setItem('authorization_opermissions', operPermissions)
          }
          if (res[4].code === '0000') {
            const operPermissions = res[4].data.links.map(item => {
              return item.rel
            })
            sessionStorage.setItem('tenant_member_opermissions', operPermissions)
          }
          if (res[5].code === '0000') {
            const operPermissions = res[5].data.links.map(item => {
              return item.rel
            })
            sessionStorage.setItem('group_member_opermissions', operPermissions)
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  margin: 10px 0 20px 0;
  height: 250px;
}
.app-container{
  background: #e5e5e5;
}
</style>
