<template>
  <div class="task">
    <FormElementWrapper>
      <FormHeader>
        <div class="header__row">
          <InputText
            v-bind:text="taskCopy.title"
            v-model="taskCopy.title"
            v-bind:placeholder="'Название'"
            :disabled="disabled"
          />
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
        <TextArea
          :disabled="disabled"
          v-model="taskCopy.description"
          v-bind:placeholder="'Описание'"
        />
      </FormElementWrapper>

      <FormElementWrapper>
        <Chips
          :disabled="disabled"
          :tags="taskCopy.tags"
          v-bind:placeholder="'Тэги'"
          @create-tag="createTag"
          @remove-tag="removeTag"
        />
      </FormElementWrapper>

      <FormElementWrapper>
        <Datepicker
          :disabled="disabled"
          :date="taskCopy.date"
          v-model="taskCopy.date"
          v-bind:placeholder="'Дедлайн'"
        />
      </FormElementWrapper>

      <transition name="buttons" mode="out-in">
        <div v-if="disabled" :key="'not-edit'">
          <TableButton @click="completeTask" :theme="'green'" class="button-margin">
            <i class="material-icons">done</i>
          </TableButton>
          <TableButton @click="deletePopup=true" :theme="'red'">
            <i class="material-icons">delete</i>
          </TableButton>
        </div>

        <div v-else :key="'edit'">
          <FormButton @click="saveTask" class="button-margin" :disabled="!validSave">{{'Сохранить'}}</FormButton>
          <FormButton @click="cancelChanges">{{'Отмена'}}</FormButton>
        </div>
      </transition>

      <Popup @cancel="deletePopup=false" :show="deletePopup">
        <template v-slot:header style="padding: 5px">
          <div>{{'Вы действительно хотите удалить задачу?'}}</div>
        </template>
        <template v-slot:body>{{'После подтверждения отменить действие будет невозможно!'}}</template>
        <template v-slot:control>
          <div class="popup-btns">
            <FormButton @click="removeTask" class="button-margin">{{'Удалить'}}</FormButton>
            <FormButton @click="deletePopup=false">{{'Отмена'}}</FormButton>
          </div>
        </template>
      </Popup>
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
import InputText from "@/components/InputText";
import Popup from "@/components/Popup";

export default {
  computed: {
    task() {
      return this.$store.getters.taskById(this.$route.params.id);
    },
    validSave() {
      if (
        this.taskCopy.title.trim() &&
        this.taskCopy.tags.length &&
        this.taskCopy.description.trim() &&
        this.taskCopy.date
      ) {
        return true;
      } else {
        return false;
      }
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
      deletePopup: false,
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
    InputText,
    Popup,
  },
  methods: {
    completeTask() {
      this.$store.dispatch("completeTask", this.taskCopy.id);
      this.$router.push("/list");
    },
    removeTask() {
      this.$store.dispatch("removeTask", this.taskCopy.id);
    },
    cancelChanges() {
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
      this.$store.dispatch("saveTask", this.taskCopy);
      this.disabled = true;
    },
    createTag(tag) {
      this.taskCopy.tags.push(tag);
    },
    removeTag(id) {
      this.taskCopy.tags = this.taskCopy.tags.filter((tag) => tag.id !== id);
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

.popup-btns {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.buttons-enter-active,
.buttons-leave-active {
  transition: 0.2s;
  transform-origin: top left;
}

.buttons-enter,
.buttons-leave-to {
  transform: translateX(5%);
  opacity: 0;
}
</style>