<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed flat app>
      <v-toolbar-title>
        Tigris
      </v-toolbar-title>
      <v-spacer />
      <v-btn to="/" icon nuxt>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>note</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>school</v-icon>
      </v-btn>
      <v-dialog
         v-model="dialog"
         max-width="290"
         persistent
         app>
        <v-btn icon slot="activator">
          <v-icon>bug_report</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            blah
          </v-card-title>
          <v-card-text>
            blah2
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue-darken-1" flat @click.native="dialog = false">{{ $t('general.form.send') }}</v-btn>
            <v-btn color="blue-darken-1" flat @click.native="dialog = false">{{ $t('general.form.close') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn flat>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-navigation-drawer
       v-model="drawer"
       :right="right"
       @click.native="$refs.courseNotes.$el.focus()"
       fixed
       temporary
       app>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          {{ $t('general.notes') }}
        </v-toolbar-title>
      </v-toolbar>

      <v-divider/>

     <v-form>
       <v-textarea
          v-model="courseNotes"
          ref="courseNotes"
          label="Notes"
          flat
          single-line
          auto-grow
          full-width />
     </v-form>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    courseNotes: '',
    dialog: false,
    drawer: false,
    mini: false,
    right: true
  })
}
</script>

<style>
</style>
