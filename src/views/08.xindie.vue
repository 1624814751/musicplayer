<template>
  <div class="playlists-container">
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <h2>全部新碟</h2>
      <!-- tab标签 -->
      <div class="mvs-container">
        <div class="filter-wrap" style="margin: 10px">
          <div class="seciton-wrap">
            <div class="order-wrap">
              <ul class="tabs-wrap">
                <li class="tab">
                  <span class="title" :class="{active:area=='ALL'}" @click="area='ALL'">全部</span>
                  <span class="title" :class="{active:area=='ZH'}" @click="area='ZH'">华语</span>
                  <span class="title" :class="{active:area=='EA'}" @click="area='EA'">欧美</span>
                  <span class="title" :class="{active:area=='KR'}" @click="area='KR'">韩国</span>
                  <span class="title" :class="{active:area=='JP'}" @click="area='JP'">日本</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in xindies" :key="index">
            <div class="img-wrap">
              <img :src="item.blurPicUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="name" style="color:#666">{{ item.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="30"
    >
    </el-pagination>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: "xindie",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      area: "ALL",
      xindies: [],
    };
  },
  watch:{
    area(){
      this.page=1;
      this.XinDie()
    }
  },
  created() {
    this.XinDie();
  },
  methods: {
    //全部新碟
    async XinDie() {
      const result = await this.$axios({
        // method:'post',
        url: "/album/new",
        params: {
          limit: 30,
          offset: (this.page - 1) * 30,
          area: this.area,
        },
      });
      console.log(result);
      this.total = result.data.total;
      this.xindies = result.data.albums;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val;
      this.XinDie()
    },
  },
};
</script>
