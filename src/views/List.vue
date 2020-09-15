<template>
    <div class="task-list">
        <div class="task-list__header">
            <div class="haeder__text">Список задач</div>
            <select v-model="filter">
                <option value="all">Все</option>
                <option value="active">Активные</option>
                <option value="expired">Просроченные</option>
                <option value="completed">Выполненные</option>
            </select>
            <Select :options="options" />
        </div>
        <div style="height: 30px" v-for="task in tasks" :key=task.id>
            {{task.title}}
        </div>
        
    </div>
</template>

<script>
import Select from '@/components/Select';
export default {
    data(){
        return {
            filter: 'all',
            options: [
                {
                    title: 'Все',
                    value: 'all'
                },
                {
                    title: 'Просроченные',
                    value: 'expired'
                }
            ]
        }
    },
    computed: {
        tasks(){
            if(this.filter === 'all'){
                return this.$store.getters.getAllTasks;
            }
            
            return this.$store.getters.getAllTasks.filter(t => t.status === this.filter);
        }
    },
    components:{ Select }
}
</script>

<style scoped>
.task-list{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 750px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 10px solid #328BCA;
}

.task-list__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>