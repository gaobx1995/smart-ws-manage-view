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
      <el-row>
        <el-col :span="3">
          <el-menu
            default-active="profile"
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
            <user-edit-profile v-if="tabName==='profile'" />
            <user-edit-account v-if="tabName==='account'" />
            <user-edit-groups v-if="tabName==='groups'" />
            <user-edit-tenants v-if="tabName==='tenants'" />
          </div>
        </el-col>
      </el-row>
      <!-- <el-tabs
        v-model="activeName"
        tab-position="left"
        @tab-click="tabClick"
      >
        <el-tab-pane
          label="用户简介"
          name="profile"
        >
          <user-edit-profile v-if="tabName==='profile'" />
        </el-tab-pane>
        <el-tab-pane
          label="账户管理"
          name="account"
        >
          <user-edit-account v-if="tabName==='account'" />
        </el-tab-pane>
        <el-tab-pane
          label="组管理"
          name="groups"
        >
          <user-edit-groups v-if="tabName==='groups'" />
        </el-tab-pane>
        <el-tab-pane
          label="租户管理"
          name="tenants"
        >
          <user-edit-tenants v-if="tabName==='tenants'" />
        </el-tab-pane>
      </el-tabs> -->
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
    this.handleSelect('profile')
    // this.userProfile = { ...this.userProfile, ...this.$route.params }
  },
  methods: {
    tabClick(tab, event) {
      this.tabName = tab.name
    },
    handleSelect(val) {
      this.tabName = val
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
