<template>
  <div class="app-container">
    <el-form
      ref="tenantForm"
      inline
      :model="tenantForm"
      status-icon
      :rules="rules"
      class="app-form"
    >
      <el-row class="row-1">
        <h3 class="tipFont" style="font-size: 24px">租户信息</h3>
        <el-form-item label="租户名称" prop="name">
          <el-input v-model="tenantForm.name" placeholder="请输入租户名称" />
        </el-form-item>
        <el-form-item label="秘钥" prop="secretKey">
          <el-input v-model="tenantForm.secretKey" placeholder="请输入秘钥" />
        </el-form-item>
        <el-form-item label="⼯单库数据源配置" prop="orderDataSourceConfig">
          <el-input v-model="tenantForm.orderDataSourceConfig" placeholder="请输入⼯单库数据源配置" />
        </el-form-item>
        <el-form-item label="⼯单设计库数据源配置" prop="orderDesignDataSourceConfig">
          <el-input v-model="tenantForm.orderDesignDataSourceConfig" placeholder="请输入⼯单设计库数据源配置" />
        </el-form-item>
        <el-form-item label="接⼝⽹关地址" prop="interfaceGateWayAddr">
          <el-input v-model="tenantForm.interfaceGateWayAddr" placeholder="请输入接口网关地址" />
        </el-form-item>
        <el-form-item label="组织机构树相关接⼝地址" prop="organizationTreeAddr">
          <el-input v-model="tenantForm.organizationTreeAddr" placeholder="请输入组织机构树相关接⼝地址" />
        </el-form-item>
        <el-form-item label="搜索引擎相关配置" prop="searchEngineConfig">
          <el-input v-model="tenantForm.searchEngineConfig" placeholder="请输入搜索引擎相关配置" />
        </el-form-item>
        <el-form-item style="text-align:right;margin-top:5vh;">
          <el-button type="primary" @click="submitForm('tenantForm')">修改租户信息</el-button>
        </el-form-item>
        <h4 class="tipFont" style="font-size: 18px">删除租户</h4>
        <h3 class="tipFont" style="font-size: 15px"><el-alert title="警告:删除租户无法撤消！" :closable="false" type="error" /></h3>
        <el-form-item style="text-align:right;">
          <el-button style="float:right" type="danger" @click="deleteTenant">删除租户</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TenantsEditInformation',
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
      tenantId: '',
      tenantForm: {
        id: '',
        name: '',
        secretKey: '',
        orderDataSourceConfig: '',
        orderDesignDataSourceConfig: '',
        interfaceGateWayAddr: '',
        organizationTreeAddr: '',
        searchEngineConfig: ''
      },
      rules: {
        id: [{ required: true, message: '请输入ID', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        secretKey: [{ required: true, message: '请输入秘钥', trigger: 'blur' }],
        orderDataSourceConfig: [{ required: true, message: '请输入⼯单库数据源配置', trigger: 'blur' }],
        orderDesignDataSourceConfig: [{ required: true, message: '请输入⼯单设计库数据源配置', trigger: 'blur' }],
        organizationTreeAddr: [{ required: true, message: '请输入组织机构树相关接⼝地址', trigger: 'blur' }],
        searchEngineConfig: [{ required: true, message: '请输入搜索引擎相关配置', trigger: 'blur' }]
      }
    }
  },
  watch: {
    tenantInfo: {
      handler(obj) {
        this.tenantForm = obj
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.tenantId = this.$route.params.id
    this.tenantForm = { ...this.tenantForm, ...this.$route.params }
  },
  methods: {
    toTenantInfo() {
      this.$router.push({
        path: '/adminManage/tenant/index',
        query: {
          t: +new Date()
        }
      })
    },
    deleteTenant() {
      this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$fetch('/ws/admin/tenant/resource/delete?tenantId=' + this.tenantId, {}, 'delete')
            .then(res => {
              if (res.code === '0000') {
                this.toTenantInfo()
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch('/ws/admin/tenant/resource/updateProfile', { ...this.tenantForm }, 'put')
            .then(res => {
              if (res.code === '0000') {
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
            .catch(error => {
              this.$notify.error({
                title: '错误',
                message: error
              })
            })
        } else {
          return false
        }
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
