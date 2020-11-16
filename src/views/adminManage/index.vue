<template>
  <div class="app-main">
    <div class="app-container">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkTo(userLink[1].link)">用户管理</el-link>
            </div>
            <div v-for="(item,k) in userLink" :key="k" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(item.link)">{{ item.name }}</el-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em" @click="linkTo(groupLink[1].link)">组管理</el-link>
            </div>
            <div v-for="(item,k) in groupLink" :key="k" style="margin-bottom:1em">
              <el-link type="primary" :underline="false" style="font-size:1em" @click="linkTo(item.link)">{{ item.name }}</el-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em">用户管理</el-link>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-link type="primary" :underline="false" style="font-size:1.5em">用户管理</el-link>
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
      adminListData: [{ label: 'user' }],
      userLink: [{ name: '创建新用户', link: '/adminManage/users/form' }, { name: '用户列表', link: '/adminManage/users/index' },
        { name: '我的简介', link: '/adminManage/users/edit' }],
      groupLink: [{ name: '创建新组', link: '/adminManage/groups/form' }, { name: '组列表', link: '/adminManage/groups/index' }]
    }
  },

  methods: {
    linkTo(link) {
      this.$router.push({
        path: link,
        query: {
          t: +new Date()
        }
      })
    }
    // linkToUsers() {
    //   this.$router.push({
    //     path: '/adminManage/users/index',
    //     query: {
    //       t: +new Date()
    //     }
    //   })
    // },
    // linkToGroups() {
    //   this.$router.push({
    //     path: '/adminManage/groups/index',
    //     query: {
    //       t: +new Date()
    //     }
    //   })
    // }
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
