<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/groups/index' }"><strong>组管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>编辑组</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <div class="app-container">
      <el-row>
        <el-col :span="3">
          <el-menu
            :default-active="activeName"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item index="information">
              <span slot="title">基本信息</span>
            </el-menu-item>
            <el-menu-item index="tenants">
              <span slot="title">租户管理</span>
            </el-menu-item>
            <el-menu-item index="userManage">
              <span slot="title">用户管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21">
          <div style="max-height:500px;overflow:auto;">
            <group-edit-information v-if="tabName==='information'" :group-info="groupInfo" />
            <group-edit-tenant v-if="tabName==='tenants'" :group-info="groupInfo" />
            <group-edit-users v-if="tabName==='userManage'" :group-info="groupInfo" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import groupEditInformation from './editForm/information'
import groupEditTenant from './editForm/tenants'
import groupEditUsers from './editForm/users'
export default {
  name: 'GroupsEdit',
  components: {
    groupEditInformation,
    groupEditTenant,
    groupEditUsers
  },
  data() {
    return {
      activeName: 'information',
      tabName: 'information',
      groupInfo: {
        id: '',
        name: '',
        type: ''
      }
    }
  },
  mounted() {
    this.handleSelect('information')
  },
  methods: {
    handleSelect(val) {
      this.tabName = val
      this.getGroupInfo()
    },
    getGroupInfo() {
      this.$fetch('/ws/admin/group/resource/getGroupById?groupId=' + this.$route.query.id, {}, 'get')
        .then(res => {
          if (res.code === '0000') {
            this.groupInfo = { ...this.groupInfo, ...res.data }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0;
}
.el-breadcrumb {
  background-color: #ffffff;
  margin: 0;
  padding: 9px 10px 0 10px;
  height: 35px;
}
</style>
