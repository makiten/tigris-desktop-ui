<template>
<div class="login-page window-height window-width column items-center">
  <div>
    <div class="logo flex items-center justify-center">
        <img class="desktop-only" src="~assets/jogral-logo-web-white.svg">
    </div>
    <div class="login-card card bg-white round-borders items-center justify-center">
      <div class="card-title justify-center">
        {{ $t('labels.heading') }}
      </div>
      <div class="card-content">
        <div class="row">
          <div class="auto text-center">
            <button class="secondary round big" @click="">
              {{ $t('labels.login') }} {{ $t('labels.again') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center">&copy;{{currentYear}} Jogral, L.L.C.</p>
  </div>
</div>
</template>

<script>
export default {
  props: ['currentYear'],
  data () {
    return {
      logo: true
    }
  }
}
</script>

<style lang="stylus">
body
  background #68ccac
.login-page
  height 100%
  p
    color white
    font-weight 800
  .logo
    margin-top 20vh
    margin-bottom 2vh
    img
      width 400px
  .login-card
    width 90vw
    max-width 600px
    .card-content
      .row
        i
          font-size 2rem
</style>
