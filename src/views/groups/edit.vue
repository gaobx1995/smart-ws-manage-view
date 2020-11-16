<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/adminManage/index' }"
        name="asd"
      ><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/groups/index' }"><strong>组管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>编辑组</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <div class="app-container">
      <el-row>
        <el-col :span="3">
          <el-menu
            default-active="information"
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
            <group-edit-information v-if="tabName==='information'" />
            <user-edit-account v-if="tabName==='tenants'" />
            <user-edit-manage v-if="tabName==='userManage'" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import groupEditInformation from './editForm/information'
import userEditManage from '../users/index'
export default {
  name: 'GroupsEdit',
  components: {
    groupEditInformation,
    userEditManage
  },
  data() {
    return {
      activeName: 'information',
      tabName: 'information'
    }
  },
  mounted() {
    this.handleSelect('information')
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
