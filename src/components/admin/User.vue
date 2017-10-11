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
            <table class="q-table flipped responsive">
              <thead>
                <tr>
                  <th>{{ $t('user.table.name') }}</th>
                  <th>{{ $t('user.table.username') }}</th>
                  <th>{{ $t('user.table.email') }}</th>
                  <th>{{ $t('user.table.created') }}</th>
                  <th>{{ $t('user.table.roles') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t('user.table.format', {firstname: name.first, lastname: name.last}) }}</td>
                  <td>{{ user.shortname }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ userCreated }}</td>
                  <td>{{ user.roles }}</td>
                </tr>
              </tbody>
            </table>
            <button @click="" class="">
            </button>
          </div>
        </div>
        <hr>
        <q-data-table
           :data="data"
           :config="config"
           :columns="columns"
           @refresh="refresh">

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
          width: '120px',
          filter: true,
          sort: 'date'
        },
        {
          label: this.$t('user.columns.moment'),
          field: 'moment',
          width: '90px',
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
        // refresh: true,
        noHeader: false,
        columnPicker: false,
        title: this.$t('user.title'),
        messages: {
          noData: this.$t('user.messages.no_data'),
          noDataAfterFiltering: this.$t('user.messages.no_data_after_filtering')
        },
        labels: {
          allCols: this.$t('user.allCols'),
          search: this.$t('user.search')
        }
      },
      data: [],
      user: {}
    }
  },
  watch: {
    tigris (val) { this._load() },
    '$store.state.i18n.locale': function (val) {
      moment.locale(val)
      this.config.title = this.$t('user.title')
      this.config.messages = {
        noData: this.$t('user.messages.no_data'),
        noDataAfterFiltering: this.$t('user.messages.no_data_after_filtering')
      }
      this.config.labels = {
        allCols: this.$t('user.allCols'),
        search: this.$t('user.search')
      }
      this.columns[0].label = this.$t('user.columns.type')
      this.columns[1].label = this.$t('user.columns.timestamp')
      this.columns[2].label = this.$t('user.columns.moment')
      this.columns[3].label = this.$t('user.columns.description')
      this._load()
    }
  },
  computed: {
    name () {
      let name = {
          first: (this.user.first_name) ? this.user.first_name : '-',
          last: (this.user.first_name) ? this.user.first_name : '-'
      }
      return name
    },
    userCreated () {
      return moment(this.user.created_on, moment.ISO_8601).format('llll')
    }
  },
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
      console.log(this.$i18n)
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
    refresh (done) {
      done()
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
