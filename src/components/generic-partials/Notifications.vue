<template>
  <q-modal ref="modal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-layout>
      <div class="toolbar" slot="header">
        <q-toolbar-title :padding="1">
          {{ $t('content.modals.notifications.title') }}
        </q-toolbar-title>
        <button @click="close">
          <i>close</i>
        </button>
      </div>
      <div class="layout-padding fit scroll">
        <p v-html="$t('content.modals.notifications.labels.count', {n: notifications.length}, notifications.length)"></p>
        <div class="card">
          <div class="list item-delimiter highlight">
            <template v-if="notifications.length > 0">
              <div class="item item-link" v-for="(n, i) in notifications" @click="userMessage(n)">
                <i class="item-primary">mail</i>
                <div class="item-content has-secondary">
                  <strong v-if="n.title === null">{{ $t('content.modals.notifications.labels.untitled') }}</strong>
                  <strong v-else>{{ n.title }}</strong>
                  <span v-if="n.sender.first_name !== null">{{ n.sender.first_name }}</span>
                  <span v-if="n.sender.last_name !== null">{{ n.sender.last_name }}</span>
                  <span v-else>{{ n.sender.email }}</span>
                  <span>{{ n.message }}</span>
                </div>
                <i class="item-secondary">keyboard_arrow_right</i>
              </div>
            </template>
            <template v-else>
              <div class="item">
                <div class="item-content text-center">
                  <strong>{{ $t('header.nav.tooltips.notifications.empty_message') }}</strong>
                </div>
              </div>
            </template>
          </div>
        </div>
        <button class="big round secondary" @click="close">
          <i>close</i>
          {{ $t('content.modals.notifications.buttons.close') }}
        </button>
      </div>

      <q-modal ref="messageModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <q-layout>
          <div class="toolbar" slot="header">
            <q-toolbar-title :padding="1">
              <strong>From:</strong>
              <span class="chip label bg-grey-4 text-grey-10" v-if="msg.sender.first_name !== null">
                {{ msg.sender.first_name }}
              </span>
              <span class="chip label bg-grey-4 text-grey-10" v-else-if="msg.sender.last_name !== null">
                {{ msg.sender.last_name }}
              </span>
              <span class="chip label bg-grey-4 text-grey-10" v-else>
                {{ msg.sender.email }}
              </span>
            </q-toolbar-title>
            <button @click="$refs.messageModal.close()">
              <i>close</i>
            </button>
          </div>
          <div class="layout-padding fit scroll">
            <h4 v-if="msg.title === null">{{ $t('content.modals.notifications.labels.untitled') }}</h4>
            <h4 v-else>{{ msg.title }}</h4>
            <div class="row gutter">
              <div class="auto">
                {{ msg.message }}
              </div>
            </div>
            <div class="row gutter">
              <div class="auto">
                <button class="big round secondary" @click="$refs.messageModal.close()">
                  <i>close</i>
                  {{ $t('content.modals.notifications.buttons.close') }}
                </button>
              </div>
            </div>
          </div>
        </q-layout>
      </q-modal>
    </q-layout>
  </q-modal>
</template>

<script>
export default {
  name: 'notifications',
  props: ['notifications'],
  data () {
    return {
      msg: {
        message: '',
        sender: {
          first_name: null,
          last_name: null,
          email: ''
        },
        title: null
      }
    }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  },
  methods: {
    close () {
      this.$refs.modal.close()
    },
    open () {
      this.$refs.modal.open()
    },
    userMessage (notification) {
      this.msg = notification
      this.$nextTick(() => {
        this.$refs.messageModal.open()
      })
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
.card
  span
    padding-left 2vw
</style>
