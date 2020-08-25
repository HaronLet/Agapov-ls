<template>
  <div class="app">
    <headline title="Панель администрирования">
      <user />
    </headline>
    <navigation />
    <div class="page-content">
      <div class="app-container">
        <div class="app-header">
          <div class="app-title">Блок "Обо мне"</div> 
          <iconed-button type="iconed" @click="onClick" title="Добавить группу" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headline from "./components/headline";
  import user from "./components/user";
  import navigation from "./components/navigation";
  import button from "./components/button";

  export default {
    components: {
      headline,
      user,
      navigation,
      iconedButton: button
    }
  };
</script>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" src="./app.pcss"></style>