<template>
  <div class="task-list">
    <VFormHeader class="task-list__header">
      <div class="haeder__text">Список задач</div>
      <div class="task-list__header-search">
        <VSearchBar v-model="searchText"
                    :placeholder="'Поиск'"
                    style="margin-right: 5px"/>
        <VSelect v-model="filter"
                :options="options"
                icon/>
      </div>
    </VFormHeader>
    <transition-group name="rows" 
                      tag="div" 
                      class="task-list__content"
    >
      <div class="task-row task-row__header" :key="'header'">
        <div v-for="cell in headerCells"
             :key="cell.title"
             :class="{'cell__big': cell.bigSize}"
             class="cell cell__header"
        >
          {{cell.title}}
          <VSortArrow v-if="cell.sort"
                      :top="cell.sort.forward"
                      :active="cell.sort.name===currentSort"
                      @click.native="sort(cell.sort.name)"
                      class="arrow-margin"
          />
        </div>
      </div>
      <div v-for="(task, index) in tasks"
           :key="task.id"
           :style="(index === tasks.length - 1) ? 'border: 0' : ''"
           class="task-row"
      >
        <div class="cell">{{index + 1}}</div>
        <div class="cell">
          <VLink :to="`/list/task/${task.id}`">{{task.title}}</VLink>
        </div>
        <div class="cell cell__big">{{task.description}}</div>
        <div class="cell">{{task.date | formatDate}}</div>
        <div :class="task.status | statusClass" class="cell">{{task.status | statusFormat}}</div>
        <div class="cell">
          <VTableButton :theme="'green'"
                        :disabled="task.status==='completed'"
                        @click="showPopup('COMPLETE', task.id)"
                        class="button-margin"
          >
            <i class="material-icons">done</i>
          </VTableButton>
          <VTableButton :theme="'red'" 
                        @click="showPopup('DELETE', task.id)"
          >
            <i class="material-icons">delete</i>
          </VTableButton>
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
          <VFormButton @click="popupCommit">{{popupCommitButton}}</VFormButton>
          <VFormButton @click="popup=''">{{'Отмена'}}</VFormButton>
        </div>
      </template>
    </component>
    
    <VFormFooter />
  </div>
</template>

<script>
import VSelect from "@/components/VSelect";
import VSearchBar from "@/components/VSearchBar";
import VTableButton from "@/components/VTableButton";
import VPopup from "@/components/VPopup";
import VFormButton from "@/components/VFormButton";
import VFormFooter from "@/components/VFormFooter";
import VFormHeader from "@/components/VFormHeader";
import VLink from "@/components/VLink";
import VSortArrow from "@/components/VSortArrow";

export default {
  components: {
    VSelect,
    VTableButton,
    VPopup,
    VFormButton,
    VFormFooter,
    VFormHeader,
    VSearchBar,
    VLink,
    VSortArrow,
  },
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
          sort: {
            name: 'title',
            forward: true,
          },
        },
        {
          title: 'Опсиание',
          bigSize: true,
        },
        {
          title: 'Дедлайн',
          bigSize: false,
          sort: {
            name: 'date',
            forward: true,
          },
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
        title: 'Все',
        value: 'all',
      },
      currentSort: '',
      popup: '',
      popupType: 'DELETE',
      currentId: null,
      searchText: '',
    };
  },
  computed: {
    tasks() {
      const { currentSort, tasksSearch, headerCells } = this;
      if (!currentSort) {
        return tasksSearch;
      }
      const idx = headerCells.findIndex(head => head.sort && head.sort.name === currentSort);
      return tasksSearch.sort(function(a, b) {
        if (a[currentSort] < b[currentSort]) {
          return headerCells[idx].sort.forward ? 1 : -1;
        } else {
          return headerCells[idx].sort.forward ? -1 : 1;
        }
      });
    },
    tasksSearch() {
      const { searchText, tasksFilter } = this;
      return tasksFilter.filter(t => t.title.includes(searchText) || t.tags.some(tag => tag.name.includes(searchText)));
    },
    tasksFilter() {
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
    statusFormat(status) {
      switch (status) {
        case 'active':
          return 'Активная';
        case 'expired':
          return 'Просроченная';
        case 'completed':
          return 'Выполненная';
      }
    },
    statusClass(status){
      return `cell__${status}`;
    },
    formatDate(value){
      if(!value){
        return '';
      }
      const date = value instanceof Date ? value : new Date(value);
      const zero = (value) => value < 10 ? `0${value}` : value;
      let day = zero(date.getDate());
      let month = zero(date.getMonth() + 1);
      return `${day}.${month}.${date.getFullYear()}`;
    }
  },
  methods: {
    sort(type) {
      if (this.currentSort === type) {
        const idx = this.headerCells.findIndex(head => head.sort && head.sort.name === type);
        this.headerCells[idx].sort.forward = !this.headerCells[idx].sort.forward;
      } else if (this.currentSort) {
        const idx = this.headerCells.findIndex(head => head.sort && head.sort.name === this.currentSort);
        this.headerCells[idx].sort.forward = true;
        this.currentSort = type;
      } else {
        this.currentSort = type;
      }
    },
    changeSort(type) {
      const idx = this.headerCells.findIndex(head => head.sort && head.sort.name === type);
      this.headerCells[idx].sort.forward = true;
    },
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
      this.popup = "VPopup";
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
    &-search{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  &__content {
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 0 20px;
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
  &__header{
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 2;
  }
}

.cell {
  text-align: left;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  &__header {
    font-weight: 600;
  }
  &__big {
    flex: 2;
  }
  &__active {
    color: orange;
  }
  &__expired {
    color: brown;
  }
  &__completed {
    color: green;
  }
}

.arrow-margin {
  margin-left: 5px;
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

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #d4d4d4;
  box-shadow: inset 0 -3px 5px rgba(0, 0, 0, .2),
              inset 0 3px 5px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c4c4c4;
  transition: .2s;
  border-radius: 10px;
}
</style>
