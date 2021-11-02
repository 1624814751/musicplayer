<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index" @>
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in playlists" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}:{{item.name}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.copywriter}}:{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in songs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="getMusicUrl(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in Mv" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.artistName}}</div>
            <div class="singer">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'discovery',
  data(){
   return{
      banners:[],
      playlists:[],
      songs:[],
      music:"",
      Mv:[]
   }
  },
  created(){
    this.Banner()
    this.Playlists()
    this.NewMusic()
    this.MV()
  },
  methods:{
    // 轮播图
    async Banner(){
      const result=await this.$axios({
            url:'/banner',
            params:{
              type:0
            }
          })
          console.log(result.data.banners)
          this.banners=result.data.banners
    },
    // 推荐音乐
    async Playlists(){
      const result =await this.$axios({
        url:'/personalized',
        params:{
          limit:30
        }
      })
      console.log(result)
      this.playlists=result.data.result
    },
    // 最新音乐
    async NewMusic(){
      const result =await this.$axios({
        url:'/personalized/newsong',
        params:{
          
        }
      })
      console.log(result)
      this.songs=result.data.result
    },
    // 播放音乐
    async getMusicUrl(id){
      console.log(id)
      // 获取02.index.vue中的musicUrl属性,并向其传值
      console.log(this.$parent.musicUrl)
      let musicUrl=`https://music.163.com/song/media/outer/url?id=${id}.mp3`
      this.$parent.musicUrl=musicUrl
    },
    // 推荐MV
    async MV(id){
      const result =await this.$axios({
        url:'/personalized/mv',
      })
      console.log(result)
      this.Mv=result.data.result
    }
  }
};
</script>

<style >

</style>
