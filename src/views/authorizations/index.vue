<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>授权管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <div class="app-container">
      <el-row>
        <el-col :span="5">
          <el-menu
            style="max-height:600px;overflow:auto;"
            :default-active="activeName"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item v-for="(item,k) in menuList" :key="k" :index="item.id">
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19">
          <div style="max-height:600px;overflow:auto;">
            <detailList v-loading="loading" :oper-obj="operObj" :authorizations-info="authorizationsInfo" />
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import detailList from './detailList'
export default {
  name: 'Authorizations',
  components: {
    detailList
  },
  data() {
    return {
      activeName: '0',
      tabName: 'APPLICATION',
      menuList: [{ id: '0', name: '可访问应用', index: 'APPLICATION' }, { id: '4', name: '权限', index: 'AUTHORIZATION' },
        { id: '2', name: '组', index: 'GROUP' }, { id: '3', name: '组关系', index: 'GROUP_MEMBERSHIP' },
        { id: '17', name: '操作日志', index: 'OPERATION_LOG' }, { id: '11', name: '租户', index: 'TENANT' },
        { id: '12', name: '租户关系', index: 'TENANT_MEMBERSHIP' }, { id: '1', name: '用户', index: 'USER' }],
      authorizationsInfo: [],
      loading: false,
      searchForm: {
        data: {
          resourceType: ''
        },
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      operObj: ''
    }
  },
  created() {
    this.handleSelect('0')
    this.operObj = this.menuList[0]
  },
  methods: {
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getAuthorizationById(this.operObj.id)
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.getAuthorizationById(this.operObj.id)
    },
    handleSelect(val) {
      this.getAuthorizationById(val)
    },
    getAuthorizationById(val) {
      this.loading = true
      this.operObj = this.menuList.filter(item => {
        return item.id === val
      })[0]
      this.searchForm.data.resourceType = val
      this.$fetch('/ws/admin/authorization/list', { ...this.searchForm }, 'post')
        .then(res => {
          if (res.code === '0000') {
            this.authorizationsInfo = []
            this.authorizationsInfo = res.data.data.map(item => {
              return { ...item, operType: 'query' }
            })
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
.app-main {
  background: #ffffff;
}
</style>
