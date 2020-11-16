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
        <h3 class="tipFont" style="font-size: 24px">编辑组camunda BPM管理员</h3>
        <h4 class="tipFont" style="font-size: 18px">组详细信息</h4>
        <el-form-item label="组名称" prop="name">
          <el-input v-model="groupForm.name" placeholder="请输入组名称" />
        </el-form-item>
        <el-form-item label="组类型" prop="type">
          <el-input v-model="groupForm.type" placeholder="请输入组类型" />
        </el-form-item>
        <el-form-item style="text-align:right;margin-top:5vh;">
          <el-button type="primary" @click="submitForm('groupForm')">修改组信息</el-button>
        </el-form-item>
        <h4 class="tipFont" style="font-size: 18px">删除组</h4>
        <h3 class="tipFont" style="font-size: 15px"><el-alert title="警告:删除组无法撤消！" :closable="false" type="error" /></h3>
        <el-form-item style="text-align:right;">
          <el-button style="float:right" type="danger" @click="deleteGroup">删除租</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'GroupsEditInformation',
  data() {
    return {
      groupId: '',
      groupForm: {
        name: '',
        type: '',
        id: ''
      },
      rules: {
        name: [{ required: true, message: '请输入组名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入组类型', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.groupId = this.$route.params.id
    this.groupForm = { ...this.groupForm, ...this.$route.params }
  },
  methods: {
    deleteGroup() {
      this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$fetch('/ws/admin/group/resource/delete?groupId=' + this.groupId, {}, 'delete')
            .then(res => {
              this.$router.push({
                path: '/adminManage/groups/index',
                query: {
                  t: +new Date()
                }
              })
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
          this.$fetch('/ws/admin/group/resource/updateProfile', { ...this.groupForm }, 'post')
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
.tipFont{
  font-weight: 400;
  margin: 0px 0 20px 0;
  color:#606266;
}
</style>
