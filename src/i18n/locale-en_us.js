export default {
  'language': 'Language',
  'lang': 'English (US)',
  'settings': {
    'account_type': 'Account Type',
    'account_id': 'Account ID',
    'cancel': 'Cancel Subscription',
    'courses': 'Number of Courses',
    'environment': 'Environment',
    'expires': 'Good until',
    'location': 'Location',
    'name': 'Registered to',
    'protocol': 'Protocol',
    'users': 'Number of Users'
  },
  'enviroments': {
    'dev': 'Development',
    'test': 'Test',
    'prod': 'Production'
  },
  'assessments': {
    'answer': {
      'heading': 'What Kind of Answer?',
      'label': 'Answer',
      'placeholder': 'An answer.',
      'types': {
        'label': 'Number of Answers',
        'fitb': 'Fill-in-the-Blank',
        'ma': 'Multiple Answer',
        'mc': 'Multiple Choice'
      }
    },
    'message': {
      'labels': {
        'correct': 'Popup Message (Correct)',
        'incorrect': 'Popup Message (Incorrect)'
      },
      'placeholder': 'Your answer is correct!'
    },
    'messages': {
      'correct': {
        'heading': 'That\'s Right!',
        'message': ''
      },
      'incorrect': {
        'heading': 'Sorry...',
        'message': ''
      }
    },
    'question': {
      'fitb': 'Type the statement, and use <code>[input]</code> where the blank should go. For example, "The Battle of the [input] took place in San Antonio."',
      'heading': 'Type Your Question',
      'placeholder': 'What is it a horrible night for?'
    },
    'table': {
      'answer': 'Answer',
      'correct': 'Correct?',
      'message': 'Popup Message'
    },
    'types': {
      'quiz': 'Quiz',
      'test': 'Exam'
    }
  },
  'buttons': {
    'add': 'Add {n}',
    'cancel': 'Cancel{item}',
    'close': 'Close',
    'draft': 'Save as Draft',
    'delete': 'Delete{item}',
    'edit': 'Edit{item}',
    'publish': 'Publish',
    'reset_password': 'Reset Password',
    'save': 'Save'
  },
  'forgot_password': {
    'error': 'Email address is not valid.',
    'heading': 'Enter your Email Address',
    'instructions': 'Please put in the email address associated with your account.',
    'result': 'Okay! We\'ll send reset instructions to that email!',
    'email_message': {
      'subject': 'Reset Your Password',
      'body': '<p>Someone has requested a password reset to your account. If you initiated this request, you can do so at <a href="{url}/reset-password/[token]">{url}/reset-password/[token]</a>. This link will expire after 8 hours.</p>' +
              '<p>If you did <em>not</em> initiate this request, change your password immediately.</p>'
    }
  },
  'labels': {
    'email': 'Email Address',
    'questions': 'Number of Questions:',
    'quiz': 'Quiz ::: Quizzes',
    'module': 'Module ::: Modules',
    'roles': 'Group ::: Groups',
    'test': 'Exam ::: Exams'
  },
  'result': {
    'success': {
      'icon': 'check_circle',
      'class': 'text-green-10',
      'message': 'Success!'
    },
    'failure': {
      'icon': 'highlight_off',
      'class': 'text-red-9',
      'message': 'Uh oh! Something went wrong!'
    }
  },
  'coming_soon': 'Coming soon!',
  'header': {
    'nav': {
      'admin': 'Admin Panel',
      'account': 'My Account',
      'login': 'Login',
      'logout': 'Logout',
      'about': {
        'label': 'About Tigris',
        'close': 'Close',
        'message': 'This is version 1.0, released July 2017. &copy; Jogral, LLC.'
      },
      'license': {
        'label': 'License',
        'message': ''
      },
      'privacy': {
        'label': 'Privacy Policy',
        'message': ''
      },
      'terms': {
        'label': 'Terms of Service',
        'message': ''
      },
      'tooltips': {
        'course': 'Courses',
        'dashboard': 'Dashboard',
        'more': 'Navigation',
        'notifications': {
          'label': 'Notifications',
          'empty_message': 'No new notifcations'
        },
        'toc': 'Table of Contents'
      }
    }
  },
  'content': {
    'search': {
      'label': 'Search for courses',
      'results': 'Search Results',
      'no_results': 'No results.'
    },
    'admin': {
      'tabs': {
        'courses': 'Courses',
        'customization': 'Customization',
        'settings': 'Settings',
        'users': 'Users & Groups'
      },
      'accordions': {
        'courses': {
          'add': {
            'label': 'Add a New Course',
            'content': 'Create a new course using our UI or upload an archive of a class file.',
            'upload': {
              'button': 'Upload Course',
              'info': 'Upload an archive of a course. ZIP and TAR accepted.'
            },
            'button': 'Add Course'
          },
          'delete': {
            'label': 'Remove Course',
            'content': 'Remove courses from the list.'
          },
          'edit': {
            'label': 'Manage Courses',
            'content': 'Update or delete courses already created.'
          }
        },
        'customization': {
          'colors': {
            'label': 'Colors',
            'content': 'Change the color scheme for Tigris.'
          },
          'logo': {
            'label': 'Logo',
            'content': 'Change the logo you want associated with your organization.'
          }
        },
        'settings': {
          'account': {
            'label': 'Account',
            'content': 'Details on the organization.'
          },
          'api': {
            'label': 'API',
            'content': 'API Settings'
          },
          'security': {
            'label': 'Security',
            'content': 'Change security settings across the organization.'
          }
        },
        'users': {
          'permissions': {
            'label': 'Permissions',
            'content': ''
          },
          'roles': {
            'label': 'Groups',
            'content': ''
          },
          'users': {
            'label': 'Users',
            'content': ''
          }
        }
      },
      'course': {
        'detail': {
          'form': {
            'buttons': {
              'save': 'Save',
              'quit': 'Save & Quit',
              'add_modules': 'Save & Continue'
            },
            'title': {
              'name': 'Course Title',
              'placeholder': 'My New Course',
              'info': 'What do you want to call the course?',
              'errors': {
                'required': 'Title is required.',
                'minLength': 'Title field requires at least 5 characters.'
              }
            },
            'description': {
              'name': 'Short Description.',
              'placeholder': 'Learn why new courses are fun.',
              'info': 'Give a really short description of the course.',
              'errors': {
                'required': 'Description is required.'
              }
            },
            'long_description': {
              'name': 'Long Description.',
              'placeholder': 'A longer description for when you want more detail.',
              'info': 'This description gives a little more detail for those ready to add the course.'
            },
            'slug': {
              'name': 'URL-Friendly Permalink',
              'placeholder': 'my-new-course',
              'info': 'This will be your URL. Something like <code>friendly-course-title</code>',
              'errors': {
                'required': 'Permalink is required.',
                'isUnique': 'Permalink already exists.'
              }
            },
            'status': {
              'name': '',
              'info': ''
            },
            'tags': {
              'name': 'Tags',
              'info': 'Some terms to search the course by.'
            },
            'thumbnail': {
              'name': 'Thumbnail',
              'info': 'This will show up on the course list above the title. <strong>(Accepted: .gif, .jpg/.jpeg, and .png)</strong>'
            }
          },
          'edit': {
            'heading': 'Edit {n}'
          },
          'new': {
            'heading': 'Add New Course'
          }
        },
        'toasts': {
          'positive': 'Successfully deleted {c}.',
          'negative': 'Failed to delete {c}.'
        }
      },
      'module': {
        'detail': {
          'form': {
            'buttons': {
              'save': 'Save',
              'quit': 'Save & Quit',
              'add_modules': 'Save & Continue'
            },
            'title': {
              'name': 'Module Title',
              'placeholder': 'My New Module',
              'info': 'What do you want to call the module?',
              'errors': {
                'required': 'Title is required.',
                'minLength': 'Title field requires at least 5 characters.'
              }
            },
            'description': {
              'name': 'Description.',
              'placeholder': 'Learn why this module is fun.',
              'info': 'Give a really short description of the module.',
              'errors': {
                'required': 'Description is required.'
              }
            },
            'content': {
              'name': 'Content',
              'placeholder': 'Content for the module\'s lesson.',
              'info': 'This is where students will be learning about your module. Include images, videos&mdash;whatever your wish!'
            },
            'slug': {
              'name': 'URL-Friendly Permalink',
              'placeholder': 'my-new-module',
              'info': 'This will be your URL. Something like <code>friendly-module-title</code>',
              'errors': {
                'required': 'Permalink is required.',
                'isUnique': 'Permalink already exists.'
              }
            }
          },
          'edit': {
            'heading': 'Edit {n}'
          },
          'list': {
            'heading': 'View Modules'
          },
          'new': {
            'heading': 'Add New Module'
          },
          'toasts': {
            'positive': 'Module "{m}" updated.',
            'negative': 'Error updating module "{m}".'
          }
        },
        'list': {
          'buttons': {
            'delete': 'Remove',
            'edit': 'Edit'
          },
          'empty': 'No modules.',
          'heading': 'View Modules'
        }
      },
      'role': {
        'headings': {
          'edit': 'Edit {g}',
          'new': 'Add a Group'
        },
        'form': {
          'button': 'Add Group',
          'title': {
            'label': 'Name',
            'info': 'A name for the group.',
            'placeholder': 'My New Group',
            'errors': {
              'required': 'Name is required.'
            }
          },
          'description': {
            'label': 'Description',
            'info': 'A short description of the group.',
            'placeholder': 'A cool group.'
          },
          'permissions': {
            'label': 'Permissions',
            'info': 'Group privileges.',
            'errors': {
              'required': 'At least one permission is required.'
            }
          }
        },
        'toasts': {
          'positive': 'Successfully added group {n}.',
          'negative': 'An error occurred adding group.'
        }
      },
      'user': {
        'edit': {
          'heading': 'Edit {n}',
          'form': {
            'shortname': {
              'errors': {
                'isUnique': 'Username already exists.'
              },
              'name': 'Username',
              'placeholder': 'username'
            },
            'password': {
              'errors': {
                'minLength': 'Password must be a minimum of 8 characters.'
              },
              'name': 'Password',
              'placeholder': 'p@ssw0rd'
            }
          }
        },
        'new': {
          'heading': 'Add New User',
          'invite': {
            'subject': 'Tigris User Registration',
            'message': '<p>You have been invited to learn on Tigris. Use this URL to activate your account: <a href="{url}/verify/{token}">{url}/verify/{token}</a></p>'
          },
          'form': {
            'button': 'Add User',
            'email': {
              'errors': {
                'required': 'Email is required.',
                'email': 'Email address is not valid.'
              },
              'info': 'So we know where to send the confirmation.',
              'name': 'User\'s Email Address',
              'placeholder': 'email@your.org'
            },
            'group': {
              'name': 'Group',
              'info': 'What kind of user is this?'
            }
          },
          'toasts': {
            'positive': 'Invite sent to {e}.',
            'negative': 'Failed to send invite to {e}.'
          }
        }
      }
    },
    'courses': {
      'card': {
        'buttons': {
          'go_to_class': 'Go to Class',
          'test_out': 'Test Out',
          'repeat_go_to_class': 'Repeat Class',
          'repeat_test_out': 'Re-take Test'
        }
      },
      'detail': {
        'buttons': {
          'continue': 'Continue',
          'return': 'Return'
        },
        'info': {
          'duration': '{n} hour ::: {n} hours',
          'estimated_duration': 'Estimated',
          'presenter': 'Presented by ',
          'terms_used': 'Terms used: '
        }
      },
      'done': {
        'content': 'Congratulations on finishing the course. Continue on, and find something new to learn!',
        'position': {
          'message': 'Great job! Now, let\'s continue our studies and {link}!',
          'new_course': 'take another course'
        },
        'repeat': {
          'message': 'Want to go back to the course content? Go to {link}.',
          'toc': 'the Table of Contents'
        },
        'return': {
          'message': 'Go back to {link}.',
          'link': 'our course selection'
        }
      },
      'exam': {
        'label': 'Exam',
        'buttons': {
          'finish': 'Submit Test',
          'next': 'Next Question',
          'prev': 'Previous Question',
          'repeat': 'Repeat Exam'
        },
        'results': {
          'heading': 'Exam Results',
          'score': 'Your score is <strong class="{class}">{n}%</strong>.',
          'question': 'Question:',
          'answers': {
            'yours': 'Your Answer:',
            'correct': 'Correct Answer:'
          }
        },
        'shortcut': 'Shortcut: '
      },
      'list': {
        'headings': {
          'all': 'All Courses',
          'page': 'Courses'
        }
      },
      'module': {
        'actions': {
          'read': 'Read the Module',
          'quiz': 'Take the Quiz'
        },
        'quiz': {
          'buttons': {
            'close': 'Close',
            'submit': 'Submit'
          },
          'headings': {
            'correct': 'That\'s Right!',
            'incorrect': 'Sorry...'
          },
          'types': {
            'fitb': {
              'instructions': 'Fill in the blank with the correct answer.',
              'placeholder': 'fill in your answer',
              'question': 'Question'
            },
            'ma': {
              'instructions': 'Select the all correct answers to this question.'
            },
            'mc': {
              'instructions': 'Select the best answer to this question.'
            }
          }
        },
        'status': {
          'module': 'You are in the course {title}, on the section {module}.',
          'quiz': 'You are in the course {title}, taking the quiz.'
        }
      }
    },
    'dashboard': {
      'welcome': 'Welcome to your dashboard. Here you will find courses in progress and completed, as well as notifications on what\'s new.',
      'empty': 'No courses.',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'register': 'View Courses',
      'headings': {
        'greeting': {
          'with_name': 'Hello, {name}',
          'without_name': 'Hello'
        },
        'your_list': 'Your Courseload',
        'recommended_list': 'Recommended Courses'
      }
    },
    'modals': {
      'account': {
        'buttons': {
          'close': 'Close Without Saving',
          'save': 'Save and Close'
        },
        'label': 'My Account',
        'profile': {
          'tab': 'Profile',
          'form': {
            'heading': 'Personal Information',
            'buttons': {
              'save': 'Save',
              'upload': 'Upload'
            },
            'fields': {
              'first_name': 'First Name',
              'last_name': 'Last Name',
              'shortname': 'Username',
              'email': 'E-mail Address',
              'avatar': 'Upload a Personal Avatar'
            },
            'toast': {
              'success': 'Successfully saved account.',
              'failure': 'Could not update account.'
            }
          }
        },
        'settings': {
          'tab': 'Settings',
          'forms': {
            'password': {
              'button': 'Change',
              'heading': 'Change Password',
              'fields': {
                'password1': {
                  'label': 'New Password',
                  'error': {
                    'required': 'Password is required.',
                    'minLength': 'Password must be a minimum of 8 characters.'
                  }
                },
                'password2': {
                  'label': 'Confirm New Password',
                  'error': {
                    'sameAs': 'Passwords must match.'
                  }
                }
              }
            },
            'username': {
              'button': 'Update',
              'heading': 'Set Username',
              'fields': {
                'shortname': 'Username'
              }
            }
          },
          'toast': {
            'success': 'Successfully updated account.',
            'failure': 'Could not update account.'
          }
        }
      },
      'notifications': {
        'title': 'Notifications',
        'buttons': {
          'close': 'Close'
        },
        'labels': {
          'untitled': 'Untitled',
          'count': '{n} notification ::: {n} notifications',
          'notifications': 'You have {0}.'
        },
        'toast': {
          'success': '',
          'failure': ''
        }
      }
    }
  },
  'login': {
    'errors': {
      'error': 'Your username or password was invalid. Please try another login.',
      'password': {
        'required': 'Password is required.',
        'minLength': 'Password must be a minimum of 8 characters.'
      },
      'username': {
        'required': 'Your username is required.'
      }
    },
    'labels': {
      'login': 'Login',
      'heading': 'Login to Tigris Learning',
      'forgot': 'Forgot your password?',
      'username': 'Username',
      'password': 'Password',
      'sso': {
        'heading': 'Part of {company}?',
        'instructions': 'If you\'re an employee or single sign-on user of {company}, please click the button below.',
        'login': 'Login via Single Sign-on',
        'switch': 'Don\'t have a single sign-on account? Click here to login.'
      }
    }
  },
  'logout': {
    'labels': {
      'heading': 'You\'ve logged out from Tigris Learning'
    }
  },
  'reset_password': {
    'heading': 'Reset Your Password',
    'instructions': 'Please input your new password.'
  },
  'verify': {
    'heading': 'Email Address confirmed! Now, set your password.',
    'instructions': 'Your password must be at least 8 characters. Any combination of characters are permitted.',
    'errors': {
      'no_token': 'You have nothing to confirm.',
      'expired': 'Your confirmation token has expired.',
      'invalid': 'Your confirmation token is invalid.',
      'validated': 'You have already confirmed your account.'
    }
  }
}
