<template>
  <div>
    <p style="margin-bottom: 10px">当前和为:{{ num }}</p>
    <el-select v-model="value" style="width: 70px">
      <el-option
        v-for="(item, index) in nums"
        :key="index"
        :value="item"
      ></el-option>
    </el-select>
    <el-button style="margin-left: 10px" @click="increment()">+</el-button>
    <el-button @click="decrement()">-</el-button>
    <el-button @click="addOdd()">当前和为奇数时再加</el-button>
    <el-button @click="addWait()">等一等再加</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nums: [1, 2, 3],
      num: 0,
      value: 1,
    };
  },
  methods: {
    increment() {
      this.num += this.value;
    },
    decrement() {
      if (this.num <= 0) {
        this.num = 0;
      } else {
        this.num -= this.value;
        if (this.num <= 0) {
          this.num = 0;
        }
      }
    },
    addOdd() {
      if (this.num % 2) {
        this.num += this.value;
      }
    },
    addWait() {
      setInterval(() => {
        this.num += this.value;
      }, 500);
    },
  },
};
</script>

<style>
</style>