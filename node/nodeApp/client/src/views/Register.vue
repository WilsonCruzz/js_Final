<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">Capital Management System</span>
            </div>
            <el-form :model="registerUser" :rules="rules" class="registerForm" ref="registerForm" label-width="80px">
                <el-form-item label="name" prop="name">
                    <el-input v-model="registerUser.name" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="registerUser.email" placeholder="email"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="registerUser.password" placeholder="password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="password again" prop="password2">
                    <el-input v-model="registerUser.password2" placeholder="password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="identity">
                    <el-select v-model="registerUser.identity" placeholder="identity">
                        <el-option label="manager" value="manager"></el-option>
                        <el-option label="employee" value="employee"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  class="submit_btn" @click="submitForm('registerForm')">Register</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("wrong password"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "can not be blank", trigger: "change" },
          { min: 2, max: 30, message: "2 to 30 characters in length", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "incorrect email format",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "can not be blank", trigger: "blur" },
          { min: 6, max: 30, message: "6 to 30 characters in length", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "can not be blank", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "6 to 30 characters in length",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: "register success",
                type: "success"
              });
              // this.$router.push("/login");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>



