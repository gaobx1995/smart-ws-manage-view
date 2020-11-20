<template>
  <div class="app-container">
    <el-row class="row-1">
      <h3 class="tipFont" style="font-size: 24px">
        <el-button style="float:right" icon="el-icon-plus" plain @click="relateGroup">关联组</el-button>
      </h3>
      <h4 class="tipFont" style="font-size: 18px">{{ userGroups.first }} {{ userGroups.last }}所属组</h4>
    </el-row>
    <group-list ref="groupTable" :oper-user-group="operUserGroup" :oper-user-id="userGroups.id" />
    <el-dialog title="勾选组" :visible.sync="dialogSelGroup">
      <group-list
        ref="selGroupTable"
        :oper-user-group="operUserGroup"
        :oper-user-id="userGroups.id"
        :sel-user-group="selUserGroup"
        @selGroup="selGroup"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import groupList from '../../groups/index'
export default {
  name: 'UsersEditGroups',
  components: {
    groupList
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
      dialogSelGroup: false,
      selUserGroup: false,
      operUserGroup: true,
      userGroups: {
        id: '',
        email: '',
        first: '',
        last: ''
      },
      selArr: []
    }
  },
  watch: {
    userInfo: {
      handler(obj) {
        this.userGroups = obj
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  methods: {
    closeDialog() {
      this.dialogSelGroup = false
      this.isShowDialog = false
    },
    relateGroup() {
      this.selUserGroup = true
      this.dialogSelGroup = true
      if (this.isShowDialog) {
        this.$refs.selGroupTable.query()
      }
    },
    selGroup(val) {
      this.selArr = val.map(item => { return item.id })
    },
    submitGroup() {
      this.$fetch('/ws/admin/group/resource/membership/create', { groupIds: this.selArr, userId: this.userGroups.id }, 'post')
        .then(res => {
          if (res.code === '0000') {
            this.$refs.groupTable.query()
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
