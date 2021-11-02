<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到{{ total }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in Songs"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap" @click="getMusicUrl(item.id)">
                    <span>{{ item.name }}</span>
                    <span
                      class="iconfont icon-mv"
                      v-show="item.mvid != 0"
                    ></span>
                  </div>
                  <span>{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item, index) in Lists" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" @click="playlist(item.id)" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：{{ item.creator.nickname }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item, index) in Mvs" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" @click="MV(item.id)" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      activeIndex: "songs",
      Songs: [],
      Lists: [],
      Mvs: [],
      // 总条数
      total: 0,
      // 页码
      page: 1,
    };
  },
  created() {
    this.$bus.$on("getSong", (data) => {
      // data:接收传递的数据
      console.log(data);
      this.Songs = data.songs;
      this.total = data.songCount;
      // 调用方法把毫秒的时间转变成分秒的时间
      this.Songs = this.changeTimeFormat(this.Songs);
       
    });
    this.$bus.$on("getLists", (data) => {
      // data:接收传递的数据
      console.log(data);
      this.Lists = data.playlists;
      this.total = data.playlistCount;
      // 把播放量大于100000的,转换为..万
      for (let i = 0; i < this.Lists.length; i++) {
        //  得到播放次数
        let playCount = this.Lists[i].playCount;
        if (playCount >= 100000) {
          //  parseInt将小数转换成整数
          playCount = parseInt(playCount / 10000);
          this.Lists[i].playCount = `${playCount}万+`;
        }
      }
    });
    this.$bus.$on("getMvs", (data) => {
      // data:接收传递的数据
      console.log(data);
      this.Mvs = data.mvs;
      this.total = data.mvCount;
      for (let i = 0; i < this.Mvs.length; i++) {
        let playCount = this.Mvs[i].playCount;
        if (playCount >= 100000) {
          playCount = parseInt(playCount / 10000);
          this.Mvs[i].playCount = `${playCount}万`;
        }
      }
      // 调用方法把毫秒的时间转变成分秒的时间
      this.Mvs = this.changeTimeFormat(this.Mvs);
    });
    // this.getSongs();
  },
  watch: {
    activeIndex() {
      console.log(this.activeIndex);
      switch (this.activeIndex) {
        case "songs":
          this.getSongs();
          break;
        case "lists":
          this.getLists();
          break;
        case "mv":
          this.getMvs();
          break;
      }
    },
  },
  methods: {
     // 跳转到歌单详情
    playlist(id){
      this.$router.push(`/playlist?id=${id}`)
    },
    // 跳转到MV
    MV(id){
      this.$router.push(`/mv/id=${id}`)                                                                                                                                                                                              .push(`/mv?id=${id}`)
    },
    // 播放音乐
    async getMusicUrl(id) {
      console.log(id);
      // 获取02.index.vue中的musicUrl属性,并向其传值
      console.log(this.$parent.musicUrl);
      let musicUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$parent.musicUrl = musicUrl;
    },
    async getSongs() {
      const res = await this.$axios({
        url: "/search",
        params: {
          keywords: this.$route.query.q,
          limit: 30,
          type: 1,
          offset:(this.page-1)*30
        },
      });
      // localStorage
      console.log(res);
      this.Songs = res.data.result.songs;
      this.total=res.data.result.songCount
      // 调用方法把毫秒的时间转变成分秒的时间
       this.Songs=this.changeTimeFormat(this.Songs)
    },
    async getLists() {
      const res = await this.$axios({
        url: "/search",
        params: {
          keywords: this.$route.query.q,
          limit: 30,
          type: 1000,
          offset:(this.page-1)*30
        },
      });
      // localStorage
      console.log(res);
      this.Lists = res.data.result.playlists;
      this.total=res.data.result.playlistCount
      // 把播放量大于100000的,转换为..万
      for (let i = 0; i < this.Lists.length; i++) {
        //  得到播放次数
        let playCount = this.Lists[i].playCount;
        if (playCount >= 100000) {
          //  parseInt将小数转换成整数
          playCount = parseInt(playCount / 10000);
          this.Lists[i].playCount = `${playCount}万+`;
        }
      }
    },
    async getMvs() {
      const res = await this.$axios({
        url: "/search",
        params: {
          keywords: this.$route.query.q,
          limit: 30,
          type: 1004,
          offset:(this.page-1)*30
        },
      });
      // localStorage
      console.log(res);
      this.Mvs= res.data.result.mvs;
      this.total=res.data.result.mvCount
      for(let i=0;i<this.Mvs.length;i++){
        let playCount=this.Mvs[i].playCount;
        if(playCount>=100000){
          playCount=parseInt(playCount/10000);
          this.Mvs[i].playCount=`${playCount}万`
        }
      }
      this.Mvs=this.changeTimeFormat(this.Mvs)
    },
    changeTimeFormat(t){
      // 时间转换
      for (let i = 0; i < t.length; i++) {
        // 播放时间：毫秒 ==>分：秒
        let ms = t[i].duration;
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
        t[i].duration = `${min}:${sec}`;
      }
      return t;
    }
  }
};
</script>

<style >
</style>
