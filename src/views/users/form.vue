<template>
  <div class="app-main">
    <el-divider />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"><strong>首页</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/index' }"><strong>权限管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminManage/users/index' }"><strong>用户管理</strong></el-breadcrumb-item>
      <el-breadcrumb-item>创建用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider />
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
          <h3>用户账户</h3>
          <el-form-item label="用户ID" prop="id">
            <el-input v-model="userForm.id" placeholder="请输入用户ID" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="userForm.pass" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="userForm.checkPass" type="password" placeholder="请输入确认密码" />
          </el-form-item>
          <h3>用户简介</h3>
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
            <el-button @click="cancel">取 消</el-button>
            <el-button @click="resetForm('userForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('userForm')">提 交</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersForm',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const emailValid = (rule, value, callbac) => {
      const myreg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (value && !myreg.test(value)) {
        callbac(new Error('请正确输入邮箱'))
      } else {
        callbac()
      }
    }
    return {
      operate: 'add',
      userForm: {
        email: '',
        first: '',
        last: '',
        id: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: emailValid, trigger: 'blur' }],
        first: [{ required: true, message: '请输入first', trigger: 'blur' }],
        last: [{ required: true, message: '请输入last', trigger: 'blur' }],
        id: [{ required: true, message: '请输入id', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, message: '请输入确认密码', trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  watch: { },
  // mounted() {
  //   this.userForm = { ...this.userForm, ...this.$route.params }
  // },
  methods: {
    submitForm() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.$fetch('/ws/admin/user/create', { ...this.userForm }, 'post')
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
        path: '/adminManage/users/index',
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
