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
      <div id="date" class="date-picker" @click.stop="showDatePicker">
        <label for="date">
        选择日期：
          <input type="text" :value="getCurrentDate" placeholder="选择日期">
        </label>
      </div>
    <div class="time-box" :class="{'show-date-picker': datePickerVisible}">
      <div class="time-box-head">
        <div class="time-title">
          <span @click="prevYear" class="prev-year btn">&lt;&lt;</span>
          <span @click="prevMonth" class="prev-month btn">&lt;</span>
          <span class="year-title click-pick" @click="pickYear">{{year}}年</span>
          <span class="month-title click-pick" @click="pickMonth">{{month}}月</span>
          <span @click="nextYear" class="next-year btn">&gt;&gt;</span>
          <span @click="nextMonth" class="next-month btn">&gt;</span>
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
      weekArr: [],
      datePickerVisible: false,
    }
  },
  methods: {
    pickYear() {

    },
    pickMonth() {

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
    },
    showDatePicker() {
      this.datePickerVisible = true;
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
    document.body.addEventListener('click', function() {
      console.log('click body')
    })
  },
  watch: {
    year(newVal, oldVal) {
      if(newVal == oldVal) return;
      this.weekArr = this.genDateArr(this.year, this.month - 1);
    },
    month(newVal, oldVal) {
      if(newVal == oldVal) return;
      this.weekArr = this.genDateArr(this.year, this.month - 1);
    },
    datePickerVisible(newVal, oldVal) {

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
.time-box-body table td:hover span {
  color: royalblue;
}
.date-cell.curr-month.active {
  background-color: bisque;
  color: #fff;
  border-radius: 50%;
}
.date-cell.curr-month {
  color: #424242;
}
.click-pick {
  font-size: 16px;
  margin-left: 5px;
  cursor: pointer;
}
.click-pick:hover {
  color: royalblue;
}
.time-box {
  border-radius: 3px;
  border: 1px solid #424242;
  width: 38vw;
  min-width: 300px;
  max-height: 0;
  transition: max-height .3s ease-in;
  visibility: hidden;
  overflow: hidden;
  user-select: none;
}
.time-box.show-date-picker {
  /* height: auto; */
  max-height: 500px;
  visibility: visible;
}
.time-box-body {
  margin: 0 12px;
}
.time-box-body table {
  /* margin: 0 auto; */
}
.time-box-head {
  margin: 15px 12px;
}
.time-title {
  text-align: center;
}
.time-title span {
  display: inline-block;
}
.time-title .btn {
  padding: 0 5px;
  cursor: pointer;
  position: relative;
}
.time-title .prev-year,
.time-title .prev-month {
  float: left;
}
.time-title .next-month,
.time-title .next-year {
  float: right;
}
</style>
