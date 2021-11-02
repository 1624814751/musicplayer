<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="MvUrl"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="geshou.artist.cover" alt="" />
          </div>
          <span class="name">{{geshou.artist.name}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{geshou.artist.transNames[0]}}</h2>
          <span class="date">发布：2014-11-04</span>
          <span class="number">播放：{{geshou.user.province}}</span>
          <p class="desc">
           {{geshou.artist.briefDesc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">(666)</span></p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">(666)</span></p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
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
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in xgmv" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mv",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      id:0,
      MvUrl:"",
      mvid:0,
      xgmv:[],
      geshou:{}
    };
  },
  created() {
    this.MvList()
    this.XGMV()
    this.MvXinXi()
    this.Comment();
  },
  methods: {
    // MV地址
    async MvList(){
      this.id=this.$route.query.id;
      console.log(this.id)
      const result =await this.$axios({
        url:'/mv/url',
        params:{
          id:this.id
        }
      })
      console.log(result)
      this.mvid=result.data.data.id
      this.MvUrl=result.data.data.url
    },
    // 相关MV
    async XGMV(){
      this.id=this.$route.query.id;
      console.log(this.id)
      const result =await this.$axios({
        url:'/simi/mv',
        params:{
          mvid:this.mvid
        }
      })
      console.log(result)
      this.xgmv=result.data.mvs
      // 把播放量大于100000的,转换为..万
      for (let i = 0; i < this.xgmv.length; i++) {
        //  得到播放次数
        let playCount = this.xgmv[i].playCount;
        if (playCount >= 100000) {
          //  parseInt将小数转换成整数
          playCount = parseInt(playCount / 10000);
          this.xgmv[i].playCount = `${playCount}万+`;
        }
      }
      // 时间转换
      for (let i = 0; i < this.xgmv.length - 1; i++) {
        // 播放时间：毫秒 ==>分：秒
        let ms = this.xgmv[i].duration;
        // 先将毫秒转换成秒
        let sec = parseInt(ms / 1000);
        // console.log(sec)
        // 将秒转换成分
        let min = parseInt(sec / 60);
        if(min<10){
          min="0"+min
        }
        sec = sec % 60;
        if(sec<10){
          sec="0"+sec
        }
        this.xgmv[i].duration = `${min}:${sec}`;
      }
    },
    // 歌手信息
    async MvXinXi(){
      const result =await this.$axios({
        url:'/artist/detail',
        params:{
          id:11972054
        }
      })
      console.log(result)
      this.geshou=result.data.data
      console.log(this.geshou.user.province)
      let playCount = this.geshou.user.province;
      if (playCount >= 100000) {
          //  parseInt将小数转换成整数
          playCount = parseInt(playCount / 10000);
          this.geshou.user.province= `${playCount}万+`;
        }
    },
    // MV评论
    async Comment(){
      this.id=this.$route.query.id;
      console.log(this.id)
      const result =await this.$axios({
        url:'/dj/hot',
        params:{
          // limit:10
        }
      })
      console.log(result)
      // this.songs=result.data.result
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style></style>
