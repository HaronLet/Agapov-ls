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
  el: "#slider-component",
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
      return this.works[0];
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfititeLoopForCurIndex(value);
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
      }
    },
    makeInfititeLoopForCurIndex(value) {
      const worksNumber = this.works.length - 1;

      if (value < 0) this.currentIndex = worksNumber;
      if (value > worksNumber) this.currentIndex = 0;
    }
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.requireImagesToArray(data);
  }
});