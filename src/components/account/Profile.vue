<template>
  <div class="layout-padding">
    <form name="personal-data" method="post" v-on:submit.prevent>
      <h4>{{ $t('content.modals.account.profile.form.heading') }}</h4>
      <div class="row gutter lt-md-column">
        <div class="auto">
          <div class="stacked-label">
            <input type="text" class="full-width" v-model="form.first_name">
            <label>{{ $t('content.modals.account.profile.form.fields.first_name') }}</label>
          </div>
        </div>
        <div class="auto">
          <div class="stacked-label">
            <input type="text" class="full-width" v-model="form.last_name">
            <label>{{ $t('content.modals.account.profile.form.fields.last_name') }}</label>
          </div>
        </div>
      </div>
      <div class="row gutter">
        <div class="auto">
          <div class="stacked-label">
            <input type="email" class="full-width" v-model="form.email" readonly>
            <label>{{ $t('content.modals.account.profile.form.fields.email') }}</label>
          </div>
        </div>
        <!--<div class="auto text-center">
          <div class="stacked-label">
            <label>{{ $t('content.modals.account.profile.form.fields.avatar') }}</label>
            <br>
            <q-uploader @upload="checkUpload" ref="avatar" :url="uploadUrl" extensions=".gif,.jpg,.jpeg,.png" :multiple="false" />
          </div>
        </div>-->
      </div>
    </form>

    <div class="lt-md">
      <button class="big full-width secondary" @click="saveProfile()">
        {{ $t('content.modals.account.profile.form.buttons.save') }}
      </button>
    </div>
    <div class="gt-sm">
      <button class="big round secondary" @click="saveProfile()">
        {{ $t('content.modals.account.profile.form.buttons.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'profile',
  props: ['tigris'],
  computed: {
    ...mapGetters({
      auth: 'auth/getUser',
      token: 'token/getToken'
    })
  },
  data () {
    return {
      form: {
        avatar: '',
        first_name: '',
        last_name: '',
        email: ''
      },
      uploadUrl: process.env.apiHost + '/api/utils/upload'
    }
  },
  watch: {
  },
  methods: {
    _onCreated () {
      for (var k in this.auth) {
        if (this.form.hasOwnProperty(k)) {
          this.form[k] = this.auth[k]
        }
      }
    },
    checkUpload (e, xhr) {
      const response = JSON.parse(xhr)
      this.form.avatar = response.uri
    },
    saveProfile () {
      const data = {fields: this.form, action: ''}
      this.tigris.user.update(this.auth.id, null, data).then(r => {
        if (r.data) {
          this.$emit('refresh')
          this.$emit('toast', 'positive', this.$t('content.modals.account.profile.toast.success'))
        } else {
          this.$emit('toast', 'negative', this.$t('content.modals.account.profile.toast.failure'))
        }
      }).then(r => {
        this._onCreated()
      })
    }
  },
  created () {
    this._onCreated()
  }
}
</script>

<style>
</style>
