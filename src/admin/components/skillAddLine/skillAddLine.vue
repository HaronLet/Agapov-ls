<template>
  <div :class="['skill-component', {blocked: blocked}]">
    <div class="skill-title">
      <app-input noSidePaddings />
    </div>
    <div class="skill-percent">
      <app-input type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="skill-buttot">
      <round-btn type="round" />
    </div>
  </div>
</template>

<script>
  import input from "../input";
  import button from "../button";

  export default {
    components: {
      appInput: input,
      roundBtn: button
    },
    props: {
      blocked: Boolean
    },
  };
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>