<template>
  <v-card :color="color" flat>
    <v-card-media
       :src="imgSrc"
       :height="imgHeight" />
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0" v-if="course.title">{{ course.title }}</h3>
        <p v-if="course.teaser">{{ course.teaser }}</p>
        <p v-else>{{ $t('general.no_teaser') }}</p>
      </div>
    </v-card-title>
    <!--<v-card-text>
        </v-card-text>-->
    <v-card-actions>
      <template v-if="admin">
        <v-tooltip bottom>
          <v-btn
             flat
             icon
             color="indigo"
             slot="activator"
             :to="`/admin/courses/${course.id}`"
             v-if="admin">
            <v-icon>view_module</v-icon>
          </v-btn>
          <span>{{ $t('general.nav.view') }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn
             flat
             icon
             color="deep-orange"
             slot="activator"
             :to="`/admin/courses/edit/${course.id}`"
             >
            <v-icon>edit</v-icon>
          </v-btn>
          <span>{{ $t('general.nav.edit') }}</span>
        </v-tooltip>
        <v-spacer/>
        <v-tooltip bottom>
          <v-btn
             flat
             icon
             color="red"
             slot="activator"
             @click=""
             >
            <v-icon>delete</v-icon>
          </v-btn>
          <span>{{ $t('general.nav.delete') }}</span>
        </v-tooltip>
      </template>
      <template v-else>
        <v-btn flat
               color="indigo"
               :to="`/courses/${course.slug}`">
          {{ $t('course.nav.student.go') }}
        </v-btn>
        <v-btn
           flat
           color="deep-orange">
          {{ $t('course.nav.student.test') }}
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 't-course-card',
  props: {
    course: Object,
    imgSrc: String,
    imgHeight: String,
    color: String,
    admin: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
