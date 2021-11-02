<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span
        class="item"
        :class="{ active: cat == '全部' }"
        @click="(id = '0'), (cat = '全部')"
        >全部</span
      >
      <span
        class="item"
        :class="{ active: cat == '华语' }"
        @click="(id = '7'), (cat = '华语')"
        >华语</span
      >
      <span
        class="item"
        :class="{ active: cat == '欧美' }"
        @click="(id = '96'), (cat = '欧美')"
        >欧美</span
      >
      <span
        class="item"
        :class="{ active: cat == '日本' }"
        @click="(id = '8'), (cat = '日本')"
        >日本</span
      >
      <span
        class="item"
        :class="{ active: cat == '韩国' }"
        @click="(id = '16'), (cat = '韩国')"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in songs" :key="index">
          <td>{{ (index += 1) }}</td>
          <td>
            <div class="img-wrap">
              <img
                :src="item.album.picUrl"
                alt=""
                @click="getMusicUrl(item.id)"
              />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "songs",
  data() {
    return {
      songs: [],
      id: 0,
      cat: "全部",
    };
  },
  watch: {
    cat() {
      this.NewMusic();
    },
  },
  created() {
    this.NewMusic();
  },
  methods: {
    ID() {},
    // 最新音乐
    async NewMusic() {
      const result = await this.$axios({
        url: "/top/song",
        params: {
          type: this.id,
        },
      });
      console.log(result);
      this.songs = result.data.data;
      // 时间转换
      for (let i = 0; i < this.songs.length - 1; i++) {
        // 播放时间：毫秒 ==>分：秒
        let ms = this.songs[i].duration;
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
        this.songs[i].duration = `${min}:${sec}`;
      }
    },
    // 播放音乐
    async getMusicUrl(id) {
      console.log(id);
      // 获取02.index.vue中的musicUrl属性,并向其传值
      console.log(this.$parent.musicUrl);
      let musicUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$parent.musicUrl = musicUrl;
    },
  },
};
</script>

<style >
</style>
