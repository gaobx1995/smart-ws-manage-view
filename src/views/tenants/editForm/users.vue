<template>
  <div class="app-container">
    <el-row class="row-1">
      <h4 class="tipFont" style="font-size: 18px">{{ tenantInfo.name }}组内用户</h4>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      highlight-current-row
      stripe
      max-height="600"
      style="width: 100%"
      :cell-style="cellStyle"
      @row-click="rowClick"
    >
      <el-table-column
        prop="id"
        label="ID"
        sortable
      />
      <el-table-column
        prop="first"
        label="First Name"
        sortable
      />
      <el-table-column
        prop="last"
        label="Last Name"
        sortable
      />
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
</template>

<script>
export default {
  name: 'TenantsEditUsers',
  props: {
    tenantInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tenantUser: {},
      searchForm: {
        data: {
          tenantId: ''
        },
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      loading: false
    }
  },
  watch: {
    tenantInfo: {
      handler(obj) {
        this.tenantUser = obj
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.query()
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.query()
    },
    query() {
      this.loading = true
      this.searchForm.data.tenantId = this.tenantUser.id
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
    },
    rowClick(row) {
      this.$router.push({
        path: '/adminManage/users/edit',
        query: {
          id: row.id,
          t: +new Date()
        }
      })
    },
    cellStyle() {
      return 'cursor: pointer;color: #1673a8;'
    }
  }
}
</script>

<style lang="scss" scoped>
.tipFont{
  font-weight: 400;
  margin: 0px 0 20px 0;
  color:#606266;
}
</style>
