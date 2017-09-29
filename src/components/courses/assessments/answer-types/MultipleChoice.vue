<template>
  <div class="auto">
    <h4 v-html="question"></h4>
    <p>{{ $t('content.courses.module.quiz.types.mc.instructions') }}</p>
    <div class="list item-delimiter">
      <label class="item" v-for="(answer, index) in answers">
        <div class="item-primary">
          <q-radio ref="input"
                   v-model="checked"
                   v-bind:value="value"
                   @input="setValue(checked)"
                   :val="'answer' + index">
          </q-radio>
        </div>
        <div class="item-content" v-html="answer"></div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mc',
  props: ['question', 'answers', 'value'],
  data: () => ({
    checked: ''
  }),
  methods: {
    sanitize (val) {
      return val.replace(/[`]/g, '')
    },
    setValue (val) {
      this.$emit('input', val)
    }
  },
  watch: {
    choice () {
    },
    value (val) {
      this.checked = val
      this.setValue(val)
    }
  },
  created () {
  }
}
</script>
