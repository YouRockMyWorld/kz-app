<template>
  <el-container>
    <el-header>
      <div>
        <img alt="Logo" src="../assets/sc.svg" style="height:50px;width:50px" />
        <span>***平台后台管理系统</span>
        <span style="font-size:16px"> --- current version 1.0 design by Liu** (Murphy.L) on 20200309 </span>
      </div>
      <el-button type="text" v-on:click="logout">退出</el-button>
    </el-header>

    <el-container>
      <el-aside v-bind:width="isCollapse ? '64px' : '200px'">
        <div class="toggle-area" v-on:click="toggleCollapse">
          <div class="toggle-button">
            |||
          </div>
        </div>
        <el-menu
          background-color="#37373d"
          text-color="#ffffff"
          active-text-color="#409eff"
          v-bind:collapse="isCollapse"
          v-bind:collapse-transition="false"
          v-bind:router="true"
          :default-active="this.$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu v-bind:index="item.id + ''" v-for="item in menuList" v-bind:key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i v-bind:class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-bind:index="subItem.path"
              v-for="subItem in item.children"
              v-bind:key="subItem.id"
            >
              <template slot="title">
                <i v-bind:class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  // props: {
  //   msg: String
  // },
  methods: {
    logout(){
      sessionStorage.clear();
      this.$router.push('/login');
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      //console.log(this.$store.getters.breadcrumbList);
    }
  },
  computed:{
    menuList(){
      return this.$store.state.menuList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #3c3c3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cccccc;
  font-size: 25px;
  font-weight: bold;
}

.el-header div {
  display: flex;
  align-items: center;
}

.el-header div span {
  margin-left: 15px;
}

.el-header .el-button {
  font-size: 16px;
  color: #cccccc;
}

.el-aside {
  background-color: #252526;
}

.el-aside .toggle-area {
  background-color: #383838;
  text-align: center;
  cursor: pointer;
  height: 40px;
}

.el-aside .toggle-button{
  font-size: 13px;
  font-weight: 900;
  line-height: 24px;
  letter-spacing: 0.2em;
  color: #cccccc;
  writing-mode: vertical-rl;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  margin-left:2px;
}

.el-aside .el-menu {
  border-right: none;
}

.el-main {
  height: 100%;
  width: 100%;
}
</style>
