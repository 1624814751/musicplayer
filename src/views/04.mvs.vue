<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: area == '全部' }" @click="area = '全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '内地' }" @click="area = '内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '港台' }" @click="area = '港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '欧美' }" @click="area = '欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '日本' }" @click="area = '日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '韩国' }" @click="area = '韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: type == '全部' }" @click="type = '全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '官方版' }" @click="type = '官方版'">官方版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '原声' }" @click="type = '原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '现场版' }" @click="type = '现场版'">现场版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '网易出品' }" @click="type = '网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: order == '上升最快' }" @click="order = '上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最热' }" @click="order = '最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最新' }" @click="order = '最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          @click="toMv(item.id)"
          v-for="(item, index) in mvs"
          :key="index"
        >
          <div class="img-wrap">
            <img :src="item.cover" alt=""/>
            <div class="num-wrap">
              <div class="iconfont icon-play" ></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
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
        :page-size="20"
        :limit="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "mvs",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 20,
      area: "全部",
      type: "全部",
      order: "上升最快",
      mvs: [],
    };
  },
  watch:{
    area(){
      this.page=1;
      this.MV()
    },
    type(){
      this.page=1;
      this.MV()
    },
    order(){
      this.page=1;
      this.MV()
    }
  },
  created() {
    this.MV();
  },
  methods: {
    toMv(id) {
      // console.log(id)
      this.$router.push(`/mv?id=${id}`);
    },

    // 全部MV
    async MV() {
      const result = await this.$axios({
        url: "/mv/all",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      });
      console.log(result);
      if(result.data.count!=null){
          this.total = result.data.count;
      }
      this.mvs = result.data.data;
      // 把播放量大于100000的,转换为..万
      for (let i = 0; i < this.mvs.length; i++) {
        //  得到播放次数
        let playCount = this.mvs[i].playCount;
        if (playCount >= 100000) {
          //  parseInt将小数转换成整数
          playCount = parseInt(playCount / 10000);
          this.mvs[i].playCount = `${playCount}万+`;
        }
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.MV()
      console.log(this.total)
    },
  },
};
</script>

<style >
</style>
