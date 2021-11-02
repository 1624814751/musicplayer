<template>
  <div class="index-container">
    <div class="nav" >
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
         <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
         <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link> 
        </li>
        <li>
          <router-link to="/mvs">
             <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
        <li>
         <router-link to="/xindie">
            <span class="iconfont icon-music"></span>
            新碟
          </router-link> 
        </li>
        <li>
         <router-link to="/diantai">
            <span class="iconfont icon-music"></span>
            电台
          </router-link> 
        </li>
      </ul>
    </div>
    <div class="main">
       <!-- 路由出口 -->
       <router-view></router-view>
    </div>
    <div class="player">
      <audio :src='musicUrl' controls autoplay></audio>
      <!-- <aplayer :music="audio[0]" :list="audio"  :showlrc="true"></aplayer> -->
    </div>
  </div>
</template>

<script>
// import aplayer from "vue-aplayer";  

export default {
  name: 'index',
  data() {
    return {
      musicUrl:"http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3"
    };
  },
  // components: { aplayer },
  mounted(){
   
  },
  methods:{
   
  }
};
</script>

<style >

</style>
