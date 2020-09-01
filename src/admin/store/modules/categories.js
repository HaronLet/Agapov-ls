export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    REMOVE_CATEGORY: (state, catToRemove) => {
      console.log(catToRemove);
      state.data = state.data.filter(category => category.id !== catToRemove.id)
      console.log(state.data);
    },
    EDIT_CATEGORY: (state, catToEdit) => {
      const findCategory = category => {
        if (category.id === catToEdit.id) {
          category.category = catToEdit.category;
        }

        return category;
      }
      state.data = state.data.map(findCategory);
    },
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      })
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map(category => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
        }
        return category;
      })
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillInCategory = category => {
        category.skills = category.skills.map(skill => {
          return skill.id === skillToEdit.id ? skillToEdit : skill
        });
      }

      const findCategory = category => {
        if (category.id === skillToEdit.category) {
          editSkillInCategory(category);
        }

        return category;
      }
      state.data = state.data.map(findCategory);
    }
  },
  actions: {
    async create({ commit }, title) {
      try {
        const { data } = await this.$axios.post('/categories', { title });
        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async remove({commit}, catToRemove) {
      try {
        const { data } = await this.$axios.delete(`/categories/${catToRemove.id}`);
        commit("REMOVE_CATEGORY", catToRemove)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    },
    async edit({commit}, catToEdit) {
      // console.log(catToEdit);
      const title = catToEdit.category;
      try {
        const { data } = await this.$axios.post(`/categories/${catToEdit.id}`, { title });
        // console.log(data);
        commit("EDIT_CATEGORY", data.category)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    },
    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get('/categories/375');
        commit("SET_CATEGORIES", data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  }
}