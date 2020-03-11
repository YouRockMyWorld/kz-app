<template>
  <div class="bg">
    <div class="container">
      <div class="img-container">
        <img alt="Logo" src="../assets/sc.svg" />
      </div>
      <div class="form-body">
        <h2>***平台</h2>
        <el-row type="flex" justify="center">
          <el-form
            ref="loginFormRef"
            v-bind:model="loginForm"
            v-bind:rules="rules"
            status-icon
            label-width="50px"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload" v-on:click="login">登 录</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }, //配合页面内的 prop 定义数据
      rules: {
        //配合页面内的 prop 定义规则
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return;
        }
        try {
          var res = await this.$httpApi.getToken(this.loginForm);
        } 
        catch (error) {
          console.log(error);
          
          this.$message.error('登录失败!');
          return;
        }
        if (res.status !== 200) {
            return this.$message.error('登录失败!');
          }
          this.$message.success('登录成功');
          //this.$store.commit('saveToken', res.data);
          sessionStorage.setItem('token', res.data);
          this.$router.push('/home');
      });
    }
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #0a3764
  );
  background: radial-gradient(
    220% 105% at top center,
    #0a3764 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
}

.img-container {
  background: #fdfdfd;
  border: 1px solid #dcdcdc;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  padding: 10px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 50%);
}

.img-container img {
  width: 100px;
  height: 100px;
}

h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #2e88d1;
  text-align: center;
}

.container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  text-align: center;
}

.form-body {
  z-index: -1;
  width: 350px;
  height: 330px;
  padding: 70px 30px 30px 30px;
  margin: auto;
  border: 1px solid #d8dee2;
  border-radius: 10px;
  background: #ffffff;
  position: relative;
  box-sizing: border-box;
  box-shadow: 10px 15px 25px rgba(0, 0, 0, 0.5);
}

.el-button {
  margin-left: -40px;
  margin-top: 10px;
  width: 100px;
}
</style>