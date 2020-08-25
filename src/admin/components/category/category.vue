<template>
  <card slim>
    <edit-line slot="title" v-model="title" editModeByDefault />
    <ul class="skill" slot="content">
      <li class="item">
        <skill />
      </li>
    </ul>
  </card>
</template>

<script>
  import card from "../card";
  import editLine from "../editLine";
  import skill from "../skill";

  export default {
    components: {
      card,
      editLine,
      skill
    },
    data() {
      return {
        title: ""
      }
    }
  };
</script>

<style lang="postcss" scoped src="./category.pcss"></style>