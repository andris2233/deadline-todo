<template>
  <div @click="onFocus"
       @keyup.tab="onFocus"
       v-click-outside="hideDatepicker"
       v-window-resize="checkCalendarPosition"
       ref="wrapper"
       class="datepicker"
       tabindex="0">
    <div :class="{'datepicker-placeholder__active': value || showDatepicker, 'datepicker-placeholder__error': isEmptyError}"
           class="datepicker-placeholder"
    >
      <div v-if="required && !disabled"
           class="datepicker-placeholder__required">
        *
      </div>
      <div class="datepicker-placeholder__text">
        {{placeholder}}
      </div>
    </div>
    <div :class="{'datepicker-input__active': showDatepicker, 'datepicker-input__error': isEmptyError}"
         type="text"
         class="datepicker-input"
    >
      <div class="datepicker-text">{{value | formatDate}}</div>
      <i v-if="!disabled"
         :class="{'datepicker-clear__active': value}"
         @click.stop="clearDate"
         class="material-icons datepicker-clear"
      >
        clear
      </i>
    </div>
    <div :class="calendarClasses"
         @click.stop
          class="datepicker-container"
    >
      <div class="container-row">
        <div class="container-row__btns">
          <button @click.stop="onChangeYear(-1)"
                  class="container-row__btn"
                  type="button"
          >
            <i class="material-icons">
              first_page
            </i>
          </button>
          <button @click.stop="onChangeMonth(-1)"
                  class="container-row__btn"
                  type="button"
          >
            <i class="material-icons">
              keyboard_arrow_left
            </i>
          </button>
        </div>
        
        <div class="container-row__date-column">
          <span class="date-column__year">{{year}}</span>
          <span class="date-column__month">{{month}}</span>
        </div>

        <div class="container-row__btns">
          <button @click.stop="onChangeMonth(1)"
                  class="container-row__btn"
                  type="button"
          >
            <i class="material-icons">
              keyboard_arrow_right
            </i>
          </button>
          <button @click.stop="onChangeYear(1)"
                  class="container-row__btn"
                  type="button"
          >
            <i class="material-icons">
              last_page
            </i>
          </button>
        </div>
      </div>

      <div class="container-days">
        <div class="container-days__row container-days__header">
          <div v-for="day of dayNames"
               :key="day"
               class="container-days__cell"
          >{{day}}</div>
        </div>
        <div v-for="(week, indexW) of days"
             :key="indexW"
             class="container-days__row">
          <div v-for="day of week"
               :key="day.id"
               :class="checkedDayClass(day.value, day.disabled)"
               @click.stop="saveDate(day, indexW)"
               class="container-days__cell"
          >{{day.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Date, String],
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Date',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const date = new Date();
    const currentDate = new Date();
    date.setDate(1);
    return {
      top: false,
      showDatepicker: false,
      currentDate,
      searchedDate: date.getTime(),
      updated: false,
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      dayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      isEmptyError: false,
    }
  },
  computed: {
    calendarClasses(){
      const classes = [];
      if (this.showDatepicker){
        classes.push('datepicker-container__active');
      }
      if(this.top){
        classes.push('datepicker-container__top');
      } else {
        classes.push('datepicker-container__bottom');
      }
      return classes;
    },
    year() {
      const date = new Date(this.searchedDate);
      return date.getFullYear();
    },
    month() {
      const date = new Date(this.searchedDate);
      return this.months[date.getMonth()];
    },
    days() {
      const date = new Date(this.searchedDate);
      const firstDay = date.getDay() ? date.getDay() : 7;
      const currentMonth = date.getMonth();
      const calendar = [];
      let week = [];
      const lastMonth = new Date(date.getTime());
      lastMonth.setDate(0);
      const id = Date.now();
      for(let i = firstDay; i > 1; i--){
        week.unshift({
          value: lastMonth.getDate(),
          disabled: true,
          id: id - lastMonth.getDate()
        });
        lastMonth.setDate(lastMonth.getDate() - 1);
      }

      while(date.getMonth() === currentMonth){
        while(week.length < 7){
          const day = date.getDate();
          const disabled = date.getMonth() !== currentMonth;
          week.push({
            value: day,
            disabled,
            id: disabled ? id - day : id + day
          });
          date.setDate(day + 1);
        }
        calendar.push(week);
        week = [];
      }

      while(calendar.length < 6){
        while(week.length < 7){
          const day = date.getDate();
          week.push({
            value: day,
            disabled: true,
            id: id - day
          });
          date.setDate(day + 1);
        }
        calendar.push(week);
        week = [];
      }
      return calendar;
    }
  },
  filters: {
    formatDate(value){
      if(!value){
        return '';
      }
      let date;
      if(value instanceof Date){
        date = value;
      } else {
        date = new Date(value);
      }
      const zero = (value) => value < 10 ? `0${value}` : value;
      let day = zero(date.getDate());
      let month = zero(date.getMonth() + 1);
      return `${day}.${month}.${date.getFullYear()}`;
    },
  },
  methods: {
    checkCalendarPosition(){
      this.top = !!(window.innerHeight - this.$refs.wrapper.getBoundingClientRect().bottom < 321);
    },
    clearDate(){
      this.$emit('input', null);
      // this.isEmptyError = this.required;
      this.showDatepicker = false;
    },
    onFocus() {
      if(this.disabled){
        return;
      }
      this.checkCalendarPosition();
      if(this.value){
        let date;
        if(this.value instanceof Date){
          date = new Date(this.value.getTime());
        } else {
          date = new Date(this.value);
        }
        date.setDate(1);
        this.searchedDate = date.getTime();
      }
      this.showDatepicker = true;
      this.updated = false;
    },
    checkedDayClass(day, disabled){
      const classes = [];
      if (disabled) {
        classes.push('container-days__cell-disabled');
        classes.push('container-days__cell-interactive');
        return classes;
      }
      
      const date = new Date(this.searchedDate);
      date.setDate(day);
      let value = this.value;
      if(!(this.value instanceof Date)){
        value = new Date(this.value);
      }
      if (value && value.getTime() === date.getTime()) {
        classes.push('container-days__cell-active');
        return classes;
      } else if (date.getTime() === this.currentDate.getTime()) {
        classes.push('container-days__cell-current');
      }
      classes.push('container-days__cell-interactive');
      return classes;
    },
    hideDatepicker() {
      if (this.showDatepicker) {
        this.isEmptyError = !(this.value && this.required);
        this.showDatepicker = false;
      }
      let date;
      if (!this.value) {
        date = new Date();
        date.setDate(1);
        this.searchedDate = date.getTime();
      } else if (!this.updated) {
        const date = new Date(this.value);
        date.setDate(1);
        this.searchedDate = date.getTime();
      }
    },
    onChangeYear(direction){
      const date = new Date(this.searchedDate);
      date.setYear(date.getFullYear() + direction);
      this.searchedDate = date.getTime();
    },
    onChangeMonth(direction){
      const date = new Date(this.searchedDate);
      date.setMonth(date.getMonth() + direction);
      this.searchedDate = date.getTime();
    },
    saveDate(day, weekNumber){
      const date = new Date(this.searchedDate);
      if(day.disabled){
        if(weekNumber === 0){
          date.setMonth(date.getMonth() - 1);
        } else {
          date.setMonth(date.getMonth() + 1);
        }
      }
      this.updated = true;
      date.setDate(day.value);
      this.$emit('input', date);
      this.hideDatepicker();
      this.isEmptyError = false;
    }
  },
  watch: {
    value() {
      if (this.required) {
        this.isEmptyError = !this.value;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$blue-color: #328bca;
$gray-color: #c2c2c2;

.datepicker{
  position: relative;
  height: 53px;
  outline: none;
  &-input{
    cursor: text;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px 0;
    box-sizing: border-box;
    overflow: hidden;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:before {
      content: "";
      position: absolute;
      bottom: 1px;
      left: 0;
      background: $gray-color;
      width: 100%;
      height: 1px;
      border-radius: 5px;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background: $blue-color;
      transition: 0.3s;
      width: 100%;
      transform: translateX(-100%);
      height: 2px;
      border-radius: 5px;
    }
    &__active:after {
      transform: translateX(0%);
    }
    &__error:after {
      transform: translateX(0%);
      background: red;
    }
  }
  &-placeholder{
    position: absolute;
    transition: 0.5s;
    color: $gray-color;
    font-size: 15px;
    bottom: 10px;
    left: 0;
    display: flex;
    align-items: center;
    cursor: text;
    &__active{
      bottom: 35px;
      font-size: 12px;
      color: $blue-color;
    }
    &__error{
      color: red;
    }
    &__required{
      color: red;
      margin-right: 3px;
    }
  }
  &-container{
    position: absolute;
    min-width: 260px;
    min-height: 200px;
    box-sizing: border-box;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .3);
    background: #fff;
    z-index: 10;
    transform: scale(0);
    transition: .3s;
    transform: scale(0);
    opacity: 0;
    &__active{
      opacity: 1;
      transform: scale(1);
    }
    &__bottom{
      top: 55px;
      left: 0;
      transform-origin: top left;
    }
    &__top{
      top: -321px;
      left: 0;
      transform-origin: bottom left;
    }
  }
  &-clear{
    opacity: 0;
    transition: all 0.3s;
    color: #838383;
    cursor: pointer;
    &__active{
      opacity: 1;
      &:hover{
        color: #000000;
      }
    }
  }
}

.container-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  &__btns{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70px;
  }
  &__btn{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    box-sizing: border-box;
    background: #ebebeb;
    color: rgb(121, 121, 121);
    transition: .3s;
    border: none;
    outline: none;
    transform: scale(.8);
    padding: 0;
    cursor: pointer;
    &:hover{
      color: #000;
      background: #dadada;
    }
  }
  &__date-column{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .date-column__year{
      font-size: 25px;
      color: rgb(85, 85, 85);
    }
    .date-column__month{
      font-size: 11px;
      color: #7a7a7a;
    }
  }
}

.container-days{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  &__header{
    font-weight: 700;
  }
  &__row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__cell{
    font-size: 10px;
    padding: 5px 0;
    flex: 1;
    height: 20px;
    width: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    transition: .2s;
    outline: none;
    &-disabled{
      color: #8a8a8a;
    }
    &-interactive{
      border-radius: 50%;
      transition: .2s;
      outline: none;
      cursor: pointer;
      &:hover{
        background: #dadada;
      }
    }
    &-active{
      cursor: pointer;
      background: $blue-color;
      color: #fff;
    }
    &-current {
      box-shadow: inset 0 0 2px 1px $blue-color;
    }
  }
}
</style>
