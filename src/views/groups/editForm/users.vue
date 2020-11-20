<template>
  <div class="app-container">
    <el-row class="row-1">
      <!-- <h3 class="tipFont" style="font-size: 24px">
        <el-button style="float:right" icon="el-icon-plus" plain @click="relateGroup">关联用户</el-button>
      </h3> -->
      <h4 class="tipFont" style="font-size: 18px">组内用户</h4>
    </el-row>
    <user-list :oper-group="operGroup" :oper-group-id="groupForm.id" />
    <!-- <el-dialog title="勾选组" :visible.sync="dialogSelGroup">
      <group-list :oper-user-group="operUserGroup" :sel-user-group="selUserGroup" @selGroup="selGroup" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSelGroup = false">取 消</el-button>
        <el-button type="primary" @click="submitGroup">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import userList from '../../users/index'
export default {
  name: 'GroupsEditUsers',
  components: {
    userList
  },
  props: {
    groupInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      operGroup: true,
      dialogSelGroup: false,
      selUserGroup: false,
      groupForm: {
        name: '',
        type: '',
        id: ''
      },
      selArr: []
    }
  },
  watch: {
    groupInfo: {
      handler(obj) {
        this.groupForm = obj
      },
      immediate: true,
      deep: true
    }
  },
  created() {
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
  // margin: 0px 0 20px 0;
  color:#606266;
}
</style>
