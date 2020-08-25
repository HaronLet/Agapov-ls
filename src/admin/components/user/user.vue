<template>
  <div class="user-component">
    <div class="user-container">
      <avatar :size="47" :src="userPic" />
      <div class="username">Владимир Астаханов</div>
    </div>
  </div>
</template>

<script>
  import avatar from "../avatar";

  export default {
    components: {
      avatar
    },
    computed: {
      userPic() {
        return require("../../../images/content/user.jpg").default;
      }
    }
  };
</script> 

<style lang="postcss" scoped src="./user.pcss"></style>