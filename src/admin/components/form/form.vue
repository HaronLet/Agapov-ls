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
                  <app-button typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input 
                  v-model="newWork.title"
                  title="Название"
                />
              </div>
              <div class="form-row">
                <app-input 
                  v-model="newWork.link"
                  title="Ссылка"
                />
              </div>
              <div class="form-row">
                <app-input 
                  v-model="newWork.description"
                  field-type="textarea"
                  title="Описание"
                />
              </div>
              <div class="form-row">
                <tags-adder
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
  watch: {
    currentWork() {
      if (this.editMode) {
        this.newWork.title = this.currentWork.title;
        this.newWork.link = this.currentWork.link;
        this.newWork.description = this.currentWork.description;
        this.newWork.techs = this.currentWork.techs;
        this.newWork.preview = `https://webdev-api.loftschool.com/${this.currentWork.photo}`;
        this.newWork.photo = {};
        this.newWork.id = this.currentWork.id;
      };
    },
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (this.editMode) {
        await this.addNewWork(this.newWork);
        await this.handleReset();
      } else {
        await this.addNewWork(this.newWork);
        await this.handleReset();
      }
    },
    handleReset() {
      // this.newWork.title = "";
      // this.newWork.link = "";
      // this.newWork.description = "";
      // this.newWork.techs = "";
      // this.newWork.preview = "";
      // this.newWork.photo = {};
      // this.newWork.id = "";
      // this.$emit("reset", this.emptyFormIsShow);

      var request = new XMLHttpRequest();
      request.open('GET', this.newWork.preview, true);
      request.responseType = 'blob';
      request.onload = function() {
        var reader = new FileReader();
        reader.readAsDataURL(request.response);
          reader.onload = function(e) {
            console.log('DataURL:', e.target.result);
          };
      };
      request.send();

    // const a = new File(this.newWork.preview, "foo.jpg");
    // this.renderPhoto(a);
    // console.log(a);
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
