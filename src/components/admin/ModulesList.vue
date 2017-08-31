<template>
  <div class="layout-padding auto">
    <template v-if="view === 'list'">
      <div>
        <h2>
          {{ $t('content.admin.module.list.heading') }}
          <button class="big" @click="add()">
            <i>add_circle_outline</i>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]">
            {{ $t('content.admin.module.detail.new.heading') }}
            </q-tooltip>
          </button>
        </h2>
        <div class="row lg-gutter">
          <div class="full-width">
            <div class="list item-delimiter">
              <template v-for="(module, index) in modules">
                <div class="item cursor-pointer" @click="edit(module)">
                  <i class="item-primary">assignment</i>
                  <div class="item-content has-secondary">
                    <div>
                      {{ module.title }}
                    </div>
                  </div>
                  <div class="item-secondary">
                    <i slot="target">
                      more_vert
                      <q-popover ref="popover">
                        <div class="list item-delimiter">
                          <div class="item item-link" @click="quiz(module)">
                            <i class="item-primary">assignment</i>
                            <div class="item-content">
                              {{ $t('assessments.types.quiz') }}
                            </div>
                          </div>
                          <div class="item item-link" @click="edit(module)">
                            <i class="item-primary">edit</i>
                            <div class="item-content">
                              {{ $t('content.admin.module.list.buttons.edit') }}
                            </div>
                          </div>
                          <div class="item item-link" @click="remove(module)">
                            <i class="item-primary">delete</i>
                            <div class="item-content">
                              {{ $t('content.admin.module.list.buttons.delete') }}
                            </div>
                          </div>
                        </div>
                      </q-popover>
                    </i>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="view === 'detail'">
      <module-detail :action="action" :auth="auth" :course="course" :module="currentModule" :tigris="tigris" @save="sendToast" @close="switchViewTo" @keyup.esc="switchViewTo('list', '')" />
    </template>
    <template v-else-if="view === 'quiz'">
      <question @save="sendToast" @close="switchViewTo" :action="action" :module="currentModule" :partial="false" :tigris="tigris" />
    </template>
  </div>
</template>

<script>
import { Toast } from 'quasar'
import ModuleDetail from './ModuleDetail'
import Question from './assessments/Question'

export default {
  name: 'modules-list',
  props: ['auth', 'course', 'modal', 'tigris'],
  data () {
    return {
      action: 'edit',
      currentModule: {},
      currentQuiz: {},
      modules: [],
      view: 'list'
    }
  },
  computed: {},
  watch: {
    course (val) {
      this._onCreated()
    }
  },
  created () {
    if (typeof this.tigris.module !== 'undefined') {
      this._onCreated()
    }
  },
  methods: {
    _onCreated () {
      const tigris = this.tigris
      this.getModules(tigris).then(list => {
        this.modules = list
        this.modules.forEach(m => {
          this.getQuiz(tigris, m).then(quiz => {
            m.quiz = quiz
          })
        })
      })
    },
    add () {
      this.currentModule = {}
      this.switchViewTo('detail', 'add')
      // this.$refs.popover[1].close()
    },
    edit (module) {
      this.currentModule = module
      this.switchViewTo('detail', 'edit')
      // this.$refs.popover[1].close()
    },
    getModules (tigris) {
      return tigris.module.retrieve(this.course.id).then(r => {
        return r.data
      })
    },
    getQuiz (tigris, module) {
      return tigris.quiz.retrieve(null, module.id, true).then(r => {
        return r.data
      })
    },
    quiz (module) {
      var action
      if (typeof module.quiz !== 'undefined') {
        action = 'edit'
      } else {
        action = 'add'
      }
      this.currentModule = module
      this.switchViewTo('quiz', action)
    },
    remove (module) {},
    search (terms, done) {
      console.log(terms)
    },
    sendToast (type, msg) {
      Toast.create[type]({
        html: msg
      })
    },
    switchViewTo (view, action) {
      this.view = view
      this.action = action
    }
  },
  components: {
    ModuleDetail,
    Question
  }
}
</script>

<style lang="stylus">

</style>
