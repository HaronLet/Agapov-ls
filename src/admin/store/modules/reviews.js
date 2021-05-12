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
    },
    REMOVE_REVIEWS: (state, reviews) => {
      state.data = state.data.filter(review => review.id !== reviews.id);
    },
    EDIT_REVIEWS: (state, reviews) => {
      const findreview = review => {
        if (review.id === reviews.id) {
          return reviews;
        }
  
        return review;
      }
      state.data = state.data.map(findreview);
    },
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
    async remove({commit}, reviewToRemove) {
      console.log(reviewToRemove);
      try {
        const { data } = await this.$axios.delete(`/reviews/${reviewToRemove.id}`);
        commit("REMOVE_REVIEWS", reviewToRemove)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    },
    async edit({commit}, reviewToEdit) {
      try {
        const { data } = await this.$axios.post(`/reviews/${reviewToEdit.id}`, reviewToEdit);
        commit("EDIT_REVIEWS", data.review)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
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
