export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },
    SET_WORKS(state, works) {
      state.data = works;
    },
    REMOVE_WORKS: (state, works) => {
      state.data = state.data.filter(work => work.id !== works.id);
    },
    EDIT_WORKS: (state, works) => {
      const findWork = work => {
        if (work.id === works.id) {
          return works;;
        }

        return work;
      }
      state.data = state.data.map(findWork);
    },
  },
  actions: {
    async add({ commit }, newWork) {
      const formData = new FormData();
      
      Object.keys(newWork).forEach(item => {
        formData.append(item, newWork[item]);
      })

      try {
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        console.log("error");
      }
    },
    async remove({commit}, workToRemove) {
      try {
        const { data } = await this.$axios.delete(`/works/${workToRemove.id}`);
        commit("REMOVE_WORKS", workToRemove)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    },
    async edit({commit}, workToEdit) {
      try {
        const { data } = await this.$axios.post(`/works/${workToEdit.id}`, workToEdit);
        commit("EDIT_WORKS", data.work)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    },
    async fetch({commit}) {
      try {
        const { data } = await this.$axios.get("/works/375");
        commit("SET_WORKS", data);
      } catch (error) {
        console.log("error");
      }
    }
  },
};
