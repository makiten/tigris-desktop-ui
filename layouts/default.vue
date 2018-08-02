<template>
  <v-app>
    <v-navigation-drawer
       v-model="drawer"
       fixed
       app>
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

      <v-list dense>
        <template v-for="(item, index) in items">
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
  data () {
    return {
      config: config,
      drawer: false,
      items: [
        {
          icon: 'home',
          title: this.$i18n.t('home.name'),
          route: '/'
        },
        {
          icon: 'build',
          title: this.$i18n.t('admin.name'),
          route: '/admin',
          admin: true
        },
        {
          icon: 'school',
          title: this.$i18n.t('course.name'),
          route: '/courses'
        },
        {
          icon: 'person',
          title: this.$i18n.t('general.profile'),
          route: '/profile'
        }
      ],
      mini: true,
      right: null,
      user: {
        username: 'veronica'
      }
    }
  }
}
</script>

<style>
</style>
