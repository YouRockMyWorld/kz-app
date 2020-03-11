<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    computed:{
        breadcrumbList(){
            const l = this.$store.getters.breadcrumbList;
            let res;
            for(let i = 0; i< l.length; ++i){
                if(l[i].path === this.$route.path){
                    res = l[i].names;
                }
            }
            return res;
        }
    }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 15px;
}
</style>