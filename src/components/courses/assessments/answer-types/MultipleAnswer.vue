<template>
  <div class="auto">
    <h4 v-html="question"></h4>
    <p>{{ $t('content.courses.module.quiz.types.ma.instructions') }}</p>
    <div class="list item-delimiter">
      <label class="item" v-for="(v, k) in choices">
        <div class="item-primary">
          <q-checkbox ref="input"
                      v-model="v.model"
                      v-bind:value="value"
                      @input="setValue(k, v.model)" />
        </div>
        <div class="item-content" v-html="v.answer"></div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ma',
  props: ['question', 'answers', 'value'],
  data: () => ({
    choices: {}
  }),
  methods: {
    setValue (idx, val) {
      const choices = this.value
      choices[idx.toString()].model = val
      this.$emit('input', choices)
    }
  },
  watch: {
    choice () {
    }
  },
  created () {
    // We have to use the workaround based on (https://github.com/quasarframework/quasar-framework.org/issues/122)
    // to allow us to check for multiple checkboxes.
    // In v0.14, we could use `val`, but we'd need to sanitize input.
    const answers = this.answers
    const choices = {}
    for (var i = 1; i <= Object.keys(answers).length; i++) {
      choices[i.toString()] = {
        answer: answers[i.toString()],
        model: false
      }
    }
    if (this.value === '') {
      this.$emit('input', choices)
    }
    this.choices = choices
  }
}
</script>
