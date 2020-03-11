<template>
  <div>
    <breadcrumb></breadcrumb>

    <!-- 日志信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1 class="card-title">用户操作日志</h1>
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
        <el-table-column label="用户名" prop="Username"></el-table-column>
        <el-table-column label="ID" prop="UserId"></el-table-column>
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
    this.getOperationLogsAsync();
  },

  methods: {
    async getOperationLogsAsync() {
      try {
        var res = await this.$httpApi.getOperationLogs(
          this.queryParameters
        );
        //console.log(res);
      } catch (error) {
        //console.log(error);
        return;
      }
      //   if (res.status === 204) {
      //     this.isShowData = false;
      //     return this.$message("请求用户不存在!");
      //   }
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
      this.getOperationLogsAsync();
    },

    handleCurrentChange(newPage) {
      this.queryParameters.pageNumber = newPage;
      this.getOperationLogsAsync();
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
      this.getOperationLogsAsync();
    }
  }
};
</script>


<style scoped>
.card-title {
  color: rgb(45, 45, 45);
  font-size: 18px;
}

.el-card {
  margin-bottom: 20px;
}

.el-pagination {
  margin-top: 10px;
}
</style>