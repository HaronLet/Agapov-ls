<template>
  <card>
    <div slot="title" class="user-container">
      <avatar class="avatar" :size="`54`" :src="cover" />
      <div class="userdata">
        <div class="username">{{review.author}}</div>
        <div class="userocc">{{review.occ}}</div>
      </div>
    </div>
    <div slot="content" class="review-wrapper">
      <div class="data">
        <div class="text">
          <p>{{review.text}}</p>
        </div>
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
import avatar from "../avatar";

export default {
  components: { card, icon, avatar },
  props: {
    review: Object,
  },
  computed: {
    cover() { 
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>
