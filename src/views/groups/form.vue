<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/groups/index' }"><strong>组管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>创建用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
    <div class="app-container">
      <el-form
        ref="groupForm"
        inline
        :model="groupForm"
        status-icon
        :rules="rules"
        class="app-form"
      >
        <el-row class="row-1">
          <h3>创建新组</h3>
          <el-form-item label="ID" prop="id">
            <el-input v-model="groupForm.id" placeholder="请输入ID" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="groupForm.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="groupForm.type" placeholder="请输入类型" />
          </el-form-item>
        </el-row>
        <el-row class="row-1">
          <el-form-item v-if="groupCreate" style="text-align:right;margin-top:5vh;">
            <el-button @click="cancel">取 消</el-button>
            <el-button @click="resetForm('groupForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('groupForm')">提 交</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupsForm',
  data() {
    return {
      operate: 'add',
      groupForm: {
        id: '',
        name: '',
        type: ''
      },
      rules: {
        id: [{ required: true, message: '请输入ID', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'blur' }]
      },
      groupCreate: sessionStorage.getItem('group_create')
    }
  },
  watch: { },
  methods: {
    submitForm() {
      this.$refs['groupForm'].validate((valid) => {
        if (valid) {
          this.$fetch('/ws/admin/group/create', { ...this.groupForm }, 'post')
            .then(res => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              })
              this.toAdminManage()
            })
            .catch(err => {
              this.$notify.error({
                title: '错误',
                message: err
              })
            })
        } else {
          return false
        }
      })
    },
    toAdminManage() {
      this.$router.push({
        path: '/adminManage/groups/index',
        query: {
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    cancel() {
      this.toAdminManage()
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
