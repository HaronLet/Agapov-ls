<template>
  <card simple>
    <div class="works-wrapper">
      <div class="pic">
        <img class="image" :src="cover"/>
        <div class="tag">
          <tags-list :tags="work.techs"/>
        </div>
      </div>
      <div class="data">
        <div class="title">{{work.title}}</div>
        <div class="text">
          <p>{{work.description}}</p>
        </div>
        <a :href="work.link" class="link">{{work.link}}</a>
        <div class="btns">
          <icon symbol="pencil" title="Править" @click="$emit('edit', $event)"></icon>
          <icon symbol="trash" title="Удалить" @click="$emit('remove', $event)"></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";

export default {
  components: { card, icon, tagsList },
  props: {
    work: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    }
  },
};
</script>

<style scoped lang="postcss" src="./workCard.pcss"></style>
