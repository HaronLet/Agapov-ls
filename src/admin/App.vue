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
          <iconed-button 
            type="iconed" 
            v-if="emptyCatIsShow === false"
            @click="emptyCatIsShow = true" 
            title="Добавить группу" 
          />
        </div>
        <ul class="app-skills">
          <li class="app-item" v-if="emptyCatIsShow">
            <category 
              @remove="emptyCatIsShow = false"
              empty 
            />
          <li 
            class="app-item" 
            v-for="category in categories"
            :key="category.id"
          >
            <category 
              :title="category.category"
              :skills="category.skills"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import headline from "./components/headline";
  import user from "./components/user";
  import navigation from "./components/navigation";
  import button from "./components/button";
  import category from "./components/category";

  export default {
    components: {
      headline,
      user,
      navigation,
      iconedButton: button,
      category
    },
    data() {
      return {
        categories: [],
        emptyCatIsShow: false
      }
    },
    created() {
      this.categories = require("../data/skills.json");
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