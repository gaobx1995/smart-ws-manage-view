<template>
  <div class="app-container">
    <el-row class="row-1">
      <h3 class="tipFont" style="font-size: 24px">编辑组
        <el-button style="float:right" icon="el-icon-plus" plain @click="relateGroup">关联用户</el-button>
      </h3>
      <h4 class="tipFont" style="font-size: 18px">组内用户</h4>
    </el-row>
    <group-list :oper-user-group="operUserGroup" />
    <el-dialog title="勾选组" :visible.sync="dialogSelGroup">
      <group-list :oper-user-group="operUserGroup" :sel-user-group="selUserGroup" @selGroup="selGroup" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSelGroup = false">取 消</el-button>
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
  data() {
    return {
      dialogSelGroup: false,
      selUserGroup: false,
      operUserGroup: true,
      userGroups: {
        email: '',
        first: '',
        last: ''
      },
      selArr: []
    }
  },
  mounted() {
    this.userGroups = { ...this.userGroups, ...this.$route.params }
  },
  methods: {
    relateGroup() {
      this.selUserGroup = true
      this.dialogSelGroup = true
    },
    selGroup(val) {
      this.selArr = val
    },
    submitGroup() {

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
