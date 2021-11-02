<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model.trim="query"
          @keyup.enter="torResult(query)"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      query: "",
    };
  },
  created() {},
  methods: {
    torResult(keywords) {
      // console.log(id)
      if (keywords === "") {
        this.$message({
          message: "请输入搜索值！",
          type: "warning",
        });
        return;
      }
      // 异步获取歌曲列表
      this.$axios({
        url: "/search",
        params: {
          keywords: this.query,
          limit: 30,
          type: 1,
        },
      }).then((res) => {
        // 跳转之前触发全局总线里面的事件
        console.log(res)
        console.log(this);
        this.$bus.$emit("getSong", res.data.result);
      });
      // 异步获取歌单列表
      this.$axios({
        url: "/search",
        params: {
          keywords: this.query,
          limit: 30,
          type: 1000,
        },
      }).then((res) => {
        // 跳转之前触发全局总线里面的事件
        console.log(res)
        console.log(this);
        this.$bus.$emit("getLists", res.data.result);
      });
      // 异步获取MV列表
      this.$axios({
        url: "/search",
        params: {
          keywords: this.query,
          limit: 30,
          type: 1004,
        },
      }).then((res) => {
        // 跳转之前触发全局总线里面的事件
        console.log(res)
        console.log(this);
        this.$bus.$emit("getMvs", res.data.result);
        this.$router.push(`/result?q=${this.query}`);
      });
    },
  },
};
</script>

<style scoped></style>
