<template>
  <div class="wrapper">
    <div class="login-box">
      <div class="title">
        <b>注 册</b>
      </div>
      <div style="margin-top: 30px">
        <el-form label-width="70px" :model="user" :rules="rules" ref="registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model.trim="user.username" aria-required="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="margin-top: 25px">
            <el-input
              v-model.trim="user.password"
              show-password
              aria-required="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword" style="margin-top: 25px">
            <el-input
              v-model.trim="user.confirmPassword"
              show-password
              aria-required="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" style="margin-top: 25px">
            <el-input
              v-model.trim="user.email"
              type="email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" style="margin-top: 25px">
            <el-input
              v-model.trim="user.phone"
              type="tel"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname" style="margin-top: 25px">
            <el-input v-model.trim="user.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address" style="margin-top: 25px">
            <el-input v-model.trim="user.address" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="注册类型" prop="role">
            <el-radio-group v-model="user.role">
              <el-radio label="user">普通用户</el-radio>
              <el-radio label="seller">商家</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin: 30px 80px">
            <el-button type="success" @click="onSubmit">注册</el-button>
            <el-button @click="$router.push('/login')">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        nickname: '',
        address: '',
        role:'user',
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.user.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        email: [
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^[1-9]\d{10}$/,
            message: '请输入有效的手机号',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 加密密码
          this.user.password = md5(this.user.password);
          this.user.nickname = "新用户" + this.user.username;
          this.user.email = null;
          // 提交注册请求
          this.request.post("/register", this.user).then((res) => {
            if (res.code === "200") {
              this.$message.success("注册成功");
              this.$router.push("/login");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("请检查表单信息");
        }
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 500px;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
