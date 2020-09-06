import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

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
  async created() {
    const { data } = await axios.get('/categories/375');
    this.skills = data;
  }
});
