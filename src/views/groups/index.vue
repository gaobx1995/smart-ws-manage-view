<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>组管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <div class="app-container">
      <el-form
        :inline="true"
        :model="queryForm"
        class="app-form app-form-shadow"
      >
        <el-form-item label="ID">
          <el-input v-model="queryForm.id" placeholder="请输入ID" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="queryForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="queryForm.type" placeholder="请输入类型" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <groups-list
        ref="groupsList"
        :query-form="queryForm"
        class="app-table"
      />
      <el-dialog
        :title="formTitle"
        :visible.sync="formDialog"
        top="5vh"
        width="70%"
        center
      >
        <groups-form
          :form-data="formData"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import groupsList from './list'
import groupsForm from './form'
export default {
  name: 'GroupsIndex',
  components: {
    groupsList,
    groupsForm
  },
  data() {
    return {
      formData: {},
      formTitle: '',
      formDialog: false,
      queryForm: {
        id: '',
        name: '',
        type: ''
      }
    }
  },
  mounted() {
    this.query()
  },

  methods: {
    query() {
      this.$refs.groupsList.getList('query')
      this.formDialog = false
    },
    add() {
      this.formTitle = '新增组'
      this.formData.operate = 'add'
      this.formDialog = true
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
