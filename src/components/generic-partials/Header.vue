<template>
  <div class="row flex full-width no-margin no-padding">
<!--
    <div class="auto">
      <q-toolbar-title :padding="1">
        <span class="mobile-only">{{app.label}}</span>
        <img class="desktop-only" src="~assets/jogral-logo-web-white.svg">
      </q-toolbar-title>
    </div>

    <div class="auto text-center">
    </div>

    <div class="auto text-right">

      <q-select class="lang-picker" type="radio" v-model="locale" :options="locales"></q-select>

      <button class="big relative-position notifications" @click="$refs.notificationsModal.open()">

        <template v-if="notifications.length > 0">
          <i>notifications_on</i>
          <span class="floating circular label bg-secondary">{{ notifications.length }}</span>
          <q-tooltip>
            <strong>{{ $t('header.notifications.label') }}</strong>
          </q-tooltip>
          <q-popover ref="notificationsPopover">
            <div class="list item-delimiter highlight">
            </div>
          </q-popover>
        </template>

        <template v-else>
          <i>notifications_none</i>
          <q-tooltip>
            <strong>{{ $t('header.notifications.empty_message') }}</strong>
          </q-tooltip>
        </template>

      </button>

      <button class="big">
        <i>account_circle</i>

        <q-popover>
          <div class="list item-delimiter highlight">
            <div class="item item-link" v-if="auth.isAdmin">
              <div class="item-content">
                <router-link to="/admin">{{ $t('header.admin') }}</router-link>
              </div>
            </div>
            <div class="item item-link" v-if="auth.isLoggedIn">
              <div class="item-content">
                <a @click="$refs.accountModal.open()">{{ $t('header.account') }}</a>
              </div>
            </div>
            <div class="item item-link">
              <div class="item-content">
                <router-link to="/login" v-if="!auth.isLoggedIn" replace>{{ $t('header.login') }}</router-link>
                <router-link to="/logout" v-else replace>{{ $t('header.logout') }}</router-link>
              </div>
            </div>
          </div>
        </q-popover>

        <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
          <strong>{{ $t('tooltips.nav') }}</strong>
        </q-tooltip>
      </button>

      <button class="big" @click="$router.push({path: '/courses'})">
        <i>school</i>
        <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
          <strong>{{ $t('header.course') }}</strong>
        </q-tooltip>
      </button>

      <button class="big">
        <i>more_horiz</i>
        <q-popover>
          <div class="list item-delimiter highlight">
            <div class="item item-link" @click="about.handler()">
              <div class="item-content">
                <a>{{ $t('header.about') }}</a>
              </div>
            </div>
          </div>
        </q-popover>
        <q-tooltip anchor="center left" self="center right" :offset="[0, 0]">
          <strong>{{ $t('header.more') }}</strong>
        </q-tooltip>
      </button>

    </div>-->
  </div>
</template>

<script>
export default {
  name: 'header',
  props: [],
  data () {
    return {}
  },
  watch: {
  },
  methods: {
  },
  created () {
  },
  components: {
  }
}
</script>

<style lang="stylus">
</style>
