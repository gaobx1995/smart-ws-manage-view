<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/users/index' }"><strong>用户管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
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
            <el-menu-item index="profile">
              <span slot="title">用户简介</span>
            </el-menu-item>
            <el-menu-item index="account">
              <span slot="title">账户管理</span>
            </el-menu-item>
            <el-menu-item index="groups">
              <span slot="title">组管理</span>
            </el-menu-item>
            <el-menu-item index="tenants">
              <span slot="title">租户管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21">
          <div style="max-height:500px;overflow:auto;">
            <user-edit-profile v-if="tabName==='profile'" :user-info="userInfo" />
            <user-edit-account v-if="tabName==='account'" :user-info="userInfo" />
            <user-edit-groups v-if="tabName==='groups'" :user-info="userInfo" />
            <user-edit-tenants v-if="tabName==='tenants'" :user-info="userInfo" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import userEditProfile from './editForm/profile'
import userEditAccount from './editForm/account'
import userEditGroups from './editForm/groups'
import userEditTenants from './editForm/tenants'
export default {
  name: 'UsersEdit',
  components: {
    userEditProfile,
    userEditAccount,
    userEditGroups,
    userEditTenants
  },
  data() {
    return {
      activeName: 'profile',
      tabName: 'profile',
      userInfo: {
        id: '',
        email: '',
        first: '',
        last: ''
      }
    }
  },
  mounted() {
    this.handleSelect('profile')
  },
  methods: {
    handleSelect(val) {
      this.tabName = val
      this.getUserInfo()
    },
    getUserInfo() {
      this.$fetch('/ws/admin/user/resource/getProfile?userId=' + this.$route.query.id, {}, 'get')
        .then(res => {
          if (res.code === '0000') {
            this.userInfo = { ...this.userInfo, ...res.data }
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
