<template>
  <div class="task-list">
    <div class="task-list__header">
      <div class="haeder__text">Список задач</div>
      <Select :options="options"
              v-model="filter"
              :selected="options[0]"
      />
    </div>
    <transition-group name="rows" 
                      tag="div" 
                      class="task-list__content"
    >
      <div class="task-row" :key="'header'">
        <div v-for="cell in headerCells"
             :key="cell.title"
             :class="{'cell__big': cell.bigSize}"
             class="cell cell__header"
        >{{cell.title}}
        </div>
      </div>

      <div class="task-row" v-for="(task, index) in tasks" :key="task.id">
        <div class="cell">{{index + 1}}</div>
        <div class="cell">
          <router-link :to="`/task/${task.id}`">{{task.title}}</router-link>
        </div>
        <div class="cell cell__big">{{task.description}}</div>
        <div class="cell">{{task.date}}</div>
        <div class="cell">{{task.status | statusFormat}}</div>
        <div class="cell">
          <TableButton :theme="'green'"
                       :disabled="task.status==='completed'"
                       @click="showPopup('COMPLETE', task.id)"
                       class="button-margin"
          >
            <i class="material-icons">done</i>
          </TableButton>
          <TableButton :theme="'red'" 
                       @click="showPopup('DELETE', task.id)"
          >
            <i class="material-icons">delete</i>
          </TableButton>
        </div>
      </div>
    </transition-group>
    <component :is="popup" @cancel="popup=''">
      <template #header>
        <div class="popup-header">{{popupQuestion}}</div>
      </template>

      <template #body>
        {{'После подтверждения отменить действие будет невозможно!'}}
      </template>

      <template #control>
        <div class="popup-btns">
          <FormButton @click="popupCommit">{{popupCommitButton}}</FormButton>
          <FormButton @click="popup=''">{{'Отмена'}}</FormButton>
        </div>
      </template>
    </component>
  </div>
</template>

<script>
import Select from "@/components/Select";
import TableButton from "@/components/TableButton";
import Popup from "@/components/Popup";
import FormButton from "@/components/FormButton";

export default {
  components: { Select, TableButton, Popup, FormButton },
  data() {
    return {
      options: [
        {
          title: "Все",
          value: "all",
        },
        {
          title: "Активные",
          value: "active",
        },
        {
          title: "Выполненные",
          value: "completed",
        },
        {
          title: "Просроченные",
          value: "expired",
        },
      ],
      headerCells: [
        {
          title: '№',
          bigSize: false,
        },
        {
          title: 'Название',
          bigSize: false,
        },
        {
          title: 'Опсиание',
          bigSize: true,
        },
        {
          title: 'Дедлайн',
          bigSize: false,
        },
        {
          title: 'Статус',
          bigSize: false,
        },
        {
          title: 'Управление',
          bigSize: false,
        },
      ],
      filter: {
        title: "Все",
        value: "all",
      },
      popup: "",
      popupType: "DELETE",
      currentId: null,
    };
  },
  computed: {
    tasks() {
      if (this.filter.value === "all") {
        return this.$store.getters.getAllTasks;
      }

      return this.$store.getters.getAllTasks.filter(
        (t) => t.status === this.filter.value
      );
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
  },
  filters: {
    statusFormat(task) {
      switch (task) {
        case "active":
          return "Активная";
        case "expired":
          return "Просроченная";
        case "completed":
          return "Выполненная";
      }
    },
  },
  methods: {
    popupCommit() {
      if (this.popupType === "DELETE") {
        this.$store.dispatch("removeTask", this.currentId);
        this.popup = "";
      } else {
        this.$store.dispatch("completeTask", this.currentId);
        this.popup = "";
      }
    },
    showPopup(type, id) {
      this.currentId = id;
      this.popupType = type;
      this.popup = "Popup";
    },
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  display: flex;
  flex-direction: column;
  width: 70vw;
  border-radius: 10px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  min-height: 50vh;
  max-height: 90vh;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #fcfcfc;
    border-bottom: 1px solid #dadada;
  }
  &__content {
    position: relative;
    padding: 0 20px 20px 20px;
    flex: 1;
  }
}

.haeder__text {
  font-size: 18px;
  font-weight: 600;
  color: #3f3f3f;
}

.task-row {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dadada;
  transition: all 0.4s;
  width: 100%;
}

.cell {
  text-align: left;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &__header{
    font-weight: 600;
  }
  &__big{
    flex: 2;
  }
}

a {
  display: inline-block;
  color: green;
  text-decoration: none;
  overflow: hidden;
  transition: 0.2s;
  position: relative;
  &:visited {
    color: green;
  }
  &:after {
    content: "";
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    background: green;
    transform: scaleX(0);
    transition: 0.2s;
  }
  &:hover:after {
    transform: scaleX(1);
  }
}

.button-margin {
  margin: 0 7px 0 0;
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

.rows-enter-active,
.rows-leave-active {
  transform-origin: top center;
}

.rows-enter,
.rows-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.rows-leave-active {
  width: 100%;
  position: absolute;
}

.rows-move {
  transition: transform 0.4s;
}
</style>
