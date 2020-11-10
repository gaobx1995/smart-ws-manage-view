<template>
  <div class="app-main">
    <div class="app-container">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkToUsers">用户管理</el-link>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkToGroups">组管理</el-link>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkToUsers">用户管理</el-link>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkToUsers">用户管理</el-link>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

// import { Subnav } from '../../layout/components'
export default {
  name: 'AdminManage',
  // components: {
  //   Subnav
  // },
  data() {
    return {
      adminListData: [{ label: 'user' }]
    }
  },

  methods: {
    linkToUsers() {
      this.$router.push({
        path: '/adminManage/users/index',
        query: {
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    linkToGroups() {
      this.$router.push({
        path: '/adminManage/groups/index',
        query: {
          t: +new Date()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  margin: 10px 0 20px 0;
  height: 250px;
}
.app-container{
  background: #e5e5e5;
}
</style>
