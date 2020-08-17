import Vue from "vue";

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

new Vue({
  el: "#review-slider-component",
  template: "#reviews",
  components: {
    Swiper, 
    SwiperSlide
  },
  data() {
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: 2
      }
    };
  },
  methods: {
    requireImagesToArray(data) {
      return data.map(item => {
        const requiredImage = require(`../images/content/${item.avatar}`).default;
        item.avatar = requiredImage;
        return item;
      });
    },
    slide(direction) {
      const slider = this.$refs["slider"].$swiper;

      switch (direction) {
        case "next":
          slider.slideNext()
          break;
        case "prev":
          slider.slidePrev()
          break;
      }
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
    console.log(data);
  }
});
