<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userManage/index' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <div class="app-container">
      <el-form
        :inline="true"
        :model="queryForm"
        class="demo-form-inline"
      >
        <el-form-item label="审批人">
          <el-input v-model="queryForm.user" placeholder="审批人" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="queryForm.region" placeholder="活动区域">
            <el-option
              label="区域一"
              value="shanghai"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <users-list
        ref="usersList"
        :query-form="queryForm"
      />
      <el-dialog
        :title="formTitle"
        :visible.sync="formDialog"
        width="60%"
        center
      >
        <users-form />

      </el-dialog>
    </div>
  </div>
</template>

<script>
import usersList from './list'
import usersForm from './form'
export default {
  name: 'UsersIndex',
  components: {
    usersList,
    usersForm
  },
  data() {
    return {
      formTitle: '',
      formDialog: false,
      queryForm: {
        user: '11',
        region: 'shanghai'
      }
    }
  },
  mounted() {
  },

  methods: {
    query() {},
    add() {
      this.formTitle = '新增'
      this.formDialog = true
    },
    handleClick(tab, event) {
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
// .app-container {
//   margin: 0;
//   background: #ffffff;
// }
.app-main{
   background: #ffffff;
}
</style>
