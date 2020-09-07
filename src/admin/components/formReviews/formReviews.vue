<template>
  <div class="form-reviews-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Новый отзыв">
        <div class="form-container" slot="content">
          <div class="form-data">
            <div class="uploader-img">
              <label
                :style="{backgroundImage: `url(${newReviews.preview})`}"
                :class="[ 'uploader', {active: newReviews.preview}, {
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
                <app-input class="autor" v-model="newReviews.author" title="Имя автора" />
                <app-input class="autor" v-model="newReviews.occ" title="Титул автора" />
              </div>
              <div class="form-row">
                <app-input class="textarea" v-model="newReviews.text" field-type="textarea" title="Отзыв" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" plain></app-button>
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
      newReviews: {
        photo: {},
        author: "",
        occ: "",
        text: "",
        preview: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      await this.addNewReview(this.newReviews);
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      this.newReviews.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newReviews.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./formReviews.pcss" lang="postcss" scoped></style>
