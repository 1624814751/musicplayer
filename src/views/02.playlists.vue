<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="jpmusic.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{ jpmusic.name }}
        </div>
        <div class="info">
          {{ jpmusic.description }}
        </div>
      </div>
      <img :src="jpmusic.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: cat == '全部' }"
          @click="cat = '全部'"
          >全部</span
        >
        <span
          class="item"
          :class="{ active: cat == '欧美' }"
          @click="cat = '欧美'"
          >欧美</span
        >
        <span
          class="item"
          :class="{ active: cat == '华语' }"
          @click="cat = '华语'"
          >华语</span
        >
        <span
          class="item"
          :class="{ active: cat == '流行' }"
          @click="cat = '流行'"
          >流行</span
        >
        <span
          class="item"
          :class="{ active: cat == '说唱' }"
          @click="cat = '说唱'"
          >说唱</span
        >
        <span
          class="item"
          :class="{ active: cat == '摇滚' }"
          @click="cat = '摇滚'"
          >摇滚</span
        >
        <span
          class="item"
          :class="{ active: cat == '民谣' }"
          @click="cat = '民谣'"
          >民谣</span
        >
        <span
          class="item"
          :class="{ active: cat == '电子' }"
          @click="cat = '电子'"
          >电子</span
        >
        <span
          class="item"
          :class="{ active: cat == '轻音乐' }"
          @click="cat = '轻音乐'"
          >轻音乐</span
        >
        <span
          class="item"
          :class="{ active: cat == '影视原声' }"
          @click="cat = '影视原声'"
          >影视原声</span
        >
        <span
          class="item"
          :class="{ active: cat == 'ACG' }"
          @click="cat = 'ACG'"
          >ACG</span
        >
        <span
          class="item"
          :class="{ active: cat == '怀旧' }"
          @click="cat = '怀旧'"
          >怀旧</span
        >
        <span
          class="item"
          :class="{ active: cat == '治愈' }"
          @click="cat = '治愈'"
          >治愈</span
        >
        <span
          class="item"
          :class="{ active: cat == '旅行' }"
          @click="cat = '旅行'"
          >旅行</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in gdmusic" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：{{ item.description }}</p>
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
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      cat: "全部",
      jpmusic: [],
      gdmusic: [],
    };
  },
  watch: {
    // 侦听类别的改变
    cat() {
      this.page=1;
      this.highquality();
      this.getMusicList();
    },
  },
  created() {
    this.highquality();
    this.getMusicList();
  },
  methods: {
    // 精品歌单
    async highquality() {
      const jpMusic = await this.$axios({
        url: "/top/playlist/highquality",
        params: {
          limit: 1,
          cat: this.cat,
        },
      });
      console.log(jpMusic);
      this.jpmusic = jpMusic.data.playlists[0];
    },
    // 歌单列表
    async getMusicList() {
      const gdMusic = await this.$axios({
        url: "/top/playlist/",
        params: {
          limit: 10, //每页显示的歌单的数量
          //  offset(页数-1)*20 其中20这limit的值 由于默认显示第一页   所以offset=0
          offset: (this.page - 1) * 10,
          cat: this.cat,
        },
      });
      console.log(gdMusic);
      this.total = gdMusic.data.total;
      console.log(this.total);
      this.gdmusic = gdMusic.data.playlists;
      // 把播放量大于100000的,转换为..万
      for (let i = 0; i < this.gdmusic.length; i++) {
        //  得到播放次数
        let playCount = this.gdmusic[i].playCount;
        if (playCount >= 100000) {
          //  parseInt将小数转换成整数
          playCount = parseInt(playCount / 10000);
          this.gdmusic[i].playCount = `${playCount}万+`;
        }
      }
    },
    //当当前页改变的时候会调用
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.highquality();
      this.getMusicList();
    },
  },
};
</script>

<style >
</style>
