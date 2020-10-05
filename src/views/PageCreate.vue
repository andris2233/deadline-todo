<template>
  <form class="create-form">
    <VFormElementWrapper>
      <VFormHeader class="create-form__header">
        {{label.header}}
      </VFormHeader>
    </VFormElementWrapper>

    <div class="create-form__content">

      <VFormElementWrapper>
        <VInputText v-model="title"
                    :text="title" 
                    :placeholder="label.title"
                    required
        />
      </VFormElementWrapper>

      <VFormElementWrapper>
        <VTextarea v-model="description"
                   :text="description" 
                   :placeholder="label.description"
                   required
        />
      </VFormElementWrapper>

      <VFormElementWrapper>
        <VTags :tags="tags"
               :placeholder="label.tags"
               @create-tag="createTag"
               @remove-tag="removeTag"
               required
        />
      </VFormElementWrapper>

      <VFormElementWrapper>
        <VCustomDatepicker v-model="date"
                           :placeholder="label.date"/>
      </VFormElementWrapper>

      <VFormButton :type="'button'"
                   :disabled="!formValid"
                   @click="createTask"
      >{{label.create}}</VFormButton>
    </div>
  </form>
</template>

<script>
import VTags from "@/components/VTags";
import VInputText from "@/components/VInputText";
import VCustomDatepicker from "@/components/VCustomDatepicker";
import VTextarea from "@/components/VTextarea";
import VFormHeader from "@/components/VFormHeader";
import VFormButton from "@/components/VFormButton";
import VFormElementWrapper from "@/components/VFormElementWrapper";

export default {
  components: {
    VTags,
    VInputText,
    VTextarea,
    VFormHeader,
    VFormButton,
    VFormElementWrapper,
    VCustomDatepicker,
  },
  data() {
    return {
      title: "",
      tags: [],
      description: "",
      date: null,
      label: {
        header: 'Создать задачу',
        title: 'Название',
        description: 'Описание',
        tags: 'Тэги',
        date: 'Дедлайн',
        create: 'Создать',
      },
    };
  },
  computed: {
    formValid() {
      const { title, tags, description, date } = this;
      return !!(title.trim().length && tags.length && description.trim().length && date);
    },
  },
  methods: {
    createTag(tag) {
      this.tags.push(tag);
    },
    removeTag(id) {
      this.tags = this.tags.filter((tag) => tag.id !== id);
    },
    createTask() {
      const { title, tags, description, date } = this;
      this.$store.dispatch("createTask", {
        id: Date.now(),
        title,
        tags,
        description,
        date,
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
  &__content {
    flex: 1;
    padding: 0 45px 45px 45px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &__header {
    font-weight: 700;
    font-size: 22px;
    color: #3f3f3f;
    text-align: center;
  }
}
</style>
