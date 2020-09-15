<template>
    <div class="select">
        <div class="selected-prop" @click="active=!active">
            <span>{{selected}}</span>
            <i class="material-icons arrow" :class="{activeArrow: active}">
                expand_more
            </i>
        </div>
        <div class="select-options" :class="{optionsActive: active}">
            <div class="option" v-for="o in options" :key="o.value" @click="selectOption(o)">
                {{o.title}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            active: false,
            selected: ''
        }
    },
    methods: {
        selectOption(option){
            this.selected = option.title;
            this.active = false;
        }
    },
    mounted() {
        if(this.$props.options.length){
            this.selected = this.$props.options[0].title;
        }
    }
}
</script>

<style scoped>
.select{
    position: relative;
    padding: 5px;
    width: 200px;
    box-sizing: border-box;
    /* border: 1px solid black; */
    background: #ccc;
    z-index: 2;
    cursor: pointer;
    box-sizing: border-box;
}

.selected-prop{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.arrow{
    transition: transform ease .2s;
}

.activeArrow{
    transform: rotate(180deg);
}

.select-options{
    position: absolute;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    opacity: 0;
    transition: all ease .2s;
    top: 0;
    z-index: -1;
    transform: scaleY(0);

}

.optionsActive{
    top: 35px;
    opacity: 1;
    z-index: 2;
    transform: scaleY(1);
}

.option{
    cursor: pointer;
    padding: 5px 0;
    border-bottom: 1px solid #dadada;
    transition: all ease .2s;
}

.option:hover{
    background: #328BCA;
    color: white;
}
</style>