<template>
  <div class="dashboard-container">
    <div class="applications">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>应用</span>
        </div>
        <el-row :gutter="12">
          <el-col :span="8" :push="2">
            <svg-icon class="app-svg" icon-class="cockpit" @click="clickLinkOther" />
            <br>
            <span class="app-name">Cockpit</span>
          </el-col>
          <el-col :span="8" :push="2">
            <svg-icon class="app-svg" icon-class="tasklist" />
            <br>
            <span class="app-name">Tasklist</span>
          </el-col>
          <el-col :span="8" :push="2">
            <span @click="clickLinkToAdmin">
              <svg-icon class="app-svg" icon-class="admin" />
              <br>
              <span class="app-name">Admin</span>
            </span>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="profile">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>简介</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </div>
    <div class="links">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>链接</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    clickLinkToAdmin() {
      this.$router.push({
        path: '/adminManage/index',
        query: {
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    clickLinkOther() {
      // window.open('http://10.15.2.10:34827/login?redirect=%2Fdashboard', '_blank')
      window.location.href = 'http://10.15.2.10:34827/dashboard'
    }
  }
}
</script>

<style lang="scss" scoped>
.applications{
  width: 70%;
  float: left;
  margin-bottom: 30px;
}
.profile{
  width: 25%;
  float: right;
  margin-bottom: 30px;
}
.links{
  width: 70%;
  float: left;
  margin-bottom: 30px;
}

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.app-svg{
  font-size:8em;
  margin: 10px 0;
  cursor: pointer;
}
.app-name{
   font-size:2em;
   color: #155cb5;
   margin: 0 10px;
   cursor: pointer;
}
</style>
