<template>
  <div>
    <breadcrumb></breadcrumb>

    <el-row class="search-row">
      <el-col :span="6" :offset="9">
        <el-input placeholder="请输入需要检索的用户ID" v-model="userId" clearable @clear="clearData">
          <template slot="prepend">用户ID</template>
          <el-button slot="append" icon="el-icon-search" @click="searchUserDataById(userId)"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 账号详情 -->
    <el-card class="box-card" v-if="isShowData">
      <div slot="header" class="clearfix">
        <div>
          <h1 class="card-title">账号详细信息</h1>
        </div>
      </div>
      <div class="detail-container">
        <el-col :span="6">
          <div class="img-box">
            <img alt="Avatar" src="../assets/avatar.jpg" />
          </div>
        </el-col>
        <el-col :span="18">
          <div>
            <h1>用户名：{{userDetails.Username}} (Id:{{userDetails.UserId}})</h1>
            <h1>手机号：{{userDetails.Phone}}</h1>
            <hr color="#cccccc" />
            <h2>姓名：{{userDetails.PersonName}}</h2>
            <h2>Email：{{userDetails.Email}}</h2>
            <h2>公司：{{userDetails.CompanyName}}</h2>
          </div>
        </el-col>
      </div>
    </el-card>

    <!-- 账号操作日志 -->
    <el-card class="box-card" v-if="isShowData">
      <div slot="header" class="clearfix">
        <h1 class="card-title">账号操作日志</h1>
        <span>按时间范围检索：</span>
        <el-date-picker
          v-model="dateRange"
          @change="handleDateChange"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </div>
      <el-table :data="logList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="模块" prop="Module"></el-table-column>
        <el-table-column label="日志类型" prop="LogType"></el-table-column>
        <el-table-column label="详情" prop="Details"></el-table-column>
        <el-table-column label="操作时间" prop="OperationTime"></el-table-column>
        <el-table-column label="IP地址" prop="IPAddress"></el-table-column>
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
      userId: "",
      isShowData: false,
      userDetails: [],
      logList: [],
      queryParameters: {
        pageNumber: 1,
        pageSize: 20
      },
      totalCount: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dateRange: []
    };
  },

  components: {
    breadcrumb: Breadcrumb
  },

  created() {
    if (this.$route.params.userid) {
      this.userId = this.$route.params.userid;
      this.searchUserDataById(this.userId);
    }
  },

  methods: {
    clearData() {
      this.isShowData = false;
      this.userDetails = [];
    },

    searchUserDataById(id) {
      if (isNaN(id)) {
        return this.$message.warning("ID只能为数字!");
      }
      this.getUserDetailsAsync(id);
      this.getUserOperationLogsAsync(id);
    },

    async getUserDetailsAsync(id) {
      try {
        var res = await this.$httpApi.getUserDetails(id);
        //console.log(res);
      } catch (error) {
        //console.log(error);
        return;
      }
      if (res.status === 204) {
        this.isShowData = false;
        return this.$message("请求用户不存在!");
      }
      if (res.status !== 200) {
        this.isShowData = false;
        return this.$message.error("请求失败!");
      }
      this.isShowData = true;
      this.userDetails = res.data;
      //console.log(this.userDetails);
    },

    async getUserOperationLogsAsync(id) {
      try {
        var res = await this.$httpApi.getUserOperationLogs(
          id,
          this.queryParameters
        );
        //console.log(res);
      } catch (error) {
        //console.log(error);
        return;
      }
      if (res.status === 204) {
        this.isShowData = false;
        return this.$message("请求用户不存在!");
      }
      if (res.status !== 200) {
        return this.$message.error("请求失败!");
      }
      this.logList = res.data;
      if (res.headers["x-paginaion"]) {
        const p = JSON.parse(res.headers["x-paginaion"]);
        this.totalCount = p.TotalCount;
      }
    },
    handleSizeChange(newSize) {
      this.queryParameters.pageSize = newSize;
      this.searchUserDataById(this.userId);
    },
    handleCurrentChange(newPage) {
      this.queryParameters.pageNumber = newPage;
      this.searchUserDataById(this.userId);
    },
    handleDateChange(newDate) {
      if (newDate !== null) {
        this.queryParameters.startDateTime = newDate[0].format(
          "yyyy-MM-dd HH:mm:ss"
        );
        this.queryParameters.endDateTime = newDate[1].format(
          "yyyy-MM-dd HH:mm:ss"
        );
      } else {
        delete this.queryParameters.startDateTime;
        delete this.queryParameters.endDateTime;
      }
      this.searchUserDataById(this.userId);
    }
  }
};
</script>


<style scoped>
.search-row{
  margin-top: 30px;
}

.el-row {
  margin-bottom: 20px;
}

.card-title {
  color: rgb(45, 45, 45);
  font-size: 18px;
}

.detail-container {
  height: 300px;
}

.img-box {
  text-align: center;
  max-width: 300px;
  min-height: 300px;
  margin: auto;
  justify-content: center;
  align-items: center;
}

img {
  border-radius: 10px;
  width: 100%;
  height: auto;
  display: block;
  margin: auto;
}

h1 {
  font-weight: 600;
  color: #9b9b9b;
  font-size: 25px;
}

h2 {
  font-weight: normal;
  color: #9b9b9b;
  font-size: 22px;
}

.el-card {
  margin-bottom: 20px;
}

.el-pagination {
  margin-top: 10px;
}
</style>