<template>
  <div class="time-picker">
    <!-- <label for="year">
      <div id="year" class="year-picker" @click="pickYear">
        <input type="text" placeholder="选择年">
      </div>
    </label>
    <label for="month">
      <div id="month" class="month-picker">
        <input type="text" placeholder="选择月">
      </div>
    </label>
    <label for="date">
      <div id="date" class="date-picker">
        <input type="text" placeholder="选择日期">
      </div>
    </label> -->
    <label for="date">
      选择日期：
      <div id="date" class="date-picker">
        <input type="text" :value="getCurrentDate" placeholder="选择日期">
      </div>
    </label>
    <div class="time-box">
      <div class="time-box-head">
        <div class="time-title">
          <button @click="prevYear">《</button>
          <button @click="prevMonth">&lt;</button>
          <span class="year-title">{{year}}年</span>
          <span class="month-title">{{month}}月</span>
          <button @click="nextMonth">&gt;</button>
          <button @click="nextYear">》</button>
        </div>
      </div>
      <div class="time-box-body">
        <table cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <th v-for="item in week" :key="item">{{item}}</th>
            </tr>
            <tr v-for="(item, index) in weekArr" :key="index">
              <td v-for="(day, index) in item" :key="index" @click="changeDate(day)">
                <span class="date-cell" :class="{'curr-month': day.month == month - 1, 'active': day.date == date}">{{day.date}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTimePicker',
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      date: 0,
      month: 0,
      year: 0,
      weekArr: []
    }
  },
  methods: {
    pickYear() {

    },
    getDaysAMonth(year, month) {
      month ++;
      if([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
        return 31;
      }
      if([4, 6, 9, 11].indexOf(month) > -1) {
        return 30;
      }
      if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return 28;
      } else {
        return 29;
      }
    },
    genDateArr(year, month) {
      let daysArr = [],
          weekArr = [],
          daysCurrentMonth = this.getDaysAMonth(year, month),
          daysPrevMonth = this.getDaysAMonth(year, month - 1),
          prevMonth = month - 1,
          nextMonth = month + 1,
          firstDay = new Date(year, month, 1).getDay();
      
      for(let i = 1; i <= daysCurrentMonth; i ++) {
        let temp = {};
        temp.date = i;
        temp.month = month;
        daysArr.push(temp);
      }
      for(let i = 0; i < firstDay; i ++) {
        let temp = {};
        temp.date = daysPrevMonth - i;
        temp.month = prevMonth;
        daysArr.unshift(temp);
      }
      for(let i = 1, index = 42 - daysArr.length; i <= index; i ++) {
        let temp = {};
        temp.date = i;
        temp.month = nextMonth;
        daysArr.push(temp);
      }
      while(daysArr.length > 0) {
        weekArr.push(daysArr.splice(0, 7))
      }
      return weekArr;
    },
    prevMonth() {
      if(this.month > 1) {
        this.month --;
      } else {
        this.year --;
        this.month = 12;
      }
    },
    nextMonth() {
      if(this.month < 12) {
        this.month ++;
      } else {
        this.month = 1;
        this.year ++;
      }
    },
    prevYear() {
      this.year --;
    },
    nextYear() {
      this.year ++;
    },
    changeDate(day) {
      this.month = day.month + 1;
      this.date = day.date;
    }
  },
  computed: {
    getCurrentDate() {
      return this.year + '-' + this.month + '-' + this.date;
    }
  },
  mounted() {
    let time = new Date(),
        year = time.getFullYear(),
        month = time.getMonth(),
        date = time.getDate(),
        day = time.getDay(),
        monthStart = new Date(year, month, 1),
        daysArr = [],
        index = this.getDaysAMonth(year, month);
    this.year = year;
    this.month = month + 1;
    this.date = date;
    this.weekArr = this.genDateArr(year, month);
  },
  watch: {
    year(newVal, oldVal) {
      if(newVal == oldVal) return;
      this.weekArr = this.genDateArr(this.year, this.month - 1);
    },
    month(newVal, oldVal) {
      if(newVal == oldVal) return;
      this.weekArr = this.genDateArr(this.year, this.month - 1);
    }
  }
}
</script>

<style scoped>
td {
  width: 40px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.date-cell {
  color: #c0c4cc;
  width: 24px;
  height: 24px;
  display: inline-block;
  text-align: center;
  line-height: 24px;
}
.date-cell.curr-month.active {
  background-color: bisque;
  color: #fff;
  border-radius: 50%;
}
.date-cell.curr-month {
  color: #424242;
}
</style>
