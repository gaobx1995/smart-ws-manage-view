<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
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
          <el-button
            type="text"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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
    <el-dialog
      :title="formTitle"
      :visible.sync="formDialog"
      top="5vh"
      width="70%"
      center
    >
      <groups-form
        ref="groupsForm"
        :form-data="formData"
      />
    </el-dialog>
  </div>
</template>

<script>
import groupsForm from './form'
export default {
  name: 'GroupsList',
  components: {
    groupsForm
  },
  props: {
    queryForm: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      formData: {},
      formTitle: '',
      formDialog: false,
      loading: false,
      tableData: [],
      searchForm: {
        data: {},
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  watch: {
    queryForm: {
      handler(val) {
        this.searchForm.data = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    handleSizeChange(val) {
      this.queryForm.pageNum = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNum = val
      this.getList()
    },
    handleUpdate(row) {
      this.formTitle = '组修改'
      this.formData.operate = 'update'
      this.formData = { ...this.formData, ...row }
      this.formDialog = true
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
              this.getList()
            })
            .catch(err => {
              this.$notify.error({
                title: '错误',
                message: err
              })
            })
        })
    },
    getList(val) {
      this.loading = true
      if (val === 'query') {
        this.searchForm.pageNum = 1
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

<style scoped>
</style>
