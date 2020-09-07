<template>
  <div class="reviews-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">
            Блок "Отзывы"
          </div>
        </div>
        <div class="form">
          <app-form-reviews />
        </div>
        <ul class="cards">
          <li class="item">
            <square-btn 
              type="square"
              title="Добавить отзыв" 
              
            />
          </li>
          <li class="item" v-for="review in reviews" :key="review.id">
            <review-card
              :review="review"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appFormReviews from "../../components/formReviews";
import reviewCard from "../../components/reviewCard";
import squareBtn from "../../components/button";
import { mapState, mapActions } from "vuex";

export default {
  components: { appFormReviews, reviewCard, squareBtn },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch"
    }),
  },
  mounted() {
    this.fetchReviews();
  }
};
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
