<template>
  <div class="app-container">
    <h3 class="tipFont" style="font-size: 24px">
      <el-button style="float:right" icon="el-icon-plus" plain @click="createNewTenant">创建新租户</el-button>
    </h3>
    <h4 class="tipFont" style="font-size: 18px">{{ operObj.name }}授权</h4>
    <el-table
      :data="authorizationsInfo"
      style="width: 100%"
      highlight-current-row
      class="app-table"
      stripe
    >
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.operType === 'query'">{{ scope.row.type===0? '全局' : scope.row.type===1? '允许' : scope.row.type===1? '拒绝' : '' }}</span>
          <el-select v-else v-model="scope.row.type" placeholder="请选择类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="人 / 组">
        <template slot-scope="scope">
          <span v-if="scope.row.operType === 'query'">
            <span v-if="scope.row.userId"><i class="el-icon-user-solid" />{{ scope.row.userId }}</span>
            <span v-if="scope.row.groupId"><i class="el-icon-s-grid" />{{ scope.row.groupId }}</span>
          </span>
          <span v-else>
            <el-input v-model="scope.row.useId" placeholder="人/组 ID">
              <template slot="prepend">
                <el-button v-model="scope.row.useType" :icon="scope.row.iconClass" @click="iconClick(scope.row)" />
              </template>
            </el-input>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <span v-if="scope.row.operType === 'query'">{{ _.join(scope.row.permissions, ',') }}</span>
          <span v-else>
            <el-select v-model="scope.row.permissions" multiple placeholder="请选择权限" @change="selectPermission(scope.row)">
              <el-checkbox
                v-model="scope.row.allChecked"
                style="margin-left: 20px;"
                @change="selectAllPermission(scope.row)"
              >全选</el-checkbox>
              <el-option
                v-for="item in permissionList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="资源ID">
        <template slot-scope="scope">
          <span v-if="scope.row.operType === 'query'">{{ scope.row.resourceId }}</span>
          <el-input v-else v-model="scope.row.resourceId" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.operType === 'query'">
            <el-button
              type="text"
              @click="handleUpdate(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="removeAuthorizations(scope.row)"
            >移除</el-button></span>
          <span v-else>
            <el-button size="small" type="success" icon="el-icon-check" circle @click="rowSubmit(scope.row)" />
            <el-button size="small" type="danger" icon="el-icon-close" circle @click="rowCancel(scope.row)" /></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AuthorizationsDetail',
  props: {
    authorizationsInfo: {
      type: Array,
      default: () => []
    },
    operObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      rowInfo: {},
      permissionList: [],
      operType: 'query',
      options: [{
        value: 0,
        label: '全局'
      }, {
        value: 1,
        label: '允许'
      }, {
        value: 2,
        label: '拒绝'
      }]
    }
  },
  watch: {
    operObj: {
      handler(obj) {
        if (obj) {
          this.getPermissionList()
        }
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    removeAuthorizations(row) {
      this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$fetch('/ws/admin/authorization/resource/delete?id=' + row.id, {}, 'delete')
            .then(res => {
              if (res.code === '0000') {
                this.$emit('getList', this.operObj.id)
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                })
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
        })
    },
    handleUpdate(row) {
      if (row.userId) {
        row.useId = row.userId
        row.groupId = null
        row.iconClass = 'el-icon-user-solid'
      } else {
        row.useId = row.groupId
        row.userId = null
        row.iconClass = 'el-icon-s-grid'
      }
      row.allChecked = false
      if (row.permissions[0] === 'ALL') {
        row.allChecked = true
        row.permissions = this.permissionList
      } else if (row.permissions.length === 0) {
        row.permissions = []
      }
      row.operType = 'edit'
    },
    rowCancel(row) {
      if (row.id) {
        row.operType = 'query'
      } else {
        this.authorizationsInfo = this._.remove(this.authorizationsInfo, item => {
          return item !== row
        })
      }
    },
    rowSubmit(row) {
      if (row.permissions.length === this.permissionList.length) {
        row.permissions = ['ALL']
      } else if (row.permissions.length === 0) {
        row.permissions = ['NONE']
      }
      if (row.useType === 'group') {
        row.groupId = row.useId
        row.userId = null
      } else {
        row.userId = row.useId
        row.groupId = null
      }
      if (row.operType === 'edit') { // 编辑
        this.$fetch('/ws/admin/authorization/resource/updateProfile', { ...row }, 'put')
          .then(res => {
            if (res.code === '0000') {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              })
              row.operType = 'query'
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
      } else { // 新增
        this.$fetch('/ws/admin/authorization/create', { ...row }, 'post')
          .then(res => {
            if (res.code === '0000') {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              })
              row.operType = 'query'
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
    },
    selectPermission(row) {
      if (row.permissions.length === this.permissionList.length) {
        row.allChecked = true
      } else {
        row.allChecked = false
      }
    },
    selectAllPermission(row) {
      if (row.allChecked) {
        row.permissions = this.permissionList
      } else {
        row.permissions = []
      }
    },
    iconClick(row) {
      if (row.iconClass === 'el-icon-user-solid') {
        row.iconClass = 'el-icon-s-grid'
        row.type = 'group'
      } else {
        row.iconClass = 'el-icon-user-solid'
        row.type = 'user'
      }
    },
    createNewTenant() {
      this.authorizationsInfo.push({
        groupId: '',
        permissions: 'ALL',
        resourceId: '*',
        resourceType: this.operObj.id,
        type: 1,
        useType: 'user',
        userId: '',
        operType: 'add',
        iconClass: 'el-icon-user-solid',
        allChecked: false }
      )
    },
    getPermissionList() {
      this.$fetch('/ws/admin/authorization/permissions?resourceType=' + this.operObj.id, {}, 'get')
        .then(res => {
          if (res.code === '0000') {
            this.permissionList = res.data
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
.tipFont{
  font-weight: 400;
  margin: 0px 0 20px 0;
  color:#606266;
}
</style>
