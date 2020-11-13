<template>
  <div class="app-container">
    <el-form
      ref="userForm"
      inline
      :model="userForm"
      status-icon
      :rules="rules"
      class="app-form"
    >
      <el-row class="row-1">
        <h3
          style="margin: 0px 0 20px 0;font-weight: 400;font-size: 24px;color: #555;"
        >用户简介</h3>
        <el-form-item label="First Name" prop="first">
          <el-input v-model="userForm.first" placeholder="请输入First Name" />
        </el-form-item>
        <el-form-item label="Last Name" prop="last">
          <el-input v-model="userForm.last" placeholder="请输入Last Name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-row>
      <el-row class="row-1">
        <el-form-item style="text-align:right;margin-top:5vh;">
          <el-button type="primary" @click="submitForm('userForm')">修改用户简介</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UsersEditProfile',
  data() {
    const emailValid = (rule, value, callbac) => {
      const myreg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (value && !myreg.test(value)) {
        callbac(new Error('请正确输入邮箱'))
      } else {
        callbac()
      }
    }
    return {
      userForm: {
        email: '',
        first: '',
        last: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: emailValid, trigger: 'blur' }],
        first: [{ required: true, message: '请输入First Name', trigger: 'blur' }],
        last: [{ required: true, message: '请输入Last Name', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.userForm = { ...this.userForm, ...this.$route.params }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch('/ws/admin/user/resource/updateProfile', { ...this.userForm }, 'post')
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
