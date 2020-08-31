<template>
  <div :class="['skill-component', {blocked: blocked}]">
    <div class="skill-title">
      <app-input
        :errorMessage="validation.firstError('skill.title')"
        v-model="skill.title"
        noSidePaddings
      />
    </div>
    <div class="skill-percent">
      <app-input
        :errorMessage="validation.firstError('skill.percent')"
        v-model="skill.percent"
        type="number"
        min="0"
        max="100"
        maxlength="3"
      />
    </div>
    <div class="skill-buttot">
      <round-btn type="round" @click="handleClick"/>
    </div>
  </div>
</template>

<script>
  import input from "../input";
  import button from "../button";
  import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

  export default {
    mixins: [ValidatorMixin],
    validators: {
      "skill.title": (value) => {
        return Validator.value(value).required("Не может быть пустым");
      },
      "skill.percent": (value) => {
        return Validator.value(value)
          .integer("Должно быть числом")
          .between(0, 100, "Некорректное значение")
          .required("Не может быть пустым");
      },
    },
    components: {
      appInput: input,
      roundBtn: button
    },
    props: {
      blocked: Boolean,
    },
    data() {
      return {
        skill: {
          title: "",
          percent: "",
        },
      };
    },
    methods: {
      async handleClick() {
        if (await this.$validate() === false) return;
        this.$emit("approve", this.skill);
      },
    }
  };
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>