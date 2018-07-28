export default {
  name: 'English (US)',
  admin: {
    home: 'Home',
    courses: {},
    settings: {},
    users: {}
  },
  dash: {
    courseload: 'Your Courseload',
    recommended: 'Try These Other Courses'
  },
  home: {
    name: 'Home',
    title: 'Welcome'
  },
  course: {
    nav: {
      admin: {
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        view: 'View'
      },
      student: {
        go: 'Go to Class',
        test: 'Test Out'
      }
    },
    name: 'Courses',
    buttons: {
      add: 'Save and Create',
      cancel: 'Cancel',
      draft: 'Save as Draft',
      edit: 'Save'
    },
    forms: {
      add_edit: {
        title: {
          name: 'Course Title',
          placeholder: 'My New Course',
          info: 'What do you want to call the course?',
          validation: {
            required: 'Title is required.',
            minLength: 'Title field requires at least 5 characters.'
          }
        },
        description: {
          name: 'Short Description.',
          placeholder: 'Learn why new courses are fun.',
          info: 'Give a really short description of the course.',
          errors: {
            required: 'Description is required.'
          }
        },
        long_description: {
          name: 'Detailed Description',
          placeholder: 'A longer description for when you want more detail.',
          info: 'This description gives a little more detail for those ready to add the course.',
          validation: {
            required: 'A detailed description is required.'
          }
        },
        slug: {
          name: 'URL-Friendly Permalink',
          placeholder: 'my-new-course',
          info: 'This will be your URL. Something like <code>friendly-course-title</code>.',
          validation: {
            required: 'Permalink is required.',
            isUnique: 'Permalink already exists.'
          }
        },
        status: {},
        tags: {
          name: 'Tags',
          placeholder: '',
          info: 'Some terms to search the course by.'
        },
        thumbnail: {
          name: 'Thumbnail',
          placeholder: '',
          info: 'This will show up on the course list above the title. <strong>(Accepted: .gif, .jpg/.jpeg, and .png)</strong>'
        }
      }
    },
    module: {
      list: 'List of Modules',
      not_found: 'Module not found.',
      view: {
        module: 'View the Module',
        quiz: 'Take the Quiz'
      },
      current_position: {
        module: 'You are in the course {title}, on the section {module}.',
        quiz: 'You are in the course {title}, taking the quiz.'
      }
    },
    not_found: 'Course not found.',
    tags: 'Tags:',
    toc: 'Table of Contents'
  },
  users: {
    name: 'Users'
  },
  general: {
    logout: 'Log out',
    profile: 'Profile',
    settings: 'Settings',
    status: {
      deleted: 'Deleted',
      unpublished: 'Unpublished',
      published: 'Published'
    },
    no_teaser: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    form: {
      send: 'Send',
      close: 'Close without Saving'
    },
    notes: 'Notes'
  },
  assessment: {
    fitb: {
      question: 'Type the statement, and use <code>[input]</code> where the blank should go. For example, "The Battle of the [input] took place in San Antonio."',
      answer: 'Answer',
      instructions: 'Fill in the blank with the correct answer.'
    },
    ma: {
      instructions: 'Select the all correct answers to this question.'
    },
    mc: {
      instructions: 'Select the best answer to this question.'
    }
  }
}
