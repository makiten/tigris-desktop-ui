<template>
  <div class="layout-padding fit bg-light">
    <div class="shadow-2 round-borders bg-white">
      <div class="layout-padding">
        <div class="row items-center">
          <div>
            <h2>{{ user.shortname }}</h2>
          </div>
          <div>
            <button class="big" @click="edit()">
              <i>edit</i>
            </button>
          </div>
        </div>
        <hr>
        <div class="row gutter">
          <div>
            <button @click="" class="">
            </button>
          </div>
        </div>
        <hr>
        <q-data-table
           :data="data"
           :config="config"
           :columns="columns">

        </q-data-table>
      </div>
    </div>
    <user-detail @send-toast="sendToast" :user="user" ref="userDetail" :tigris="tigris" />
  </div>
</template>

<script>
import { Toast } from 'quasar'
import UserDetail from './detail/UserDetail'
import moment from 'moment'

export default {
  name: 'user',
  props: ['userId', 'tigris'],
  data () {
    return {
      columns: [
        {
          label: this.$t('user.columns.type'),
          field: 'type',
          width: '100px',
          filter: true,
          sort: 'string'
        },
        {
          label: this.$t('user.columns.timestamp'),
          field: 'timestamp',
          width: '100px',
          filter: true,
          sort: 'date'
        },
        {
          label: this.$t('user.columns.moment'),
          field: 'moment',
          width: '100px',
          filter: true,
          sort: 'moment'
        },
        {
          label: this.$t('user.columns.description'),
          field: 'description',
          width: '600px',
          filter: true,
          sort: 'string'
        }
      ],
      config: {
        rowHeight: '50px',
        noHeader: false,
        columnPicker: false,
        title: this.$t('user.title'),
        messages: {
          noData: '',
          noDataAfterFiltering: ''
        }
      },
      data: [],
      user: {}
    }
  },
  watch: {
    tigris (val) { this._load() }
  },
  computed: {},
  created () {
    if (this.tigris.user) {
      this._onCreated()
    }
  },
  methods: {
    _formatData (arr, type = 'enrollment') {
      let data = []
      for (var k in arr) {
        let obj = {
          type: this.$t('user.types.' + type.toLowerCase())
        }
        if (type === 'enrollment') {
          obj['description'] = this.$t(
            'user.descriptions.registered',
            {
              name: this.user.shortname,
              course: arr[k].course.title
            }
          )
          obj['timestamp'] = moment(arr[k].registered_on, moment.ISO_8601).format('llll')
          obj['moment'] = moment(arr[k].registered_on, moment.ISO_8601).fromNow()
        } else {
          obj['description'] = this.$t(
            'user.descriptions.test',
            {
              name: this.user.shortname,
              score: arr[k].score,
              course: ''
            }
          )
          obj['timestamp'] = moment(arr[k].date_completed, moment.ISO_8601).format('llll')
          obj['moment'] = moment(arr[k].date_completed, moment.ISO_8601).fromNow()
        }
        data.push(obj)
        if (type === 'enrollment' && arr[k].completed_on) {
          let compObj = {
            description: this.$t(
              'user.descriptions.completed',
              {
                name: this.user.shortname,
                course: arr[k].course.title
              }
            ),
            timestamp: moment(arr[k].completed_on, moment.ISO_8601).format('llll'),
            moment: moment(arr[k].completed_on, moment.ISO_8601).fromNow(),
            type: this.$t('user.types.' + type.toLowerCase())
          }
          data.push(compObj)
        }
      }
      return data
    },
    _load () {
      this.getUser().then(user => {
        this.user = user
        const data = []
        const enrollments = [
          ...this.user.enrollments.in_progress,
          ...this.user.enrollments.completed
        ]
        data.push(...this._formatData(enrollments))
        this.data = data
      })
    },
    _onCreated () {
      this._load()
    },
    edit () {
      this.$refs.userDetail.open()
    },
    getUser () {
      return this.tigris.user.retrieve(null, null, {shortname: this.userId}).then(r => {
        return r.data
      })
    },
    sendToast (type, msg) {
      Toast.create[type]({
        html: msg
      })
    }
  },
  components: {
    UserDetail
  }
}
</script>

<style lang="stylus">
@import '~themes/app.variables.styl'
button
  padding 0.25vh 0vw
  i
    color $faded
button:hover
  i
    color darken($primary, 95%)
</style>
