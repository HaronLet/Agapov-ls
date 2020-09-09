import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

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
      },
      baseUrl: config.BASE_URL,
    };
  },
  methods: {
    // requireImagesToArray(data) {
    //   return data.map(item => {
    //     const requiredImage = require(`../images/content/${item.avatar}`).default;
    //     item.avatar = requiredImage;
    //     return item;
    //   });
    // },
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
  async created() {
    const { data } = await axios.get('/reviews/375');
    this.reviews = data;
  },
  mounted() {
    var ref = this.$refs;

    ref.prevBtn.style.opacity = .2;
    ref.prevBtn.style.cursor = 'initial';
  }
});
