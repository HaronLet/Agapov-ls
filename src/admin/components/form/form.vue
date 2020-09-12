<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit" @reset="handleReset">
      <card title="Редактирование работы">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                :style="{backgroundImage: `url(${newWork.preview})`}"
                :class="[ 'uploader', {active: newWork.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите картинку</div>
                <div class="uploader-btn">
                  <app-button
                    :errorMessage="validation.firstError('newWork.photo')"
                    @change="handleChange"
                    typeAttr="file"
                  ></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input
                  :errorMessage="validation.firstError('newWork.title')"
                  v-model="newWork.title"
                  title="Название"
                />
              </div>
              <div class="form-row">
                <app-input
                  :errorMessage="validation.firstError('newWork.link')"
                  v-model="newWork.link"
                  title="Ссылка"
                />
              </div>
              <div class="form-row">
                <app-input
                  :errorMessage="validation.firstError('newWork.description')"
                  v-model="newWork.description"
                  field-type="textarea"
                  title="Описание"
                />
              </div>
              <div class="form-row">
                <tags-adder
                  :errorMessage="validation.firstError('newWork.techs')"
                  v-model="newWork.techs"
                />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" typeAttr="reset" plain></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" typeAttr="submit" />
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
import tagsAdder from "../tagsAdder";
import { mapActions } from "vuex";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  components: { card, appButton, appInput, tagsAdder },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
        id: ""
      },
    };
  },
  props: {
    currentWork: {
      type: Object,
      default: {},
    },
    editMode: Boolean,
    emptyFormIsShow: Boolean,
  },
  mixins: [ValidatorMixin],
  validators: {
    "newWork.title": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newWork.link": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newWork.description": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newWork.techs": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newWork.photo": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
  },
  watch: {
    currentWork() {
      if (this.editMode) {
        this.newWork.title = this.currentWork.title;
        this.newWork.link = this.currentWork.link;
        this.newWork.description = this.currentWork.description;
        this.newWork.techs = this.currentWork.techs;
        this.newWork.preview = `https://webdev-api.loftschool.com/${this.currentWork.photo}`;
        this.newWork.photo = this.currentWork.photo;
        this.newWork.id = this.currentWork.id;
      };
    },
  },
  methods: {
    ...mapActions({
      editWorksAction: "works/edit",
      addNewWork: "works/add",
      showTooltip: "tooltips/show",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (await this.$validate() === false) return;
      this.$validate().reset;

      try {
        if (this.editMode) {
          await this.editWorksAction(this.newWork);
          await this.handleReset();
          this.showTooltip({
            text: "Работа изменена",
          });
        } else {
          await this.addNewWork(this.newWork);
          await this.handleReset();
          this.showTooltip({
            text: "Работа добавлена",
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

      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newWork.preview = reader.result;
      };
    },
  },
  created() {
    if (this.editMode) {
      this.newWork.title = this.currentWork.title;
      this.newWork.link = this.currentWork.link;
      this.newWork.description = this.currentWork.description;
      this.newWork.techs = this.currentWork.techs;
      this.newWork.preview = `https://webdev-api.loftschool.com/${this.currentWork.photo}`;
      this.newWork.photo = {};
      this.newWork.id = this.currentWork.id;
    };
  }
};
</script>

<style src="./form.pcss" lang="postcss" scoped></style>
