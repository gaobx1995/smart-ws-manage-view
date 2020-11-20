<template>
  <div class="app-main">
    <el-divider v-if="!operGroup" />
    <el-breadcrumb v-if="!operGroup" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider v-if="!operGroup" />
    <div class="app-container">
      <el-form
        v-if="!operGroup"
        :inline="true"
        :model="searchForm.data"
        class="app-form app-form-shadow"
      >
        <el-form-item label="First Name">
          <el-input v-model="searchForm.data.first" placeholder="请输入First Name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="searchForm.data.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query('query')">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button icon="el-icon-plus" plain @click="add">创建用户</el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        class="app-table"
        header-cell-class-name="headercell"
        stripe
        max-height="550"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="id"
          label="ID"
        />
        <el-table-column
          align="center"
          prop="first"
          label="first"
        />
        <el-table-column
          align="center"
          prop="last"
          label="last"
        />
        <el-table-column
          align="center"
          prop="email"
          label="邮箱"
        />
        <el-table-column
          v-if="!operGroup"
          fixed="right"
          label="操作"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleUpdate(scope.row)"
            >编辑</el-button>
            <!-- <el-button
              type="text"
              @click="handleDelete(scope.row)"
            >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float:right"
        :current-page="searchForm.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchForm.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersIndex',
  props: {
    operGroup: {
      type: Boolean,
      default: false
    },
    operGroupId: { // 组ID
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      searchForm: {
        data: {
          first: '',
          email: ''
        },
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.query()
  },

  methods: {
    add() {
      this.$router.push({
        path: '/adminManage/users/form',
        query: {
          t: +new Date()
        }
      })
    },

    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.query()
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.query()
    },
    handleUpdate(row) {
      this.$router.push({
        path: '/adminManage/users/edit',
        query: {
          id: row.id,
          t: +new Date()
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$fetch('/ws/admin/user/resource/delete?userId=' + row.id, {}, 'delete')
            .then(res => {
              this.query()
            })
            .catch(err => {
              this.$notify.error({
                title: '错误',
                message: err
              })
            })
        })
    },
    query(val) {
      this.loading = true
      if (val === 'query') {
        this.searchForm.pageNum = 1
      }
      if (this.operGroup) { // group查询
        this.searchForm.data.groupId = this.operGroupId
      }
      this.$fetch('/ws/admin/user/list', { ...this.searchForm }, 'post')
        .then(res => {
          if (res.code === '0000') {
            this.tableData = res.data.data
            this.searchForm.pageSize = res.data.pageSize
            this.searchForm.pageNum = res.data.pageNum
            this.searchForm.total = res.data.total
            this.loading = false
          } else {
            this.$notify.error({
              title: '错误',
              message: res.msg
            })
            this.loading = false
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err
          })
          this.loading = false
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
.app-main{
   background: #ffffff;
}
</style>
