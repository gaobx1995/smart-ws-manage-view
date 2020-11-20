<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/tenants/index' }"><strong>租户管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>创建用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
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
          <h3>创建新租户</h3>
          <el-form-item label="ID" prop="id">
            <el-input v-model="tenantForm.id" placeholder="请输入ID" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="tenantForm.name" placeholder="请输入名称" />
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
        </el-row>
        <el-row class="row-1">
          <el-form-item style="text-align:right;margin-top:5vh;">
            <el-button @click="cancel">取 消</el-button>
            <el-button @click="resetForm('tenantForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('tenantForm')">提 交</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TenantsForm',
  data() {
    return {
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
  watch: { },
  methods: {
    submitForm() {
      this.$refs['tenantForm'].validate((valid) => {
        if (valid) {
          this.$fetch('/ws/admin/tenant/create', { ...this.tenantForm }, 'post')
            .then(res => {
              if (res.code === '0000') {
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                })
                this.toTenantList()
              } else {
                this.$errorTip(res.msg)
              }
            })
            .catch(err => {
              this.$errorTip(err)
            })
        } else {
          return false
        }
      })
    },
    toTenantList() {
      this.$router.push({
        path: '/adminManage/tenants/index',
        query: {
          t: +new Date()
        }
      })
    },
    cancel() {
      this.toTenantList()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
</style>
