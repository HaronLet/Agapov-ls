<template>
  <div class="reviews-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">
            Блок "Отзывы"
          </div>
        </div>
        <div class="form" v-if="emptyFormIsShow">
          <app-form-reviews
            @edit="editReview"
            @reset="FormIsShow"
            :currentReview="currentReview"
            :editMode="editMode"
          />
        </div>
        <ul class="cards">
          <li class="item">
            <square-btn 
              type="square"
              title="Добавить отзыв" 
              @click="emptyFormIsShow = true"
            />
          </li>
          <li class="item" v-for="review in reviews" :key="review.id">
            <review-card
              :review="review"
              @edit="editReviewCard(review)"
              @remove="removeReview(review)"
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
  data() {
    return {
      emptyFormIsShow: false,
      editMode: false,
      currentReview: {},
    }
  },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      editReviewsAction: "reviews/edit",
      removeReviewsAction: "reviews/remove",
      fetchReviews: "reviews/fetch"
    }),
    FormIsShow(e) {
      this.emptyFormIsShow = e;
      this.editMode = false;
    },
    async editReview(review) {
      await this.editReviewsAction(review);
    },
    editReviewCard(review) {
      this.emptyFormIsShow = true;
      this.editMode = true;
      this.currentReview = review;
    },
    async removeReview(review) {
      await this.removeReviewsAction(review);
    },
  },
  mounted() {
    this.fetchReviews();
  }
};
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
