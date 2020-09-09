<template>
  <div class="form-reviews-component">
    <form class="form" @submit.prevent="handleSubmit" @reset="handleReset">
      <card title="Новый отзыв">
        <div class="form-container" slot="content">
          <div class="form-data">
            <div class="uploader-img">
              <label
                :style="{backgroundImage: `url(${newReview.preview})`}"
                :class="[ 'uploader', {active: newReview.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-btn">
                  <app-button typeAttr="plainfile" @change="handleChange" title="Добавить фото"></app-button>
                </div>
              </label>
            </div>
            <div class="form-text">
              <div class="form-row">
                <app-input class="autor" v-model="newReview.author" title="Имя автора" />
                <app-input class="autor" v-model="newReview.occ" title="Титул автора" />
              </div>
              <div class="form-row">
                <app-input class="textarea" v-model="newReview.text" field-type="textarea" title="Отзыв" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" typeAttr="reset" plain></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" typeAttr="submit"></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import { mapActions } from "vuex";

export default {
  components: { card, appButton, appInput },
  data() {
    return {
      hovered: false,
      newReview: {
        photo: {},
        author: "",
        occ: "",
        text: "",
        preview: "",
        id: ""
      },
    };
  },
  props: {
    currentReview: {
      type: Object,
      default: {},
    },
    editMode: Boolean,
    emptyFormIsShow: Boolean,
  },
  watch: {
    currentReview() {
      if (this.editMode) {
        this.newReview.author = this.currentReview.author;
        this.newReview.occ = this.currentReview.occ;
        this.newReview.text = this.currentReview.text;
        this.newReview.preview = `https://webdev-api.loftschool.com/${this.currentReview.photo}`;
        this.newReview.photo = {};
        this.newReview.id = this.currentReview.id;
      };
    },
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit(event) {
      if (this.editMode) {
        await this.$emit("edit", this.newReview);
        await this.handleReset();
      } else {
        await this.addNewReview(this.newReview);
        await this.handleReset();
      }
    },
    handleReset() {
      this.newReview.photo = {};
      this.newReview.author = "";
      this.newReview.occ = "";
      this.newReview.text = "";
      this.newReview.preview = "";
      this.newReview.id = "";
      this.$emit("reset", this.emptyFormIsShow);
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newReview.preview = reader.result;
      };
    },
  },
  created() {
    if (this.editMode) {
      this.newReview.author = this.currentReview.author;
      this.newReview.occ = this.currentReview.occ;
      this.newReview.text = this.currentReview.text;
      this.newReview.preview = `https://webdev-api.loftschool.com/${this.currentReview.photo}`;
      this.newReview.photo = {};
      this.newReview.id = this.currentReview.id;
    };    
  }
};
</script>

<style src="./formReviews.pcss" lang="postcss" scoped></style>
