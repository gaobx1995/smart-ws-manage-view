<template>
  <div class="app-main">
    <el-divider v-if="!operUserGroup" />
    <el-breadcrumb v-if="!operUserGroup" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>组管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider v-if="!operUserGroup" />
    <div class="app-container">
      <el-form
        v-if="!operUserGroup"
        :inline="true"
        :model="searchForm.data"
        class="app-form app-form-shadow"
      >
        <el-form-item label="ID">
          <el-input v-model="searchForm.data.id" placeholder="请输入ID" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchForm.data.nameLike" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="searchForm.data.type" placeholder="请输入类型" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query('query')">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button icon="el-icon-plus" plain @click="add">新增组</el-button>
        </el-form-item>
      </el-form>

      <el-table
        ref="groupTable"
        v-loading="loading"
        :row-key="getRowKeys"
        :data="tableData"
        highlight-current-row
        class="app-table"
        header-cell-class-name="headercell"
        stripe
        :max-height="selUserGroup?'300':operUserGroup?'1000':'550'"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="selUserGroup"
          :reserve-selection="true"
          align="center"
          type="selection"
        />
        <el-table-column
          align="center"
          prop="id"
          label="ID"
        />
        <el-table-column
          align="center"
          prop="name"
          label="名称"
        />
        <el-table-column
          align="center"
          prop="type"
          label="类型"
        />
        <el-table-column
          v-if="!selUserGroup"
          fixed="right"
          label="操作"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              v-if="!operUserGroup"
              type="text"
              @click="handleUpdate(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="operUserGroup"
              type="text"
              @click="handleDelete(scope.row)"
            >移除</el-button>
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
  name: 'GroupsIndex',
  props: {
    operUserGroup: {
      type: Boolean,
      default: false
    },
    selUserGroup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      searchForm: {
        data: {
          id: '',
          nameLike: '',
          type: '',
          userId: ''
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
    getRowKeys(row) {
      return row.id
    },
    handleSelectionChange(val) {
      this.$emit('selGroup', val)
    },
    add() {
      this.$router.push({
        path: '/adminManage/groups/form',
        query: {
          t: +new Date()
        }
      })
    },

    handleSizeChange(val) {
      this.searchForm.pageNum = val
      this.query()
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.query()
    },
    handleUpdate(row) {
      this.$router.push({ name: 'GroupsEdit', params: { ...row }})
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$fetch('/ws/admin/group/resource/delete?groupId=' + row.id, {}, 'delete')
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
      if (this.operUserGroup && !this.selUserGroup) {
        this.searchForm.data.userId = this.$utils.getLoginInfo('zy-user-id')
      } else if (this.operUserGroup && this.selUserGroup) {
        this.searchForm.data.excludeUserId = this.$utils.getLoginInfo('zy-user-id')
      }
      this.$fetch('/ws/admin/group/list', { ...this.searchForm }, 'post')
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
