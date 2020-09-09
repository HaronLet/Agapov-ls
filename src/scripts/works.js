import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

const btns = {
  template: "#slider-btns"
};

const thumbs = {
  template: "#slider-thumbs",
  props: ["works", "currentWork", "baseUrl", "currentRefs"],
  // methods: {
  //   currentRefs() {
  //     return this.$refs;
  //   }
  // }
};

const tags = {
  template: "#slider-tags",
  props: ["currentWork"],
  computed: {
    tags() {
      return this.currentWork.techs.split(",").map(tag => tag.trim());
    }
  },
};

const info = {
  template: "#slider-info",
  components: { tags },
  props: ["currentWork"],
};

const display = {
  template: "#slider-display",
  components: {
    btns, 
    thumbs 
  },
  props: ["currentWork", "works", "currentIndex", "baseUrl"]
};

new Vue({
  el: "#work-slider-component",
  template: "#slider-container",
  components: {
    display,
    info
  },
  data() {
    return {
      works: [],
      currentIndex: 0,
      baseUrl: config.BASE_URL,
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    }
  },
  watch: {
    currentIndex(value) {
      this.active(value);
    }
  },
  methods: {
    // requireImagesToArray(data) {
    //   return data.map(item => {
    //     const requiredImage = require(`../images/content/${item.thumbs}`).default;
    //     item.thumbs = requiredImage;
    //     return item;
    //   });
    // },
    slide(direction) {
      const ref = this.$li;
      console.log(ref);

      // const widthItem = ref.item.style.width;


      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
        default:
          this.currentIndex = direction;
          break;
      }
    },
    active(value) {
      const worksNumber = this.works.length - 1;
      
      if (value < 0) {
        this.currentIndex = 0;
      }
      if (value > worksNumber) {
        this.currentIndex = worksNumber;
      }
    }
  },
  // created() {
  //   const data = require("../data/works.json");
  //   this.works = this.requireImagesToArray(data);
  // },
  async created() {
    const { data } = await axios.get('/works/375');
    this.works = data;
  }
});