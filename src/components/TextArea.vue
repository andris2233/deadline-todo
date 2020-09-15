<template>
    <div class="textarea-wrapper" v-bind:class="{wrapperActive: focused}">
        <div class="textarea__placeholder" 
            v-bind:class="{textarea__placeholderActive: focused || description.trim().length}">
                {{placeholder ? placeholder : 'Description'}}
            </div>
        <textarea class="textarea" 
            @focus="focused=true"
            @blur="focused=false"
            @input="$emit('input', $event.target.value); description = $event.target.value;"
        >
        </textarea>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        }
    },
    data(){
        return {
            description: '',
            focused: false
        }
    },
    mounted(){
        if(this.$props.text.trim()){
            this.description = this.$props.text;
        }
    }
}
</script>

<style scoped>
.textarea-wrapper{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    padding: 20px 10px 10px 10px;
    height: 130px;
    width: 100%;
    border-radius: 15px;
    border: 2px solid #C2C2C2;
    transition: all ease .5s;
    overflow: hidden;
    margin-bottom: 15px;
}

.textarea__placeholder{
    z-index:-1;
    transition: .5s;
    color: #C2C2C2;
    font-size: 18px;
    position: absolute;
    left: 10px;
    top: 100px;
}

.textarea__placeholderActive{
    top: 5px;
    font-size: 12px;
    color: #328BCA;
    z-index:1;
}

.textarea{
    resize: none;
    flex: 1;
    border: 0;
    margin: 0;
    padding: 0;
    background: none;
    outline: none;
}

.wrapperActive{
    background: white;
    border: 2px solid #328BCA;
}
</style>