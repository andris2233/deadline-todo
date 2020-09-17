<template>
  <div class="task">
    <FormElementWrapper>
      <FormHeader :value="task.title" />
    </FormElementWrapper>
    <div class="task-content">
      <FormElementWrapper>
        <TextArea :disabled="true" :text="task.description" />
      </FormElementWrapper>
      <FormElementWrapper>
        <Chips :disabled="true" :tags="task.tags" />
      </FormElementWrapper>
      <FormElementWrapper>
        <Datepicker :disabled="true" :date="new Date(task.date)" />
      </FormElementWrapper>

      <FormElementWrapper>
        <div class="button-row">
          <FormButton @click="completeTask">{{'Завершить'}}</FormButton>
          <FormButton @click="removeTask">{{'Удалить'}}</FormButton>
        </div>
      </FormElementWrapper>
    </div>
  </div>
</template>

<script>
import TextArea from "@/components/TextArea";
import Chips from "@/components/Chips";
import Datepicker from "@/components/Datepicker";
import FormHeader from "@/components/FormHeader";
import FormElementWrapper from "@/components/FormElementWrapper";
import FormButton from "@/components/FormButton";

export default {
  computed: {
    task() {
      return this.$store.getters.taskById(this.$route.params.id);
    },
  },
  components: {
    TextArea,
    Chips,
    Datepicker,
    FormHeader,
    FormElementWrapper,
    FormButton,
  },
  methods: {
    completeTask() {
      console.log("complete!");
    },
    removeTask() {
      console.log("remove!");
    },
  },
};
</script>

<style scoped>
.task {
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #fff;
  border-radius: 7px;
  overflow: hidden;
}

.task-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  padding: 0 45px 45px 45px;
}

.button-row {
  display: flex;
  justify-content: space-between;
}
</style>