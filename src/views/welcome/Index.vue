<template>
  <div class="welcome-page">
    <div class="title-wrapper">
      <div class="logo-wrapper">
        <img src="/logo.svg" >
      </div>
      <h1 class="title">Liteam</h1>
    </div>

    <div class="action-wrapper">
      <div class="start-wrapper">
        <mu-button color="green300" to="/register">注册
        </mu-button>
        <mu-button color="green300" to="/login">登录
        </mu-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "welcome-page",
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.welcome-page {
  padding: 30px;
  text-align: center;
  height: 100vh;
  overflow-y: hidden;
  .title-wrapper {
    .title {
      display: inline-block;
      color: rgb(129, 199, 132);
      font-size: $font-xl;
      margin: 6vh 0;
    }

    .description {
      color: $theme-sub-color;
      font-size: $font-normal;
      margin: 0;
      padding: 1vh 5vw;
    }

    .logo-wrapper {
      margin-top: 10vh;
      img {
        width: 300px;
        height: 300px;
      }
    }
  }

  .action-wrapper {
    margin-top: 10vh;
  }

  .start-wrapper {
    display: flex;
    justify-content: space-around;
  }
}
</style>
