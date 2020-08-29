<template>
  <div class="skill-component" v-if="editmode === false">
    <div class="skill-title">{{skill.title}}</div>
    <div class="skill-percent">{{skill.percent}}</div>
    <div class="skill-buttot">
      <icon symbol="pencil" class="skill-btn" @click="editmode = true" grayscale />
      <icon symbol="trash" class="skill-btn" @click="$emit('remove', skill.id)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="skill-title">
      <app-input noSidePaddings v-model="currentSkill.title" />
    </div>
    <div class="skill-percent">
      <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="skill-buttot">
      <icon symbol="tick" class="skill-btn" @click="$emit('approve', currentSkill)"/>
      <icon symbol="cross" class="skill-btn" @click="editmode = false" />
    </div>
  </div>
</template>

<script>
  import input from "../input";
  import icon from "../icon";

  export default {
    props: {
      skill: Object,
      default: () => {},
      required: true
    },
    data() {
      return {
        editmode: false,
        currentSkill: {
          id: 0,
          title: this.skill.title,
          percent: this.skill.percent
        }
      };
    },
    components: {
      appInput: input,
      icon
    }
  };
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>