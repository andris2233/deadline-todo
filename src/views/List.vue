<template>
  <div class="task-list">
    <div class="task-list__header">
      <div class="haeder__text">Список задач</div>
      <Select :options="options" v-model="filter" :selected="options[0]" />
    </div>
    <div style="height: 30px" v-for="task in tasks" :key="task.id">{{task.title}}</div>
  </div>
</template>

<script>
import Select from "@/components/Select";
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
  components: { Select },
};
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 750px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 10px solid #328bca;
}

.task-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
</style>