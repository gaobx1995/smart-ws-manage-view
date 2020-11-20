<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/tenants/index' }"><strong>租户管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>编辑租户</el-breadcrumb-item>
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
            <el-menu-item index="groups">
              <span slot="title">组管理</span>
            </el-menu-item>
            <el-menu-item index="userManage">
              <span slot="title">用户管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21">
          <div style="max-height:500px;overflow:auto;">
            <tenant-edit-information v-if="tabName==='information'" :tenant-info="tenantInfo" />
            <tenant-edit-groups v-if="tabName==='groups'" :tenant-info="tenantInfo" />
            <tenant-edit-users v-if="tabName==='userManage'" :tenant-info="tenantInfo" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import tenantEditGroups from './editForm/groups'
import tenantEditInformation from './editForm/information'
import tenantEditUsers from './editForm/users'
export default {
  name: 'TenantsEdit',
  components: {
    tenantEditInformation,
    tenantEditUsers,
    tenantEditGroups
  },
  data() {
    return {
      activeName: 'information',
      tabName: 'information',
      tenantInfo: {}
    }
  },
  mounted() {
    this.handleSelect('information')
  },
  methods: {
    handleSelect(val) {
      this.tabName = val
      this.getTenantInfo()
    },
    getTenantInfo() {
      this.$fetch('/ws/admin/tenant/resource/getTenantById?tenantId=' + this.$route.query.id, {}, 'get')
        .then(res => {
          if (res.code === '0000') {
            this.tenantInfo = { ...this.tenantInfo, ...res.data }
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
