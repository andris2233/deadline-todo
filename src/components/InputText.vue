<template>
    <div class="input-wrapper" v-bind:class="{inputActiveLine: focused}">
        <div class="input-placeholder" v-bind:class="{placeholderActive: inputText.trim().length || focused}">{{placeholder ? placeholder : 'Text'}}</div>
        <input type="text" 
            @focus="focused=true"
            @blur="focused=false"
            @input="$emit('input', $event.target.value); inputText = $event.target.value">
    </div>
</template>

<script>
export default {
    props:{
        placeholder: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            focused: false,
            inputText: ''
        }
    },
    mounted(){
        this.inputText = this.$props.text;
    }
}
</script>

<style scoped>
.input-wrapper{
    padding-top: 13px;
    position: relative;
    min-height: 40px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
}

.input-placeholder{
    z-index:-1;
    transition: .5s;
    color: #C2C2C2;
    font-size: 18px;
    position: absolute;
    left: 0%;
    top: 48%;
}

.placeholderActive{
    top: 0%;
    font-size: 12px;
    color: #328BCA;
}

.input-wrapper:before{
    content: '';
    position: absolute;
    bottom: 0%;
    height: 2px;
    background: #C2C2C2;
    width: 100%;
}

.input-wrapper:after{
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
}

.inputActiveLine:after{
    transform: translateX(0%);
}
</style>