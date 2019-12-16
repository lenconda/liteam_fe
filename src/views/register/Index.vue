<template>
  <div class="register-page">
    <LayoutBackBar title="注册 Liteam">
      <div class="form-wrapper"   >
        <mu-form ref="form" :model="validateForm" class="form-field-wrapper">
          <mu-form-item
            prop="phone"
            :rules="phoneRules"
            label="手机号码"
            label-float
            icon="phone"
          >
            <mu-text-field v-model="validateForm.phone" type="telephone" max-length="11" @keyup.enter="submit"/>
          </mu-form-item>
          <mu-form-item
            prop="nickname"
            :rules="nicknameRules"
            label="昵称"
            label-float
            icon="face"
          >
            <mu-text-field v-model="validateForm.nickname" type="text" max-length="20" @keyup.enter="submit"/>
          </mu-form-item>
          <mu-form-item
            prop="password"
            :rules="passwordRules"
            label="密码"
            label-float
            icon="locked"
          >
            <mu-text-field v-model="validateForm.password" type="password" max-length="16" @keyup.enter="submit"/>
          </mu-form-item>
        </mu-form>
        <div class="button-wrapper">
          <mu-flex direction="column" align-items="center" justify-content="center">
            <mu-button
              full-width
              color="primary"
              :disabled="!submitable"
              @click="submit()"
              v-loading="submitLoading"
              data-mu-loading-size="24"
            >注册</mu-button>
          </mu-flex>
        </div>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>
import { isPhone, required, isPassword } from "@/utils/validator";
export default {
  name: "register",
  data() {
    return {
      validateForm: {
        nickname: "",
        password: "",
        phone: ""
      },
      nicknameRules: [
        { validate: val => required(val), message: "昵称不能为空" }
      ],
      passwordRules: [
        {
          validate: val => isPassword(val),
          message: "密码是6-16的字母或数字的组合"
        }
      ],
      phoneRules: [
        { validate: val => isPhone(val), message: "请填写正确的手机号码" }
      ],
      submitLoading: false
    };
  },
  methods: {
    async submit() {
      const isVaild = await this.$refs.form.validate();
      if (isVaild) {
        this.submitLoading = true;
        try {
          const {data} = await this.$api.user.register(this.validateForm);
          this.$toast.success("注册成功~");
          this.$router.push('/login?liteam=' + data.curaNumber);
        } catch(e) {
          this.$throw(e);
        } finally {
          this.submitLoading = false;
        }
      }
    }
  },
  computed: {
    submitable() {
      return !Object.keys(this.validateForm).find(
        key => !this[`${key}Rules`][0].validate(this.validateForm[key])
      );
    },
  }
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  margin-top: 5vh;
  .form-field-wrapper {
    padding-right: 5vw;
  }
}

.button-wrapper {
  margin-top: 10vh;
  padding: 1em;
}

.register-image-wrapper {
  margin-top: 5vh;
  padding: 10px;
  font-size: 0;
  img {
    width: 300px;
    height: 300px;
  }
}
</style>
