<template>
  <div>
    <breadcrumb></breadcrumb>

    <!-- 日志信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1 class="card-title" v-if="sessionList.length !== 0">当前连接会话 {{sessionList.length}} 个：</h1>
        <h1 class="card-title" v-else>当前还没有会话连接至服务器(╥╯^╰╥)</h1>
        <!-- <span>按时间范围检索：</span> -->
      </div>
      <el-table :data="sessionList" border stripe v-if="sessionList.length !== 0">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="Username"></el-table-column>
        <el-table-column label="会话ID" prop="SessionId" min-width="300px"></el-table-column>
        <el-table-column label="登录时间" prop="LoginTime"></el-table-column>
        <el-table-column label="上次活动时间" prop="LastActiveTime"></el-table-column>
        <el-table-column label="连接时长" prop="ConnectionTime"></el-table-column>
        <el-table-column label="IP端口" prop="RemoteEndPoint"></el-table-column>
        <el-table-column label="操作" width="65px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="结束会话连接" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteSessionByUsername(scope.row.Username)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
import Breadcrumb from "./Breadcrumb";
export default {
  data() {
    return {
      sessionList: []
    };
  },

  components: {
    breadcrumb: Breadcrumb
  },

  created() {
    this.getSessionsAsync();
  },

  methods: {

    async getSessionsAsync() {
      try {
        var res = await this.$httpApi.getSessions();
      } catch (error) {
        //console.log(error);
        return this.$message.error("请求会话连接列表失败!");
      }
      if (res.status !== 200) {
        return this.$message.error("请求会话连接列表失败!");
      }
      this.sessionList = res.data;
    },

    async deleteSessionAsync(username) {
      try{
          var res = await this.$httpApi.deleteSessionByUsername(username);
      }catch(error){
        this.getSessionsAsync();
          return this.$message.error("请求失败!");
      }
      if (res.status !== 204) {
        this.getSessionsAsync();
        return this.$message.error("请求失败!");
      }
      this.$message.success("已断开用户 " + username + " 会话连接!");
      this.getSessionsAsync();
    },

    async deleteSessionByUsername(username) {
      try {
        await this.$confirm(
          "结束该会话将导致用户 " + username + " 断开连接，是否继续？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        );
        // console.log(result);
        this.deleteSessionAsync(username);
      } catch (e) {
        // console.log(e);
        return this.$message.info('操作已取消');
      }
    }
  }
};
</script>


<style scoped>
.card-title{
  text-align: center;
}
</style>