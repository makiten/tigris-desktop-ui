<template>
  <q-modal ref="modal" :content-css="contentCss" :class="className">
    <div class="layout-padding">
      <div class="row">
        <div class="auto">
          <slot name="header">
            <h4>{{ $t('header.nav.about.label') }}</h4>
          </slot>
        </div>
        <div class="auto text-right">
          <button class="primary clear" @click="close">
            <i>close</i>
          </button>
        </div>
      </div>
      <slot name="content">
        <p v-html="$t('header.nav.about.message')"></p>
      </slot>
      <button class="big round primary" @click="close">
        {{ $t('header.nav.about.close') }}
      </button>
    </div>
  </q-modal>
</template>

<script>
export default {
  name: 'gen-modal',
  props: ['contentCss', 'maximized', 'minimized'],
  data () {
    return {
    }
  },
  computed: {
    className () {
      if (this.maximized) {
        return 'maximized'
      } else if (this.minimized) {
        return 'minimized'
      } else {
        return ''
      }
    }
  },
  created () {
  },
  methods: {
    _onCreated () {
    },
    close () {
      this.$refs.modal.close()
    },
    open () {
      this.$refs.modal.open()
    }
  }
}
</script>

<style lang="stylus">
</style>
