<template>
  <div class="task">
    <FormElementWrapper>
      <FormHeader>
        <div class="task__header">
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
    <div class="task__content">
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
          <TableButton
            @click="popupType='COMPLETE'; popup='Popup'"
            :theme="'green'"
            class="button-margin"
            :disabled="completeButtonDisabled"
          >
            <i class="material-icons">done</i>
          </TableButton>
          <TableButton @click="popupType='DELETE'; popup='Popup'" :theme="'red'">
            <i class="material-icons">delete</i>
          </TableButton>
        </div>

        <div v-else :key="'edit'">
          <FormButton @click="saveTask" class="button-margin" :disabled="!validSave">{{'Сохранить'}}</FormButton>
          <FormButton @click="cancelChanges">{{'Отмена'}}</FormButton>
        </div>
      </transition>

      <component :is="popup" @cancel="popup=''">
        <template v-slot:header>
          <div class="popup-header">{{popupQuestion}}</div>
        </template>
        <template v-slot:body>{{'После подтверждения отменить действие будет невозможно!'}}</template>
        <template v-slot:control>
          <div class="popup-btns">
            <FormButton @click="popupCommit">{{popupCommitButton}}</FormButton>
            <FormButton @click="popup=''">{{'Отмена'}}</FormButton>
          </div>
        </template>
      </component>
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
    popupQuestion() {
      if (this.popupType === "DELETE") {
        return "Вы действительно хотите удалить задачу?";
      } else {
        return "Завершили выполнение задачи?";
      }
    },
    popupCommitButton() {
      if (this.popupType === "DELETE") {
        return "Удалить";
      } else {
        return "Завершить";
      }
    },
    completeButtonDisabled() {
      return this.taskCopy.status === "completed";
    },
  },
  created() {
    this.taskCopy = JSON.parse(
      JSON.stringify(this.$store.getters.taskById(this.$route.params.id))
    );
  },
  data() {
    return {
      disabled: true,
      taskCopy: null,
      popup: "",
      popupType: "DELETE",
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
    popupCommit() {
      if (this.popupType === "DELETE") {
        this.$store.dispatch("removeTask", this.taskCopy.id);
        this.$router.push("/list");
      } else {
        this.$store.dispatch("completeTask", this.taskCopy.id);
        this.$router.push("/list");
      }
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

<style lang="scss" scoped>
.task {
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #fff;
  border-radius: 7px;

  .task__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 45px;
  }

  .task__content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
    padding: 0 45px 45px 45px;
  }
}

.edit {
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  &.edit__disable {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  &.edit__enable {
    color: #e67504;
  }
}

.button-margin {
  margin: 0 5px 0 0;
}

.popup-header {
  font-weight: 700;
  font-size: 18px;
  color: #328bca;
  padding: 5px 0;
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