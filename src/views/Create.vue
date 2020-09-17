<template>
  <form>
    <div class="form-element__wrapper">
      <FormHeader :value="'Создать задачу'" />
    </div>

    <div class="form-content">
      <div class="form-element__wrapper">
        <InputText v-bind:text="title" v-bind:placeholder="'Название'" v-model="title" />
      </div>

      <div class="form-element__wrapper">
        <TextArea v-bind:text="description" v-bind:placeholder="'Описание'" v-model="description" />
      </div>

      <div class="form-element__wrapper">
        <Chips
          v-bind:tags="tags"
          v-bind:placeholder="'Тэги'"
          @create-tag="createTag"
          @remove-tag="removeTag"
        />
      </div>
      <div class="form-element__wrapper">
        <Datepicker v-bind:placeholder="'Дедлайн'" v-model="date" v-bind:date="date" />
      </div>
      <FormButton :type="'button'" @click="createTask" :disabled="!formValid">{{'Создать'}}</FormButton>
    </div>
  </form>
</template>

<script>
import Chips from "@/components/Chips";
import InputText from "@/components/InputText";
import Datepicker from "@/components/Datepicker";
import TextArea from "@/components/TextArea";
import FormHeader from "@/components/FormHeader";
import FormButton from "@/components/FormButton";

export default {
  data() {
    return {
      title: "",
      tags: [],
      description: "",
      date: null,
    };
  },
  computed: {
    formValid() {
      return (
        this.title.trim().length &&
        this.tags.length &&
        this.description.trim().length &&
        this.date
      );
    },
  },
  components: {
    Chips,
    InputText,
    Datepicker,
    TextArea,
    FormHeader,
    FormButton,
  },
  methods: {
    createTag(tag) {
      this.tags.push(tag);
    },
    removeTag(id) {
      this.tags = this.tags.filter((tag) => tag.id !== id);
    },
    changeTitle(title) {
      this.title = title;
    },
    changeDeadline(date) {
      this.date = date;
    },
    changeDescription(description) {
      this.description = description;
    },
    createTask() {
      this.$store.dispatch("createTask", {
        id: Date.now(),
        title: this.title,
        tags: this.tags,
        description: this.description,
        date: this.date.getTime(),
        status: "active",
      });
      this.$router.push("/list");
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 600px;
  border-radius: 7px;
  box-shadow: 0 0 2px #c2c2c2;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #dadada;
  overflow: hidden;
}

.form-content {
  flex: 1;
  padding: 0 45px 45px 45px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.form-element__wrapper {
  margin-bottom: 10px;
}

.create-header {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding: 30px 0;
  background: #fcfcfc;
  border-bottom: 1px solid #dadada;
  color: #3f3f3f;
}

button {
  border: 0;
  background: #328bca;
  padding: 8px 0;
  border-radius: 20px;
  transition: all ease 0.3s;
  color: white;
  width: 110px;
  outline: none;
  box-shadow: 0 0px 5px #328bca;
}

button:hover {
  transform: scale(1.1);
  background: white;
  box-shadow: 0 0px 10px #328bca;
  color: #328bca;
}

button:active {
  transform: scale(1);
}

button:disabled,
button:disabled:hover {
  background: #328bca;
  box-shadow: 0 0px 5px #328bca;
  color: white;
  opacity: 0.5;
  transform: scale(1);
}

/* button:disabled:hover {
  background: #328bca;
  box-shadow: 0 5px 5px #328bca;
  color: white;
  box-shadow: none;
  transform: scale(1);
} */
</style>