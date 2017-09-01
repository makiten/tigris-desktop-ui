<template>
  <div class="card role-card">
    <div class="card-title bg-primary text-white">
      <div class="row">
        <div class="auto">
          {{ role.name }}
          <button class="big" @click="open">
            <i>edit</i>
          </button>
        </div>
        <div class="text-right" v-if="role.deletable">
          <button class="remove big" @click="remove">
            <i :class="$t('result.failure.class')">delete_forever</i>
          </button>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p>{{ role.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'role-card',
  props: ['role', 'tigris'],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
    this._onCreated()
  },
  methods: {
    _onCreated () {
    },
    open () {
      this.$emit('modal-open')
    },
    remove () {
      this.tigris.role.destroy(this.role.id).then(r => {
        this.$emit('delete', 'positive', this.$t('result.success.message'), 'roles')
        // else?
      }).catch(e => {
        if (process.env.NODE_ENV !== 'production') { console.error(e) }
        this.$emit('delete', 'negative', this.$t('result.failure.message'))
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~themes/app.variables.styl'
.card.role-card
  height 14vh
  .card-title
    padding-top 0.1vh
    padding-bottom 0.1vh
    button
      padding 0.25vh 0vw
      i
        color lighten($primary, 55%)
    button:hover
      i
        color darken($primary, 55%)
</style>
