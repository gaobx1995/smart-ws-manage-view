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
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="审批人">
          <el-input
            v-model="formInline.user"
            placeholder="审批人"
          />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select
            v-model="formInline.region"
            placeholder="活动区域"
          >
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
          <el-button
            type="primary"
            @click="query"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersIndex',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
  },
  methods: {
    query() {},
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
.app-container {
  margin: 0;
  background: #ffffff;
}
</style>
