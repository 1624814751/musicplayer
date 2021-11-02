<template>
  <div>
    <!-- 图标列表 -->
    <div class="banner-box">
      <transition-group name="move" tag="ul">
        <li
          class="box"
          v-for="(item, index) in 2"
          :key="item"
          v-show="count == index"
        >
          {{ item }}
        </li>
      </transition-group>
      <button class="left" @click="count <= 0 ? (count = 0) : count--">
        prev
      </button>
      <button class="right" @click="count >= 1 ? (count = 0) : count++">
        next
      </button>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul {
  position: relative;
  height: 200px;
  width: 795px;
  overflow: hidden;
  /* font-size: 0; */
}

.box {
  position: absolute;
  width: 795px;
  height: 200px;
  background-color: red;
  text-align: center;
  line-height: 200px;
  font-size: 30px;
}
/* 从左往右轮播 */
/* 元素进入的第一帧  离开之后动画的终止状态*/

.move-enter {
  transform: translateX(100%);
  /* 从上往下轮播 */
  /* transform: translateY(100%); */
}
/* 元素进入过程中   元素离开的过程中*/

.move-enter-active,
.move-leave-active {
  transition: all 1s linear;
}
/* 元素进入的最后一帧  元素离开的第一帧 */

.move-enter-to,
.move-leave {
  transform: translateX(0);
}

.move-leave-to {
  /* 平移 */
  transform: translateX(-100%);
  /* transform: translateY(-100%); */
}

</style>

<script>
export default {
  name: "diantai",
  data() {
    return {
      banner: [],
      count: 0,
    };
  },
  created() {
    this.DianTai();
    this.GeXing();
  },
  methods: {
    //电台轮播
    async DianTai() {
      const result = await this.$axios({
        // method:'post',
        url: "/dj/banner",
        params: {},
      });
      console.log(result);
      this.banner = result.data.data;
    },
    //电台个性推荐
    async GeXing() {
      const result = await this.$axios({
        // method:'post',
        url: "/dj/personalize/recommend",
        params: {},
      });
      console.log(result);
    },
  },
};
</script>
