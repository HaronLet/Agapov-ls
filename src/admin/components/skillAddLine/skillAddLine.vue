<template>
  <div :class="['skill-component', {blocked: blocked}, , {emptybox: emptyBox}]">
    <div :class="['skill-title', {empty: emptyText}]">
      <app-input noSidePaddings v-model="inputText"/>
    </div>
    <div :class="['skill-percent', {empty: emptyValue}]">
      <app-input type="number" min="0" max="100" maxlength="3" v-model="inputValue"/>
    </div>
    <div class="skill-buttot">
      <round-btn type="round" @click="onClick"/>
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
    data() {
      return {
        inputText: "",
        inputValue: "",
        emptyText: false,
        emptyValue: false,
        emptyBox: false
      }
    },
    props: {
      blocked: Boolean,
    },
    methods: {
      onClick() {
        if (this.inputText === "") {
          this.emptyText = true;
          this.emptyBox = true;
        } else {
          this.emptyText = false;
          this.emptyBox = false;
        };
        if (this.inputValue === "") {
          this.emptyValue = true;
          this.emptyBox = true;
        } else {
          this.emptyValue = false;
          this.emptyBox = false;
        };
        // console.log(this.inputValue);
      }
    }
  };
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>