<template>
    <div class="logFund">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">

                    <el-form-item label="Type:" >
                        <el-select v-model="form.type" placeholder="type">
                            <el-option
                             v-for="(formtype, index) in format_type_list"
                             :key="index" 
                             :label="formtype" :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='describe' label="description:">
                        <el-input type="describe" v-model="form.describe"></el-input>
                    </el-form-item>

                    <el-form-item prop='income'  label="income:">
                        <el-input type="income" v-model="form.income"></el-input>
                    </el-form-item>

                    <el-form-item prop='expend' label="expense:">
                        <el-input type="expend" v-model="form.expend"></el-input>
                    </el-form-item>

                    <el-form-item prop='cash' label="cash:">
                        <el-input type="cash" v-model="form.cash"></el-input>
                    </el-form-item>

                     <el-form-item label="note:">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">Cancel</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>submit</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      format_type_list: [
        "Deposit",
        "Transfer",
        "Recharge",
        "Withdraw",
        "Refund",
      ],
      form_rules: {
        describe: [
          { required: true, message: "can not be blank", trigger: "blur" }
        ],
        income: [
          { required: true, message: "can not be blank", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "can not be blank", trigger: "blur" }
        ],
        cash: [{ required: true, message: "can not be blank", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profiles/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "success",
              type: "success"
            });
            this.dialog.show = true;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>

