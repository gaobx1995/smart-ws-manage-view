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
        <h3 class="tipFont" style="font-size: 24px">编辑用户</h3>
        <h4 class="tipFont" style="font-size: 18px">修改密码</h4>
        <p class="tipFont" style="font-size: 15px">输入新密码以更改现有帐户密码</p>
        <el-form-item label="登录人密码" prop="autherPassword">
          <el-input v-model="userForm.authenticatedUserPassword" placeholder="请输入登录人密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="userForm.password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input v-model="userForm.checkPassword" placeholder="请输入确认新密码" />
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" @click="submitForm('userForm')">修改用户简介</el-button>
        </el-form-item>

        <h4 class="tipFont" style="font-size: 18px">删除用户</h4>
        <h3 class="tipFont" style="font-size: 15px"><el-alert title="警告:删除用户无法撤消！" :closable="false" type="error" /></h3>
        <el-form-item style="text-align:right;">
          <el-button style="float:right" type="danger" @click="deleteUser">删除用户</el-button>
        </el-form-item>

        <h4 class="tipFont" style="font-size: 18px">解锁用户</h4>
        <h3 class="tipFont" style="font-size: 15px"><el-alert title="注意:只有当用户被锁定时才相关!" :closable="false" type="info" /></h3>
        <el-form-item style="text-align:right;">
          <el-button style="float:right" type="success" icon="el-icon-lock" @click="deleteUser">删除用户</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UsersEditAccount',
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
    return {
      userId: '',
      userForm: {
        authenticatedUserPassword: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        autherPassword: [{ required: true, message: '请输入登录人密码', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, message: '请输入确认密码', trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.userId = this.$route.params.id
  },
  methods: {
    deleteUser() {
      this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$fetch('/ws/admin/user/resource/delete?userId=' + this.userId, {}, 'delete')
            .then(res => {
              this.query()
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
          this.$fetch('/ws/admin/user/resource/updateCredentials?userId=' + this.userId, { ...this.userForm }, 'put')
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
        }
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
.tipFont{
  font-weight: 400;
  margin: 0px 0 20px 0;
  color:#606266;
}
.el-alert.is-light{
  height:40px;
  font-weight: 600;
}
</style>
