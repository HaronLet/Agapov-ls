<template>
  <div class="skill-component" v-if="editmode === false">
    <div class="skill-title">Git</div>
    <div class="skill-percent">80 %</div>
    <div class="skill-buttot">
      <icon symbol="pencil" class="skill-btn" grayscale />
      <icon symbol="trash" class="skill-btn" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="skill-title">
      <app-input noSidePaddings />
    </div>
    <div class="skill-percent">
      <app-input type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="skill-buttot">
      <icon symbol="tick" class="skill-btn" />
      <icon symbol="cross" class="skill-btn" />
    </div>
  </div>
</template>

<script>
  import input from "../input";
  import icon from "../icon";

  export default {
    data() {
      return {
        editmode: false
      }
    },
    components: {
      appInput: input,
      icon
    }
  };
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>