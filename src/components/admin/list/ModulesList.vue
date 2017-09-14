<template>
  <q-modal ref="modulesList" class="maximized">
    <q-layout>
      <template v-if="view === 'list'">
        <div class="full-width scroll">
          <div class="row">
            <div class="auto text-right">
              <button @click="$refs.modulesList.close()">
                <i class="text-primary">close</i>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="layout-padding auto">
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
                      <template v-if="modules.length === 0">
                        <div class="item-content">
                          <div class="text-center">
                            <p>{{ $t('content.admin.module.list.empty') }}</p>
                            <button class="secondary round big" @click="add">
                              {{ $t('content.admin.module.detail.new.heading') }}
                            </button>
                          </div>
                        </div>
                      </template>
                      <template v-for="(module, index) in modules" v-else>
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
                                  <div class="item item-link" @click="remove(index)">
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
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="view === 'detail'">
        <div class="full-width scroll">
          <div class="row">
            <div class="auto text-right">
              <button @click="view = 'list'">
                <i class="text-primary">close</i>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="layout-padding auto">
              <module-detail @send="sendToast" @save-module="updateModules" @delete-module="removeModules" @close="switchViewTo" :action="action" :auth="auth" :course="course" :module="currentModule" :tigris="tigris" />
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="view === 'quiz'">
        <div class="full-width scroll">
          <div class="row">
            <div class="auto text-right">
              <button @click="view = 'list'">
                <i class="text-primary">close</i>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="layout-padding auto">
              <question @save="sendToast" @close="switchViewTo" :action="action" :module="currentModule" :partial="false" :tigris="tigris" />
            </div>
          </div>
        </div>
      </template>
    </q-layout>
  </q-modal>
</template>

<script>
import { Toast } from 'quasar'
import ModuleDetail from '../detail/ModuleDetail'
import Question from '../assessments/Question'

export default {
  name: 'modules-list',
  props: ['auth', 'course', 'tigris'],
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
    if (this.tigris.module) {
      this._onCreated()
    }
  },
  methods: {
    close () {
      this.switchViewOrClose('list')
    },
    open () {
      this.$refs.modulesList.open()
    },
    _onCreated () {
      const tigris = this.tigris
      if (this.course.id) {
        this.getModules(tigris).then(list => {
          this.modules = list
          this.modules.forEach(m => {
            this.getQuiz(tigris, m).then(quiz => {
              m.quiz = quiz
            })
          })
        })
      }
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
      this.getQuiz(this.tigris, module).then(quiz => {
        module.quiz = quiz
        if (module.quiz !== '') {
          action = 'edit'
        } else {
          action = 'add'
        }
        this.currentModule = module
        this.switchViewTo('quiz', action)
      })
    },
    remove (index) {
      const module = this.modules[index + 1]
      this.tigris.module.destroy(this.course.id, module.id).then(r => {
        console.log(r.data)
        if (r.data.result >= 0) {
          this.modules.splice(index, 1)
          this.sendToast('positive', this.$t('result.success.message'))
        } else {
          this.sendToast('negative', this.$t('result.failure.message'))
        }
      })
    },
    removeModules (type, msg, module) {
      if (type === 'positive') {
        const idx = this.modules.findIndex(m => m.id === module.id)
        this.modules.splice(idx, 1)
      }
      this.sendToast(type, msg)
    },
    search (terms, done) {
      console.log(terms)
    },
    sendToast (type, msg) {
      Toast.create[type]({
        html: msg
      })
    },
    switchViewOrClose (view) {
      if (this.view === 'list') {
        this.$refs.modulesList.close()
      } else {
        this.view = view
      }
    },
    switchViewTo (view, action) {
      this.view = view
      this.action = action
    },
    updateModules (type, msg, module) {
      if (type === 'positive') {
        this.tigris.module.retrieve(this.course.id, module).then(r => {
          const fullModule = r.data
          const idx = this.modules.findIndex(m => m.id === fullModule.id)
          if (idx >= 0) {
            this.modules[idx] = fullModule
          } else {
            this.modules.push(fullModule)
          }
        })
      }
      this.sendToast(type, msg)
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
