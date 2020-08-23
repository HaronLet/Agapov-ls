import Vue from "vue";

const skillsItem = {
  template: "#skills-item",
  props: ["skill"],
  methods: {
    drawCircle() {
      const circle = this.$refs["colored-circle"];
      const dashOffset = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
      const percent = (dashOffset / 100) * (100 - this.skill.percent);

      circle.style.strokeDashoffset = percent;
    }
  },
  mounted() {
    this.drawCircle();
  }
};

const skillsRow = {
  template: "#skills-row",
  components: {
    skillsItem
  },
  props: ["category"],
  computed: {
    categorySkills() {
      const matchSkillAndCatId = skill => skill.category === this.category.id;
      return this.skills.filter(matchSkillAndCatId);
    }
  }
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  components: {
    skillsRow
  },
  data() {
    return {
      skills: []
    }
  },
  created() {
    this.skills = require("../data/skills.json");
  }
});
