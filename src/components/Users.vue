<template>
  <div>
    <breadcrumb></breadcrumb>

    <!-- 账号概览 -->
    <el-card class="box-card">
      <!-- <div :key="index" class="text item" v-for="(da, index) in userList">{{ da }}</div> -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="Username"></el-table-column>
        <el-table-column label="ID" prop="UserId"></el-table-column>
        <el-table-column label="邮箱" prop="Email"></el-table-column>
        <el-table-column label="操作" width="65px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="查看详情" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-set-up"
                size="mini"
                @click="redirectToUserDetails(scope.row.UserId)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParameters.pageNumber"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryParameters.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </el-card>
  </div>
</template>


<script>
import Breadcrumb from "./Breadcrumb";

export default {
  data() {
    return {
      userList: [],
      queryParameters: {
        pageNumber: 1,
        pageSize: 20
      },
      totalCount: 0
    };
  },

  components: {
    breadcrumb: Breadcrumb
  },

  created() {
    this.getUserDataAsync();
  },

  methods: {
    redirectToUserDetails(id) {
      this.$router.push({ name: "userdetails", params: { userid: id } });
    },
    async getUserDataAsync() {
      try {
        var res = await this.$httpApi.getUsers(this.queryParameters);
      } catch (error) {
        //console.log(error);
        return;
      }
      if (res.status !== 200) {
        return this.$message.error("请求失败!");
      }
      this.userList = res.data;
      if (res.headers["x-paginaion"]) {
        const p = JSON.parse(res.headers["x-paginaion"]);
        this.totalCount = p.TotalCount;
      }
    },
    handleSizeChange(newSize) {
      this.queryParameters.pageSize = newSize;
      this.getUserDataAsync();
    },
    handleCurrentChange(newPage) {
      this.queryParameters.pageNumber = newPage;
      this.getUserDataAsync();
    }
  }
};
</script>


<style scoped>
/* .el-card {
  box-shadow: 0 1px 3px rgba(202, 202, 202, 0.7) !important;
  background-color: #2d2d2d;
  border: 1px solid #9b9b9b;
  color: #cccccc;
} */

.el-pagination {
  margin-top: 10px;
}
</style>