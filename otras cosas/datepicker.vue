<template>
  <div class="slider">
    <button class="previous-button" @click="showPreviousDates">Previous</button>
    <div class="slider-item" v-for="date in visibleDates" :key="date" @click="showNumbers(date); selectedDate(date)" :class="{ 'selected': date === selectedDate}">{{ date }}</div>
    <button class="next-button" @click="showNextDates">Next</button>
    <div v-if="showList" class="list">
      <ul>
        <li v-for="number in numbers[selectedDate]" :key="number">{{ number }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
      visibleDates: [],
      index: 0,
      selectedDate:null,
      numbers: {
        "2023-01-01": [1, 2, 3, 4],
        "2023-01-02": [5, 6, 7, 8],
        "2023-01-03": [9, 10, 11, 12],
        "2023-01-04": [13, 14, 15, 16],
        "2023-01-05": [17, 18, 19, 20],
        "2023-01-06": [21, 22, 23, 24],
        "2023-01-07": [25, 26, 27, 28],
        "2023-01-08": [29, 30, 31, 32],
      },
      showList: false,
    }
  },
  created() {
    this.dates = [
      "2023-01-01",
      "2023-01-02",
      "2023-01-03",
      "2023-01-04",
      "2023-01-05",
      "2023-01-06",
      "2023-01-07",
      "2023-01-08",
    ];
    this.visibleDates = this.dates.slice(0, 4);
  },
  methods: {
    showPreviousDates() {
      if (this.index > 0) {
        this.index -= 1;
        this.visibleDates = this.dates.slice(this.index , this.index + 4);
      }
    },
    showNextDates() {
      if (this.index + 4 < this.dates.length) {
        this.index += 1;
        this.visibleDates = this.dates.slice(this.index , this.index + 4);
      }
    },
    showNumbers(date) {
      this.showList = true;
      this.selectedDate = date;
    },
    selectedDate(date) {
      this.selectedDate = date;
    }
  }
};
</script>

<template>
  <div class="slider">
    <button class="previous-button" @click="showPreviousDates">Previous</button>
    <div class="slider-item" v-for="date in visibleDates" :key="date" @click="showNumbers(date)" :class="{ 'selected': date === selectedDate}">{{ date }}</div>
    <button class="next-button" @click="showNextDates">Next</button>
    <div v-if="showList" class="list">
      <ul>
        <li v-for="number in numbers[selectedDate]" :key="number">{{ number }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
      visibleDates: [],
      index: 0,
      numbers: {
        "2023-01-01": [1, 2, 3, 4],
        "2023-01-02": [5, 6, 7, 8],
        "2023-01-03": [9, 10, 11, 12],
        "2023-01-04": [13, 14, 15, 16],
        "2023-01-05": [17, 18, 19, 20],
        "2023-01-06": [21, 22, 23, 24],
        "2023-01-07": [25, 26, 27, 28],
        "2023-01-08": [29, 30, 31, 32],
      },
      showList: false,
      selectedDate: ''
    }
  },
  created() {
    this.dates = [
      "2023-01-01",
      "2023-01-02",
      "2023-01-03",
      "2023-01-04",
      "2023-01-05",
      "2023-01-06",
      "2023-01-07",
      "2023-01-08",
    ];
    if (this.dates.length <= 4) {
      this.visibleDates = this.dates;
    } else {
      this.visibleDates = this.dates.slice(0, 4);
    }
  },
  methods: {
    showPreviousDates() {
      if (this.index > 0) {
        this.index -= 1;
        this.visibleDates = this.dates.slice(this.index , this.index + 4);
      }
    },
    showNextDates() {
      if (this.index + 4 < this.dates.length) {
        this.index += 1;
        this.visibleDates = this.dates.slice(this.index , this.index + 4);
      }
    },
    showNumbers(date) {
      this.showList = true;
      this.selectedDate = date;
    }
  }
};
</script>

<style>
.slider {
  display: flex;
  justify-content: center;
}

.slider-item {
  width: 100px;
  height: 100px;
  margin: 10px;
  text-align: center;
  border: 1px solid black;
  cursor: pointer;
}

button {
  margin: 10px;
}

.selected {
  background-color: lightblue;
}

.numbers {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.numbers.active {
  display: block;
}
</style>