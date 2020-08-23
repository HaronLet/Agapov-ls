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
        breakpoints: {
          320: {
            slidesPerView: 1
          },
          481: {
            slidesPerView: 1,
          },
          769: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }
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
    inactive(ref, slider) {
      if (slider.isEnd) {
        ref.nextBtn.style.opacity = .2;
        ref.nextBtn.style.cursor = 'initial';
      } else {
        ref.nextBtn.style.opacity = 1;
        ref.nextBtn.style.cursor = 'pointer';
      }
      if (slider.isBeginning) {
        ref.prevBtn.style.opacity = .2;
        ref.prevBtn.style.cursor = 'initial';
      } else {
        ref.prevBtn.style.opacity = 1;
        ref.prevBtn.style.cursor = 'pointer';
      }
    },
    slide(direction) {
      const slider = this.$refs["slider"].$swiper;

      var ref = this.$refs;
        
      switch (direction) {
        case "next":
          slider.slideNext();
          this.inactive(ref, slider);
          break;
        case "prev":
          slider.slidePrev();
          this.inactive(ref, slider);
          break;
      }
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  },
  mounted() {
    var ref = this.$refs;
    
    ref.prevBtn.style.opacity = .2;
    ref.prevBtn.style.cursor = 'initial';
  }
});
