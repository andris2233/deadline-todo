<template>
    <div class="datepicker-wrapper" v-bind:class="{datepickerActiveLine: focused}">
        <div class="datepicker-placeholder" v-bind:class="{datepickerPlaceholderActive: dateInput || focused}">{{placeholder ? placeholder : 'Дата'}}</div>
        <input type="date" 
            v-model="dateInput" 
            @change="$emit('v-model', new Date(dateInput))"
            @focus="focused=true"
            @blur="focused=false"
            v-bind:class="{invisible: !dateInput && !focused}"
        >
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false
        }
    },
    data(){
        return {
            dateInput: null,
            focused: false
        }
    },
    mounted(){
        if(this.$props.date && new Date(this.$props.date) != 'Invalid Date'){
            this.dateInput = new Date(this.$props.date);
        }
    },

}
</script>

<style scoped>
.datepicker-wrapper{
    padding-top: 13px;
    position: relative;
    min-height: 40px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
}

.datepicker-placeholder{
    z-index:-1;
    transition: .5s;
    color: #C2C2C2;
    font-size: 18px;
    position: absolute;
    left: 0%;
    top: 48%;
}

.datepickerPlaceholderActive{
    top: 0%;
    font-size: 12px;
    color: #328BCA;
}

.datepicker-wrapper:before{
    content: '';
    position: absolute;
    bottom: 0%;
    height: 2px;
    background: #C2C2C2;
    width: 100%;
}

.datepicker-wrapper:after{
    transition: all ease .3s;
    content: '';
    position: absolute;
    bottom: 0%;
    transform: translateX(-100%);
    height: 2px;
    background: #328BCA;
    width: 100%;
}

input{
    position: absolute;
    height: 70%;
    width: 100%;
    bottom: 0;
    background: none;
    outline: none;
    border: 0;
    transition: opacity ease .5s;
}

.invisible{
    opacity: 0;
}

.datepickerActiveLine:after{
    transform: translateX(0%);
}
</style>