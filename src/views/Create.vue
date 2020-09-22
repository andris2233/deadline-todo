<template>
  <form class="create-form">
    <FormElementWrapper>
      <FormHeader :value="'Создать задачу'" class="create-form__header">{{'Создать задачу'}}</FormHeader>
    </FormElementWrapper>

    <div class="create-form__content">
      <FormElementWrapper>
        <InputText v-bind:text="title" v-bind:placeholder="'Название'" v-model="title" />
      </FormElementWrapper>

      <FormElementWrapper>
        <TextArea v-bind:text="description" v-bind:placeholder="'Описание'" v-model="description" />
      </FormElementWrapper>

      <FormElementWrapper>
        <Chips
          v-bind:tags="tags"
          v-bind:placeholder="'Тэги'"
          @create-tag="createTag"
          @remove-tag="removeTag"
        />
      </FormElementWrapper>

      <FormElementWrapper>
        <Datepicker v-bind:placeholder="'Дедлайн'" v-model="date" v-bind:date="date" />
      </FormElementWrapper>

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
import FormElementWrapper from "@/components/FormElementWrapper";

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
    FormElementWrapper,
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
        date: this.date,
        status: "active",
      });
      this.$router.push("/list");
    },
  },
};
</script>

<style lang="scss" scoped>
.create-form {
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

  .create-form__content {
    flex: 1;
    padding: 0 45px 45px 45px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .create-form__header {
    font-weight: 700;
    font-size: 22px;
    color: #3f3f3f;
    text-align: center;
  }
}
</style>