<template>
  <div class="dashboard-container">
    <div>
      <div class="applications">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>应用 </span>
          </div>
          <div>
            <svg-icon style="font-size:2em;float:left" icon-class="datamanage" />
            <svg-icon style="font-size:2em;float:left" icon-class="datamanage" />
            <svg-icon style="font-size:2em;float:left" icon-class="datamanage" />
          </div>
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
    clickLink() {
      this.$router.push({
        path: '/userManage/index',
        query: {
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
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
</style>
