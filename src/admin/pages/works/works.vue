<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">
            Блок "Работы"
          </div>
        </div>
        <div class="form" v-if="emptyFormIsShow">
          <app-form 
            @reset="FormIsShow"
            :currentWork="currentWork"
            :editMode="editMode"
          />
        </div>
        <ul class="cards">
          <li class="item">
            <square-btn 
              type="square"
              title="Добавить работу" 
              @click="emptyFormIsShow = true"
            />
          </li>
          <li class="item" v-for="work in works" :key="work.id">
            <work-card
              :work="work"
              @edit="editWorkCard(work)"
              @remove="removeWork(work)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/form";
import workCard from "../../components/workCard";
import squareBtn from "../../components/button";
import { mapState, mapActions } from "vuex";

export default {
  components: { appForm, workCard, squareBtn },
  data() {
    return {
      emptyFormIsShow: false,
      editMode: false,
      currentWork: {},
    }
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      removeWorksAction: "works/remove",
      fetchWorks: "works/fetch",
      showTooltip: "tooltips/show",
    }),
    addWork() {
      this.emptyFormIsShow = false;
    },
    FormIsShow(e) {
      this.emptyFormIsShow = e;
      this.editMode = false;
    },
    async editWorkCard(work) {
      this.emptyFormIsShow = true;
      this.editMode = true;
      this.currentWork = work;
    },
    async removeWork(work) {
      await this.removeWorksAction(work);
      this.showTooltip({
        text: "Работа удалёна",
      });
    },
  },
  mounted() {
    this.fetchWorks();
  }
};
</script>

<style scoped lang="postcss" src="./works.pcss"></style>
