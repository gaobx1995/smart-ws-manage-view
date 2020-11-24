<template>
  <div class="app-container">
    <el-row class="row-1">
      <h3 class="tipFont" style="font-size: 24px">
        <el-button v-if="tenantUserRelation.includes('createUserShip')" style="float:right" icon="el-icon-plus" plain @click="relateTenant">关联租户</el-button>
      </h3>
      <h4 class="tipFont" style="font-size: 18px">{{ userTenants.first }} {{ userTenants.last }}租户</h4>
    </el-row>
    <tenant-list
      v-if="tenantListByOper"
      ref="tenantTable"
      :oper-tenant="operTenant"
      :oper-group-tenant="false"
      :oper-user-tenant="operUserTenant"
      :oper-user-id="userTenants.id"
    />
    <el-dialog title="勾选组" :visible.sync="dialogSelTenant">
      <tenant-list
        ref="selTenantTable"
        :oper-tenant="operTenant"
        :oper-group-tenant="false"
        :oper-user-tenant="operUserTenant"
        :oper-user-id="userTenants.id"
        :sel-user-tenant="selUserTenant"
        @selTenant="selTenant"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitTenant">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tenantList from '../../tenants/index'
export default {
  name: 'UsersEditTenants',
  components: {
    tenantList
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isShowDialog: false,
      dialogSelTenant: false,
      selUserTenant: false,
      operTenant: true,
      operUserTenant: true,
      userTenants: {
        id: '',
        email: '',
        first: '',
        last: ''
      },
      selArr: [],
      tenantListByOper: sessionStorage.getItem('tenant_list'),
      tenantUserRelation: sessionStorage.getItem('tenant_member_opermissions')
    }
  },
  watch: {
    userInfo: {
      handler(obj) {
        this.userTenants = obj
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  methods: {
    closeDialog() {
      this.dialogSelTenant = false
      this.isShowDialog = true
    },
    relateTenant() {
      this.selUserTenant = true
      this.dialogSelTenant = true
      if (this.isShowDialog) {
        this.$refs.selTenantTable.query()
      }
    },
    selTenant(val) {
      this.selArr = val.map(item => { return item.id })
    },
    submitTenant() {
      this.$fetch('/ws/admin/tenant/resource/member/createUserShip', { tenantIds: this.selArr, userId: this.userTenants.id }, 'post')
        .then(res => {
          if (res.code === '0000') {
            this.$refs.tenantTable.query()
            this.closeDialog()
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
