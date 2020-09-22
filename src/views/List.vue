<template>
  <div class="task-list">
    <div class="task-list__header">
      <div class="haeder__text">Список задач</div>
      <Select :options="options" v-model="filter" :selected="options[0]" />
    </div>
    <transition-group name="rows" tag="div" class="task-list__content">
      <div class="task-row" :key="'header'">
        <div class="cell normal-cell cell-header">№</div>
        <div class="cell normal-cell cell-header">Название</div>
        <div class="cell big-cell cell-header">Описание</div>
        <div class="cell normal-cell cell-header">Дедлайн</div>
        <div class="cell normal-cell cell-header">Статус</div>
        <div class="cell normal-cell cell-header">Управление</div>
      </div>
      <div class="task-row" v-for="(task, index) in tasks" :key="task.id">
        <div class="cell normal-cell">{{index + 1}}</div>
        <div class="cell normal-cell">
          <router-link :to="'/task/' + task.id">{{task.title}}</router-link>
        </div>
        <div class="cell big-cell">{{task.description}}</div>
        <div class="cell normal-cell">{{task.date}}</div>
        <div class="cell normal-cell">{{task.status | statusFormat}}</div>
        <div class="cell normal-cell">
          <TableButton
            :theme="'green'"
            class="button-margin"
            @click="$store.dispatch('completeTask', task.id)"
          >
            <i class="material-icons">done</i>
          </TableButton>
          <TableButton :theme="'red'" @click="$store.dispatch('removeTask', task.id)">
            <i class="material-icons">delete</i>
          </TableButton>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Select from "@/components/Select";
import TableButton from "@/components/TableButton";
export default {
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
      filter: {
        title: "Все",
        value: "all",
      },
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
  components: { Select, TableButton },
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
}

.task-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fcfcfc;
  border-bottom: 1px solid #dadada;
}

.haeder__text {
  font-size: 18px;
  font-weight: 600;
  color: #3f3f3f;
}

.task-list__content {
  position: relative;
  padding: 0 20px 20px 20px;
  flex: 1;
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
}

.cell-header {
  font-weight: 600;
}

.normal-cell {
  flex: 1;
}

.big-cell {
  flex: 2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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