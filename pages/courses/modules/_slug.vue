<template>
  <div v-if="module">
    <div v-if="view === 'content'" v-html="module.content" />
    <div v-else-if="view === 'quiz'">
      <v-form v-model="form.answered">
        <v-layout row v-for="(answer, index) in answers" :key="index">
          <t-fill-in-the-blank />
        </v-layout>
      </v-form>
    </div>
  </div>
  <p v-else>{{ $t('course.module.not_found') }}</p>
</template>
<script>
import { ModuleBySlug } from '~/apollo/queries/modules.gql'
import { QuizByModule, QuizQuestions, QuizAnswers } from '~/apollo/queries/quizzes.gql'

// import TCode from '~/components/Code.vue'
import TMultipleAnswer from '~/components/MultipleAnswer.vue'
import TMultipleChoice from '~/components/MultipleChoice.vue'
import TFillInTheBlank from '~/components/FillInTheBlank.vue'

export default {
  name: 'module',
  props: {},
  apollo: {
    modules: {
      query: ModuleBySlug,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables () {
        return {
          slug: this.$route.params.slug
        }
      },
      result ({ data, loading }) {
        if (!loading) {
          this.module = data.modules.edges[0].node
        }
      }
    },
    quizzes: {
      query: QuizByModule,
      variables () {
        return {
          module: this.module.id
        }
      },
      result ({ data, loading }) {
        if (!loading) {
          this.quiz = data.quizzes.edges[0]
        }
      }
    },
    questions: {
      query: QuizQuestions,
      variables () {
        return {
          quiz: this.quiz.id
        }
      },
      result ({ data, loading }) {
        if (!loading) {
          this.question = data.questions.edges[0]
        }
      }
    },
    answers: {
      query: QuizAnswers,
      variables () {
        return {
          question: this.question.id
        }
      },
      result ({ data, loading }) {
        if (!loading) {
          this.answers = data.questions.edges
        }
      }
    }
  },
  data () {
    return {
      module: {},
      quiz: {},
      question: {},
      answers: [],
      form: {
        answered: false
      },
      view: 'content'
    }
  },
  components: {
    TFillInTheBlank,
    TMultipleAnswer,
    TMultipleChoice
  },
  methods: {
  }
}
</script>
