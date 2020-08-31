<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          :errorMessage="validation.firstError('title')"
          :value="value"
          :errorText="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          placeholder="Название новой группы"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        />
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="handleClick"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

  export default {
    mixins: [ValidatorMixin],
    validators: {
      "title": (value) => {
        return Validator.value(value).required("Не может быть пустым");
      },
    },
    props: {
      value: {
        type: String,
        default: ""
      },
      errorText: {
        type: String,
        default: ""
      },
      editModeByDefault: Boolean,
      blocked: Boolean
    },
    data() {
      return {
        editmode: this.editModeByDefault,
        title: this.value
      };
    },
    methods: {
      async handleClick() {
        if (await this.$validate() === false) return;

        if (this.title.trim() === this.value.trim()) {
          this.editmode = false;
        } else {
          this.$emit("approve", this.title);
        }
      },
    },
    components: {
      icon: () => import("components/icon"),
      appInput: () => import("components/input")
    }
  };
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>