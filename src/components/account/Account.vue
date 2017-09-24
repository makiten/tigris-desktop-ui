<template>
  <q-modal ref="modal" class="maximized">
    <q-layout>
      <div class="toolbar" slot="header">
        <button @click="$refs.modal.close()">
          <i>keyboard_arrow_left</i>
        </button>
        <q-toolbar-title :padding="1">
          <button @click="$refs.modal.close()">
            {{ $t('header.nav.account') }}
          </button>
        </q-toolbar-title>
        <button @click="$refs.modal.close()">
          <i>close</i>
        </button>
      </div>
      <div class="layout-view">
        <div class="layout-padding fit bg-light scroll">
          <div class="shadow-2 round-borders bg-white">
            <q-tabs :refs="$refs" default-tab="settings" class="primary justified shadow-1">
              <q-tab name="settings" icon="settings">{{ $t('content.modals.account.settings.tab') }}</q-tab>
              <q-tab name="profile" icon="face">{{ $t('content.modals.account.profile.tab') }}</q-tab>
            </q-tabs>
            <div>
              <div ref="settings">
                <settings :auth="auth" :tigris="tigris" @toast="sendToast" @refresh="refreshAuth" />
              </div>
              <div ref="profile">
                <profile :auth="auth"  :tigris="tigris" @toast="sendToast" @refresh="refreshAuth" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-layout>
  </q-modal>
</template>

<script>
import Profile from './Profile'
import Settings from './Settings'

export default {
  name: 'account',
  props: ['auth', 'tigris'],
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$refs.modal.close()
    },
    open () {
      this.$refs.modal.open()
    },
    refreshAuth () {
      this.$emit('refresh')
      this.close()
    },
    sendToast (type, message) {
      this.$emit('toast', type, message)
      this.close()
    }
  },
  components: {
    Profile,
    Settings
  }
}
</script>

<style lang="stylus">
</style>
