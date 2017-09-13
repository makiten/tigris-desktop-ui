<template>
  <div class="layout-padding fit bg-light">
    <div class="shadow-2 round-borders bg-white">
      <div class="layout-padding">
        <h2>{{ user.shortname }}</h2>
        <div class="row gutter">
          <div>
            <button @click="" class="">
            </button>
          </div>
        </div>
        {{ user.first_name }}
      </div>
    </div>
  </div>
</template>

<script>
import UserDetail from './detail/UserDetail'

export default {
  name: 'user',
  props: ['shortname', 'tigris'],
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
    getUser () {
      return this.tigris.user.retrieve(null, null, { shortname: this.shortname }).then(r => {
        return r.data
      })
    }
  },
  components: {
    UserDetail
  }
}
</script>

<style lang="stylus">
</style>
