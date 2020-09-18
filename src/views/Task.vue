<template>
  <div class="task">
    <FormElementWrapper>
      <FormHeader>
        <div class="header__row">
          {{taskCopy.title}}
          <i
            class="material-icons edit"
            :class="[disabled ? 'edit__disable' : 'edit__enable']"
            @click="disabled=false"
          >edit</i>
        </div>
      </FormHeader>
    </FormElementWrapper>
    <div class="task-content">
      <FormElementWrapper>
        <TextArea :disabled="disabled" v-model="taskCopy.description" />
      </FormElementWrapper>
      <FormElementWrapper>
        <Chips :disabled="disabled" :tags="taskCopy.tags" />
      </FormElementWrapper>
      <FormElementWrapper>
        <Datepicker :disabled="disabled" :date="taskCopy.date" v-model="taskCopy.date" />
      </FormElementWrapper>

      <!-- <FormElementWrapper> -->
      <div v-if="disabled">
        <TableButton @click="completeTask" :theme="'green'" class="button-margin">
          <i class="material-icons">done</i>
        </TableButton>
        <TableButton @click="removeTask" :theme="'red'">
          <i class="material-icons">delete</i>
        </TableButton>
      </div>

      <div v-else>
        <FormButton @click="saveTask" class="button-margin">{{'Сохранить'}}</FormButton>
        <FormButton @click="cancelChanges">{{'Отмена'}}</FormButton>
      </div>
      <!-- </FormElementWrapper> -->
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
import TableButton from "@/components/TableButton";

export default {
  computed: {
    task() {
      return this.$store.getters.taskById(this.$route.params.id);
    },
  },
  created() {
    this.taskCopy = JSON.parse(
      JSON.stringify(this.$store.getters.taskById(this.$route.params.id))
    );
    // this.taskCopy.date = new Date(this.taskCopy.date);
  },
  data() {
    return {
      disabled: true,
      taskCopy: null,
    };
  },
  components: {
    TextArea,
    Chips,
    Datepicker,
    FormHeader,
    FormElementWrapper,
    TableButton,
    FormButton,
  },
  methods: {
    completeTask() {
      console.log("complete!");
    },
    removeTask() {
      console.log("remove!");
    },
    cancelChanges() {
      console.log("canceled");
      this.taskCopy.description = this.$store.getters.taskById(
        this.$route.params.id
      ).description;
      this.taskCopy.title = this.$store.getters.taskById(
        this.$route.params.id
      ).title;
      this.taskCopy.date = this.$store.getters.taskById(
        this.$route.params.id
      ).date;
      this.taskCopy.tags = [
        ...this.$store.getters.taskById(this.$route.params.id).tags,
      ];
      this.disabled = true;
    },
    saveTask() {
      console.log("save");
      this.disabled = true;
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

.button-margin {
  margin: 0 5px 0 0;
}

.header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 45px;
}

.edit {
  transition: 0.3s;
  outline: none;
  cursor: pointer;
}

.edit__disable {
  opacity: 0.6;
}

.edit__disable:hover {
  opacity: 1;
}

.edit__enable {
  color: #e67504;
}
</style>