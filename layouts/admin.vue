<template>
  <v-app>
    <v-dialog
       v-model="dialog"
       width="500"
       >
      <t-search-user @close="dialog = false" />
    </v-dialog>
    <v-dialog
       v-model="dialog"
       width="500"
       >
      <t-search-user @close="dialog = false" @change="redirect" />
    </v-dialog>
    <v-navigation-drawer
       class="indigo lighten-5"
       v-model="drawer"
       fixed
       app
       >
      <v-toolbar flat color="indigo darken-3" dark>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://dragon-quest.org/images/0/0c/DQXI_Veronica.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title text-color="white">
                {{ user.username }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider />
        <template
           v-for="(item, index) in items"
           >
          <v-list-group
             v-if="item.children"
             :key="item.title"
             :prepend-icon="item.icon"
             :to="item.route"
             no-action
             nuxt>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <template v-for="child in item.children">
              <v-list-tile
                 v-if="child.dialog"
                 :key="child.title"
                 @click.stop="dialog = true"
                 >
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile
                 :key="child.title"
                 :to="child.route"
                 v-else
                 >
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list-group>
          <v-list-tile
             v-else
             :key="item.title"
             :to="item.route"
             nuxt>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-divider />

        <v-list-tile to="/logout" nuxt-link>
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('general.logout') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed flat app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        {{ config.appName }}
        <template v-if="pageTitle">
          {{ pageTitle }}
        </template>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>

   </v-app>
</template>

<script>
import config from '~/config.json'
import TSearchCourse from '~/components/SearchCourse.vue'
import TSearchUser from '~/components/SearchUser.vue'

export default {
  name: 'admin',
  data () {
    return {
      config: config,
      dialog: false,
      dialogs: {
        searchCourse: false,
        searchUser: false
      },
      drawer: null,
      items: [
        {
          icon: 'home',
          title: this.$i18n.t('home.name'),
          route: '/'
        },
        {
          icon: 'build',
          title: this.$i18n.t('admin.name'),
          route: '/admin'
        },
        {
          icon: 'school',
          title: this.$i18n.t('course.name'),
          route: '/admin/courses',
          children: [
            {
              icon: 'list_alt',
              title: this.$i18n.t('course.nav.admin.list'),
              route: '/admin/courses'
            },
            {
              icon: 'add',
              title: this.$i18n.t('general.nav.add'),
              route: '/admin/courses/add'
            },
            {
              icon: 'search',
              title: this.$i18n.t('general.nav.search'),
              route: '#search-course',
              dialog: 'searchCourse'
            }
          ]
        },
        {
          icon: 'people',
          title: this.$i18n.t('users.name'),
          route: '/admin/users',
          children: [
            {
              icon: 'people',
              title: this.$i18n.t('users.nav.admin.list'),
              route: '/admin/users'
            },
            {
              icon: 'person_add',
              title: this.$i18n.t('general.nav.add'),
              route: '/admin/users/add'
            },
            {
              icon: 'search',
              title: this.$i18n.t('general.nav.search'),
              route: '#search-user',
              dialog: 'searchUser'
            }
          ]
        },
        {
          icon: 'settings',
          title: this.$i18n.t('general.settings'),
          route: '/admin/settings'
        }
      ],
      pageTitle: '',
      user: {
        username: 'veronica'
      }
    }
  },
  methods: {
    redirect (id) {
      this.$router.push({ path: `/admin/users/${id}` })
    }
  },
  components: {
    TSearchCourse,
    TSearchUser
  }
}
</script>
