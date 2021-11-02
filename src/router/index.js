import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    undefined
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

import Discovery from 'views/01.discovery.vue'
import Playlists from 'views/02.playlists.vue'
import Songs from 'views/03.songs.vue'
import Mvs from 'views/04.mvs.vue'
import Result from 'views/05.result.vue'
import Playlist from 'views/06.playlist.vue'
import Mv from 'views/07.mv.vue'
import XinDie from 'views/08.xindie.vue'
import DianTai from 'views/09.diantai.vue'
import VUE from 'views/vue实例.vue'

const router = new VueRouter({
    routes: [{
            path: '/discovery',
            component: Discovery
        },
        {
            path: '/playlists',
            component: Playlists
        },
        {
            path: '/songs',
            component: Songs
        },
        {
            path: '/mvs',
            component: Mvs
        },
        {
            path: '/result',
            component: Result
        },
        {
            path: '/playlist',
            component: Playlist
        },
        {
            path: '/mv',
            component: Mv
        },
        {
            path: '/xindie',
            component: XinDie
        },
        {
            path: '/diantai',
            component: DianTai
        },
        {
            path: '/vue',
            component: VUE
        }
    ]
})

export default router