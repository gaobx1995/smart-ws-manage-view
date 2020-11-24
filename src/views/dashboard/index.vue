<template>
  <div class="dashboard-container">
    <div class="applications">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>应用</span>
        </div>
        <el-row :gutter="12">
          <!-- <el-col :span="8" :push="2">
            <svg-icon class="app-svg" icon-class="cockpit" @click="clickLinkOther" />
            <br>
            <span class="app-name">Cockpit</span>
          </el-col>
          <el-col :span="8" :push="2">
            <svg-icon class="app-svg" icon-class="tasklist" />
            <br>
            <span class="app-name">Tasklist</span>
          </el-col> -->
          <el-col v-for="(item,key) in appsData " :key="key" :span="8" :push="2">
            <span @click="clickLinkTo(item)">
              <svg-icon class="app-svg" :icon-class="item" />
              <br>
              <span class="app-name">{{ item }}</span>
            </span>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="profile">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>简介</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </div>
    <div class="links">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>链接</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      appsData: [],
      userLinkOptions: [{ name: '创建新用户', link: '/adminManage/users/form', rel: 'create' }, { name: '用户列表', link: '/adminManage/users/index', rel: 'list' },
        { name: '我的简介', link: '/adminManage/users/edit' }],
      groupLinkOptions: [{ name: '创建新组', link: '/adminManage/groups/form', rel: 'create' }, { name: '组列表', link: '/adminManage/groups/index', rel: 'list' }],
      tenantsLinkOptions: [{ name: '创建新租户', link: '/adminManage/tenants/form', rel: 'create' }, { name: '租户列表', link: '/adminManage/tenants/index', rel: 'list' }],
      authorizationsLinkOptions: [{ name: '管理授权', link: '/adminManage/authorizations/index', rel: 'list' }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getApps()
    this.getAllOptions()
  },
  methods: {
    clickLinkTo(val) {
      if (val === 'admin') {
        this.$router.push({
          path: '/adminManage/index',
          query: {
            t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
          }
        })
      } else {
        alert('未配置其他路径')
      }
    },
    clickLinkOther() {
      // window.open('http://10.15.2.10:34827/login?redirect=%2Fdashboard', '_blank')
      window.location.href = 'http://10.15.2.10:34827/dashboard'
    },
    getApps() {
      this.$fetch('/ws/admin/authorization/apps', {}, 'get')
        .then(res => {
          if (res.code === '0000') {
            this.appsData = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err
          })
        })
    },
    getAllOptions() {
      const allP = Promise.all([
        this.$fetch('/ws/admin/user/options', {}, 'get'),
        this.$fetch('/ws/admin/group/options', {}, 'get'),
        this.$fetch('/ws/admin/tenant/options', {}, 'get'),
        this.$fetch('/ws/admin/authorization/options', {}, 'get')
      ])
      allP
        .then((res) => {
          if (res[0].code === '0000') {
            this.userLinkOptions.forEach(item => {
              res[0].data.links.forEach(i => {
                if (item.rel === i.rel) {
                  sessionStorage.setItem('user_' + item.rel, item.rel)
                }
              })
            })
          }
          if (res[1].code === '0000') {
            this.groupLinkOptions.forEach(item => {
              res[1].data.links.forEach(i => {
                if (item.rel === i.rel) {
                  sessionStorage.setItem('group_' + item.rel, item.rel)
                }
              })
            })
          }
          if (res[2].code === '0000') {
            this.tenantsLinkOptions.forEach(item => {
              res[2].data.links.forEach(i => {
                if (item.rel === i.rel) {
                  sessionStorage.setItem('tenant_' + item.rel, item.rel)
                }
              })
            })
          }
          if (res[3].code === '0000') {
            res[3].data.links.forEach(i => {
              this.authorizationsLinkOptions.forEach(item => {
                console.log(item)
                if (item.rel === i.rel) {
                  sessionStorage.setItem('authorization_' + item.rel, item.rel)
                }
              })
            })
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
.applications{
  width: 70%;
  float: left;
  margin-bottom: 30px;
}
.profile{
  width: 25%;
  float: right;
  margin-bottom: 30px;
}
.links{
  width: 70%;
  float: left;
  margin-bottom: 30px;
}

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.app-svg{
  font-size:8em;
  margin: 10px 0;
  cursor: pointer;
}
.app-name{
   font-size:1.5em;
   color: #155cb5;
   margin: 0 20px;
   cursor: pointer;
}
</style>
