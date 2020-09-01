<template>
  <div class="skill-component" v-if="currentSkill.editmode === false">
    <div class="skill-title">{{skill.title}}</div>
    <div class="skill-percent">{{skill.percent}}</div>
    <div class="skill-buttot">
      <icon 
        @click="currentSkill.editmode = true"
        symbol="pencil"
        class="skill-btn"
        grayscale
      />
      <icon
        @click="$emit('remove', currentSkill)"
        symbol="trash"
        class="skill-btn"
        grayscale
      />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="skill-title">
      <app-input
        :errorMessage="validation.firstError('currentSkill.title')"
        v-model="currentSkill.title"
        noSidePaddings
      />
    </div>
    <div class="skill-percent">
      <app-input
        :errorMessage="validation.firstError('currentSkill.percent')"
        v-model="currentSkill.percent"
        type="number"
        min="0"
        max="100"
        maxlength="3"
      />
    </div>
    <div class="skill-buttot">
      <icon
        @click="handleClick"
        symbol="tick"
        class="skill-btn"
      />
      <icon
        @click="currentSkill.editmode = false"
        symbol="cross"
        class="skill-btn"
      />
    </div>
  </div>
</template>

<script>
  import input from "../input";
  import icon from "../icon";
  import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

  export default {
    mixins: [ValidatorMixin],
    validators: {
      "currentSkill.title": (value) => {
        return Validator.value(value).required("Не может быть пустым");
      },
      "currentSkill.percent": (value) => {
        return Validator.value(value)
          .integer("Должно быть числом")
          .between(0, 100, "Некорректное значение")
          .required("Не может быть пустым");
      },
    },
    props: {
      skill: Object,
      default: () => {},
      required: true
    },
    data() {
      return {
        editmode: false,
        currentSkill: {
          id: this.skill.id,
          title: this.skill.title,
          percent: this.skill.percent,
          category: this.skill.category,
          editmode: false,
        }
      };
    },
    components: {
      appInput: input,
      icon
    },
    methods: {
      async handleClick() {
        if (await this.$validate() === false) return;
        this.$emit("approve", this.currentSkill);
        this.$validate().reset;
      },
    }
  };
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>