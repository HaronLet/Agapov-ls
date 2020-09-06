export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_REVIEWS(state, newReviews) {
      state.data.push(newReviews);
    },
    SET_REVIEWS(state, reviews) {
      state.data = reviews;
    }
  },
  actions: {
    async add({ commit }, newReviews) {
      const formData = new FormData();
      
      Object.keys(newReviews).forEach(item => {
        formData.append(item, newReviews[item]);
      })

      console.log(newReviews);

      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEWS", data);
      } catch (error) {
        console.log("error");
      }
    },

    async fetch({commit}) {
      try {
        const { data } = await this.$axios.get("/reviews/375");
        commit("SET_REVIEWS", data);
      } catch (error) {
        console.log("error");
      }
    }
  },
};
