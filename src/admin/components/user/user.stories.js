import user from "./user.vue";

export default {
  title: "user",
  components: { user }
};

export const defaultView = () => ({
  components: { user },
  template: `
    <user></user>
  `
});

defaultView.story = {
  name: "Стандартный вид"
}
