import Vue from "vue";

const btns = {
  template: "#slider-btns"
};

const thumbs = {
  template: "#slider-thumbs",
  props: ["works","currentWork"]
};

const tags = {
  template: "#slider-tags",
  props: ["tags"]
};

const info = {
  template: "#slider-info",
  components: { tags },
  props: ["currentWork"],
  computed: {
    tagsArray() {
      return this.currentWork.tag.split(",");
    }
  }
};

const display = {
  template: "#slider-display",
  components: {
    btns, 
    thumbs 
  },
  props: ["currentWork", "works", "currentIndex"]
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
      currentIndex: 0
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
    requireImagesToArray(data) {
      return data.map(item => {
        const requiredImage = require(`../images/content/${item.thumbs}`).default;
        item.thumbs = requiredImage;
        return item;
      });
    },
    slide(direction) {
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
  created() {
    const data = require("../data/works.json");
    this.works = this.requireImagesToArray(data);
  }
});