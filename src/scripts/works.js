import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

const btns = {
  template: "#slider-btns"
};

const thumbs = {
  template: "#slider-thumbs",
  props: ["works", "currentWork", "baseUrl"],
};

const tags = {
  template: "#slider-tags",
  props: ["currentWork"],
  computed: {
    tags() {
      return this.currentWork.techs.split(",").map(tag => tag.trim());
    },
  },
};

const info = {
  template: "#slider-info",
  components: { tags },
  props: ["currentWork"],
};

const display = {
  template: "#slider-display",
  components: { btns, thumbs },
  props: ["currentWork", "works", "currentIndex", "baseUrl"]
};

new Vue({
  el: "#work-slider-component",
  template: "#slider-container",
  components: { display, info },
  data() {
    return {
      works: [],
      currentIndex: 0,
      baseUrl: config.BASE_URL,
    }
  },
  computed: {
    currentWork() {
      return this.works[0];
    },
  },
  watch: {
    currentIndex(value) {
      this.active(value);
    }
  },
  methods: {
    slide(direction) {
      const lastItem = this.works[this.works.length - 1];

      switch (direction) {
        case "next":
          this.works.push(this.works[0]);
          this.works.shift();
          this.currentIndex++;
          break;
        case "prev":
          this.works.unshift(lastItem);
          this.works.pop();
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
        this.currentIndex = worksNumber;
      }
      if (value > worksNumber) {
        this.currentIndex = 0;
      }
    },
  },
  async created() {
    const { data } = await axios.get('/works/375');
    this.works = data;
  }
});