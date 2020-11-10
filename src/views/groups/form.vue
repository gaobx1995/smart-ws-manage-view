<template>
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
        <el-form-item style="text-align:center;margin-top:5vh;">
          <el-button type="primary" @click="submitForm('groupForm')">提 交</el-button>
          <el-button @click="resetForm('groupForm')">重 置</el-button>
          <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'GroupsForm',
  props: {
    formData: {
      type: Object,
      default: () => { return {} }
    }
  },
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
      }
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.operate = val.operate
        if (val.operate === 'update') { this.groupForm = { ...this.groupForm, ...val } }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.operate === 'add') {
            this.$fetch('/ws/admin/group/create', { ...this.groupForm }, 'post')
              .then(res => {
                this.resetForm('groupForm')
                this.$parent.$parent.query()
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                })
              })
              .catch(err => {
                this.$notify.error({
                  title: '错误',
                  message: err
                })
              })
          } else {
            this.userForm.pass = undefined
            this.userForm.checkPass = undefined
            this.$fetch('/ws/admin/user/resource/updateProfile', { ...this.userForm }, 'post')
              .then(res => {
                this.resetForm('groupForm')
                this.$parent.$parent.query()
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                })
              })
              .catch(err => {
                this.$notify.error({
                  title: '错误',
                  message: err
                })
              })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
