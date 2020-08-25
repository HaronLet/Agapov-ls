import skill from "./skill.vue";

export default {
  title: "skill",
  components: { skill }
};

export const defaultView = () => ({
  components: { skill },
  template: `
    <skill></skill>
  `
});

defaultView.story = {
  name: "Стандартный вид"
}
