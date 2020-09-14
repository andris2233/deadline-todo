<template>
    <form @submit.prevent>
        <div class="create-header">Создать задачу</div>
        <InputText 
            v-bind:text="title"
            v-bind:placeholder="'Название'"
            @v-model="changeTitle"
        />
        <Chips 
            v-bind:tags="tags" 
            v-bind:placeholder="'Тэги'"
            @create-tag="createTag"
            @remove-tag="removeTag"
        />
        <Datepicker 
            v-bind:placeholder="'Дедлайн'"
            @v-model="changeDeadline"
            v-bind:date="date"
        />
        <button type="submit">Создать</button>
    </form>
</template>

<script>
import Chips from '@/components/Chips';
import InputText from '@/components/InputText';
import Datepicker from '@/components/Datepicker';
export default {
    data () {
        return {
            title: '',
            tags: [],
            date: null
        }
    },
    components: { Chips, InputText, Datepicker },
    methods: {
        createTag(tag) {
            this.tags.push(tag);
        },
        removeTag(id) {
            this.tags = this.tags.filter(tag => tag.id !== id);
        },
        changeTitle(title){
            this.title = title;
        },
        changeDeadline(date){
            this.date = date;
        }
    }
}
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 750px;
    border-radius: 10px;
    box-shadow: 0 0 10px #dadada;
    padding: 45px;
    box-sizing: border-box;
    border: 10px solid #328BCA;
}

.create-header{
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
}

button{
    border: 0;
    background: #328BCA;
    padding: 10px;
    border-radius: 20px;
    transition: all ease .3s;
    color: white;
    width: 90px;
    outline: none;
}

button:hover{
    transform: scale(1.1);
    background: white;
    box-shadow: 0 0 7px #328BCA;
    color: #328BCA;
}

button:active{
    transform: scale(1);
}

</style>