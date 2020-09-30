<template>
  <div class="task">
    <VFormElementWrapper>
      <VFormHeader>
        <div class="task__header">
          <VInputText v-model="taskCopy.title"
                      :text="taskCopy.title"
                      :placeholder="label.title"
                      :disabled="disabled"
          />
          <i @click="disabled=false"
             :class="[disabled ? 'edit__disable' : 'edit__enable']"
             class="material-icons edit"
          >edit</i>
        </div>
      </VFormHeader>
    </VFormElementWrapper>
    <div class="task__content">
      <VFormElementWrapper>
        <VTextarea v-model="taskCopy.description"
                   :disabled="disabled"
                   :placeholder="label.description"
        />
      </VFormElementWrapper>

      <VFormElementWrapper>
        <VTags :disabled="disabled"
               :tags="taskCopy.tags"
               :placeholder="label.tags"
               @create-tag="createTag"
               @remove-tag="removeTag"
        />
      </VFormElementWrapper>

      <VFormElementWrapper>
        <VDatepicker v-model="taskCopy.date"
                     :disabled="disabled"
                     :date="taskCopy.date"
                     :placeholder="label.date"
        />
      </VFormElementWrapper>

      <transition name="buttons" mode="out-in">
        <div v-if="disabled" :key="'not-edit'">
          <VTableButton @click="showPopup(popupTypes.COMPLETE)"
                        :theme="'green'"
                        :disabled="completeButtonDisabled"
                        class="button-margin"
          >
            <i class="material-icons">done</i>
          </VTableButton>
          <VTableButton @click="showPopup(popupTypes.DELETE)" :theme="'red'">
            <i class="material-icons">delete</i>
          </VTableButton>
        </div>

        <div v-else :key="'edit'">
          <VFormButton @click="saveTask"
                       :disabled="!validSave"
                       class="button-margin"
          >{{'Сохранить'}}</VFormButton>
          <VFormButton @click="cancelChanges">{{label.cancel}}</VFormButton>
        </div>
      </transition>

      <component :is="popup" @cancel="popup=''">
        <template #header>
          <div class="popup-header">{{popupQuestion}}</div>
        </template>
        <template #body>{{label.warning}}</template>
        <template #control>
          <div class="popup-btns">
            <VFormButton @click="popupCommit">{{popupCommitButton}}</VFormButton>
            <VFormButton @click="popup=''">{{label.cancel}}</VFormButton>
          </div>
        </template>
      </component>
    </div>
  </div>
</template>

<script>
import VTextarea from "@/components/VTextarea";
import VTags from "@/components/VTags";
import VDatepicker from "@/components/VDatepicker";
import VFormHeader from "@/components/VFormHeader";
import VFormElementWrapper from "@/components/VFormElementWrapper";
import VFormButton from "@/components/VFormButton";
import VTableButton from "@/components/VTableButton";
import VInputText from "@/components/VInputText";
import VPopup from "@/components/VPopup";

export default {
  components: {
    VTextarea,
    VTags,
    VDatepicker,
    VFormHeader,
    VFormElementWrapper,
    VTableButton,
    VFormButton,
    VInputText,
    VPopup,
  },
  data() {
    return {
      disabled: true,
      taskCopy: null,
      popup: '',
      popupType: '',
      popupTypes: {
        DELETE: 'DELETE',
        COMPLETE: 'COMPLETE',
      },
      label: {
        title: 'Название',
        description: 'Описание',
        tags: 'Тэги',
        date: 'Дедлайн',
        cancel: 'Отмена',
        warning: 'После подтверждения отменить действие будет невозможно!',
        deleteQuestion: "Вы действительно хотите удалить задачу?",
        completeQuestion: "Завершили выполнение задачи?",
        deleteButton: "Удалить",
        completeButton: "Завершить",
      }
    };
  },
  computed: {
    task() {
      return this.$store.getters.taskById(this.$route.params.id);
    },
    validSave() {
      const { title, tags, description, date } = this.taskCopy;
      return !!(title.trim() && tags.length && description.trim() && date);
    },
    popupQuestion() {
      if (this.popupType === this.popupTypes.DELETE) {
        return this.label.deleteQuestion;
      }
      return this.label.completeQuestion;
    },
    popupCommitButton() {
      if (this.popupType === this.popupTypes.DELETE) {
        return this.label.deleteButton;
      }
      return this.label.completeButton;
    },
    completeButtonDisabled() {
      return this.taskCopy.status === "completed";
    },
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
    showPopup(popupType){
      this.popupType = popupType;
      this.popup = 'VPopup';
    },
    cancelChanges() {
      const { taskById } = this.$store.getters;
      const { id } = this.$route.params;
      this.taskCopy.description = taskById(id).description;
      this.taskCopy.title = taskById(id).title;
      this.taskCopy.date = taskById(id).date;
      this.taskCopy.tags = [...taskById(id).tags,];
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
  created() {
    const { taskById } = this.$store.getters;
    const { id } = this.$route.params;
    this.taskCopy = JSON.parse(JSON.stringify(taskById(id)));
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
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 45px;
  }
  &__content {
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
  &__disable {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  &__enable {
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
