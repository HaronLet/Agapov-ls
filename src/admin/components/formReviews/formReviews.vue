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
                  <app-button
                    :errorMessage="validation.firstError('newReview.photo')"
                    @change="handleChange"
                    typeAttr="plainfile"
                    title="Добавить фото"
                  ></app-button>
                </div>
              </label>
            </div>
            <div class="form-text">
              <div class="form-row">
                <app-input
                  :errorMessage="validation.firstError('newReview.author')"
                  class="autor"
                  v-model="newReview.author"
                  title="Имя автора"
                />
                <app-input
                  :errorMessage="validation.firstError('newReview.occ')"
                  class="autor"
                  v-model="newReview.occ"
                  title="Титул автора"
                />
              </div>
              <div class="form-row">
                <app-input
                  :errorMessage="validation.firstError('newReview.text')"
                  class="textarea"
                  v-model="newReview.text"
                  field-type="textarea"
                  title="Отзыв"
                />
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
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

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
  mixins: [ValidatorMixin],
  validators: {
    "newReview.author": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newReview.occ": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newReview.text": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newReview.photo": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
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
      editReviewsAction: "reviews/edit",
      showTooltip: "tooltips/show",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit(event) {
      if (await this.$validate() === false) return;
      this.$validate().reset;

      try {
        if (this.editMode) {
          await this.editReviewsAction(this.newReview);
          await this.handleReset();
          this.showTooltip({
            text: "Отзыв изменён",
          });
        } else {
          await this.addNewReview(this.newReview);
          await this.handleReset();
          this.showTooltip({
            text: "Отзыв добавлен",
          });
        }
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error"
        })
      }
    },
    handleReset() {
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
