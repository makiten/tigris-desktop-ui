<template>
  <div class="layout-padding">
    <form name="personal-data" method="post" enctype="application/x-www-form-urlencoded">
      <h4>{{ $t('content.modals.account.profile.form.heading') }}</h4>
      <div class="row gutter">
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
        <div class="auto text-center">
          <div class="stacked-label">
            <label>{{ $t('content.modals.account.profile.form.fields.avatar') }}</label>
            <br>
            <button class="big round primary" @click="">
              <i>file_upload</i>
              {{ $t('content.modals.account.profile.form.buttons.upload') }}
            </button>
          </div>
        </div>
      </div>
    </form>

    <button class="big round secondary" @click="saveProfile()">
      {{ $t('content.modals.account.profile.form.buttons.save') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'profile',
  props: ['auth', 'modal', 'tigris'],
  data () {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: ''
      }
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
    saveProfile () {
      const data = {fields: this.form, action: ''}
      this.tigris.user.update(this.auth.id, null, data).then(r => {
        // this.modal.close()
        if (r.data) {
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
