<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/adminManage/index' }"
        name="asd"
      ><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/users/index' }"><strong>用户管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <div class="app-container">
      <el-tabs
        v-model="activeName"
        tab-position="left"
        style="height: 480px"
        @tab-click="tabClick"
      >
        <el-tab-pane
          label="用户简介"
          name="profile"
        >
          <user-edit-profile v-if="tabName==='profile'" />
        </el-tab-pane>
        <el-tab-pane
          label="配置管理"
          name="account"
        >
          <user-edit-account v-if="tabName==='account'" />
        </el-tab-pane>
        <el-tab-pane
          label="角色管理"
          name="groups"
        >
          <user-edit-groups v-if="tabName==='groups'" />
        </el-tab-pane>
        <el-tab-pane
          label="定时任务补偿"
          name="tenants"
        >
          <user-edit-tenants v-if="tabName==='tenants'" />
        </el-tab-pane>
      </el-tabs>
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
      tabName: 'profile'
    }
  },
  mounted() {
    // this.userProfile = { ...this.userProfile, ...this.$route.params }
  },
  methods: {
    tabClick(tab, event) {
      this.tabName = tab.name
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
