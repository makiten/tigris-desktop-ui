<template>
  <v-app>
    <v-navigation-drawer
       class="indigo lighten-5"
       v-model="drawer"
       permanent
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
             nuxt-link>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
               v-for="child in item.children"
               :key="child.title"
               :to="child.route"
               >
              <v-list-tile-content>
                <v-list-tile-title>{{ child.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
             v-else
             :key="item.title"
             :to="item.route"
             nuxt-link>
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

export default {
  name: 'admin',
  data () {
    return {
      config: config,
      drawer: null,
      items: [
        {
          icon: 'home',
          title: this.$i18n.t('home.name'),
          route: '/'
        },
        {
          icon: 'school',
          title: this.$i18n.t('course.name'),
          route: '/admin/courses',
          children: [
            {
              icon: 'add',
              title: this.$i18n.t('course.nav.admin.add'),
              route: '/admin/courses/add'
            }
          ]
        },
        {
          icon: 'people',
          title: this.$i18n.t('users.name'),
          route: '/admin/users'
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
  }
}
</script>
