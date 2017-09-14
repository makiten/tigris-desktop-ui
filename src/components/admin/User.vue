<template>
  <div class="layout-padding fit bg-light">
    <div class="shadow-2 round-borders bg-white">
      <div class="layout-padding">
        <div class="row items-center">
          <div>
            <h2>{{ user.shortname }}</h2>
          </div>
          <div>
            <button class="big" @click="edit()">
              <i>edit</i>
            </button>
          </div>
        </div>
        <hr>
        <div class="row gutter">
          <div>
            <button @click="" class="">
            </button>
          </div>
        </div>
        <hr>
        {{ user.first_name }}
      </div>
    </div>
    <user-detail @send-toast="sendToast" :user="user" ref="userDetail" :tigris="tigris" />
  </div>
</template>

<script>
import { Toast } from 'quasar'
import UserDetail from './detail/UserDetail'

export default {
  name: 'user',
  props: ['userId', 'tigris'],
  data () {
    return {
      user: {}
    }
  },
  watch: {
    tigris (val) { this._load() }
  },
  computed: {},
  created () {
    if (this.tigris.user) {
      this._onCreated()
    }
  },
  methods: {
    _load () {
      this.getUser().then(user => { this.user = user })
    },
    _onCreated () {
      this._load()
    },
    edit () {
      this.$refs.userDetail.open()
    },
    getUser () {
      return this.tigris.user.retrieve(this.userId).then(r => {
        return r.data
      })
    },
    sendToast (type, msg) {
      Toast.create[type]({
        html: msg
      })
    }
  },
  components: {
    UserDetail
  }
}
</script>

<style lang="stylus">
@import '~themes/app.variables.styl'
button
  padding 0.25vh 0vw
  i
    color $faded
button:hover
  i
    color darken($primary, 95%)
</style>
