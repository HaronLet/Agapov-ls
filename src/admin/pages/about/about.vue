<template>
  <div class="about-page-component">
    <div class="page-content">
      <div class="app-container" v-if="categories.length">
        <div class="app-header">
          <div class="app-title">Блок "Обо мне"</div> 
          <iconed-button 
            type="iconed" 
            v-if="emptyCatIsShow === false"
            @click="emptyCatIsShow = true" 
            title="Добавить группу" 
          />
        </div>
        <ul class="app-skills">
          <li class="app-item" v-if="emptyCatIsShow">
            <category 
              @remove="emptyCatIsShow = false"
              @approve="createCategory"
              empty 
            />
          <li 
            v-for="category in categories"
            :key="category.id"
            class="app-item" 
          >
            <category 
              :title="category.category"
              :skills="category.skills"
              @create-skill="createSkill($event, category.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
            />
          </li>
        </ul>
      </div>
      <div class="container" v-else>
        loading...
      </div>
    </div>
  </div>
</template>


<script>
  import button from "../../components/button";
  import category from "../../components/category";
  import { mapActions, mapState } from "vuex";

  export default {
    components: {
      iconedButton: button,
      category
    },
    data() {
      return {
        emptyCatIsShow: false
      }
    },
    computed: {
      ...mapState("categories", {
        categories: state => state.data
      })
    },
    methods: {
      ...mapActions({
        createCategoryAction: "categories/create",
        fetchCategoriesAction: "categories/fetch",
        addSkillAction: "skills/add",
        removeSkillAction: "skills/remove",
        editSkillAction: "skills/edit",
      }),
      async createSkill(skill, categoryId) {
        const newSkill = {
          ...skill,
          category: categoryId
        }
        await this.addSkillAction(newSkill);

        skill.title = "";
        skill.percent = "";
      },
      removeSkill(skill) {
        this.removeSkillAction(skill);
      },
      async editSkill(skill) {
        await this.editSkillAction(skill);
        skill.editmode = false;
      },
      async createCategory(categoryTitle) {
        try {
          await this.createCategoryAction(categoryTitle);
          this.emptyCatIsShown = false;
        } catch (error) {
          console.log(error.message); 
        }
      }
    },
    created() {
      this.fetchCategoriesAction();
    }
  };
</script>

<style lang="postcss" scoped src="./about.pcss">
</style>