<template>
  <button
    :class="['default-btn-container', 'btn-decorator', {disabled}, {plain}]"
    v-if="typeAttr === 'button'"
    v-on="$listeners"
    :disabled="disabled"
  >{{title}}</button>

  <button
    :class="['default-btn-container', 'btn-decorator', {disabled}, {plain}]"
    v-else-if="typeAttr === 'submit'"
    v-on="$listeners"
    :disabled="disabled"
    type="submit"
  >{{title}}</button>

  <button
    :class="['default-btn-container', 'btn-decorator', {disabled}, {plain}]"
    v-else-if="typeAttr === 'reset'"
    v-on="$listeners"
    :disabled="disabled"
    type="reset"
  >{{title}}</button>

  <label class="btn-file-container" v-else-if="typeAttr === 'file'">
    <div class="btn-file-fake btn-decorator">{{title}}</div>
    <input class="btn-file-input" type="file" v-on="$listeners" />
  </label>

  <label class="btn-file-container" v-else-if="typeAttr === 'plainfile'">
    <div class="btn-plainfile">{{title}}</div>
    <input class="btn-file-input" type="file" v-on="$listeners" />
  </label>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Отправить"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: Boolean,
    typeAttr: {
      type: String,
      default: "button",
      validator: value => ["button", "submit", "reset", "file", "plainfile"].includes(value)
    }
  }
};
</script>

<style lang="postcss" scoped src="./defaultBtn.pcss"></style>