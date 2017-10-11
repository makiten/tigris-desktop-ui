export default {
  'language': '言葉',
  'lang': '日本語',
  'settings': {
    'account_type': 'アカウントタイプ',
    'account_id': 'アカウントID',
    'cancel': '定期購読解除',
    'courses': 'コース個数',
    'expires': '予約購読期限の日付け',
    'location': 'アドレス',
    'name': '登録会社',
    'protocol': 'プロトコル',
    'users': 'ユーザー人数'
  },
  'statuses': {
    'dev': '開発中',
    'test': 'テスト中',
    'prod': 'プロダクション中'
  },
  'user': {
    'table': {
      'name': 'Full Name',
      'format': '{lastname}{firstname}',
      'username': 'Username',
      'email': 'Email Address',
      'created': 'Created On',
      'roles': 'Roles'
    },
    'title': 'User Activity',
    'allCols': 'All Columns',
    'search': 'Search',
    'types': {
      'enrollment': 'Enrollment',
      'test': 'Test'
    },
    'descriptions': {
      'completed': '{name} <strong>completed</strong> {course}.',
      'registered': '{name} <strong>registered for</strong> {course}.',
      'test': '{name} <strong>scored {score}</strong> on test for {course}.'
    },
    'columns': {
      'type': 'Type of Action',
      'timestamp': 'Date',
      'moment': 'How Long Ago?',
      'description': 'Description'
    },
    'messages': {
      'no_data': '<i>warning</i> No data available to show.',
      'no_data_after_filtering': '<i>warning</i>No results. Please refine your search terms.'
    }
  },
  'buttons': {
    'add': '{n}を作る',
    'cancel': 'キャンセル',
    'close': '閉じる',
    'draft': '下書きのコースをセーブ',
    'delete': '{item}を削除',
    'edit': '{item}を変更',
    'publish': '発売',
    'reset_password': 'パスワード再設定',
    'save': 'セーブする'
  },
  'result': {
    'success': {
      'icon': 'highlight_off',
      'class': 'text-red-9'
    },
    'failure': {
      'icon': 'clear',
      'class': 'text-blue-10'
    }
  },
  'coming_soon': '製作中',
  'header': {
    'nav': {
      'admin': 'アドミン設',
      'account': 'アカウント',
      'login': 'ログイン',
      'logout': 'ログアウト',
      'about': {
        'label': 'Tigrisについて',
        'close': '閉じる',
        'message': '2017年7月にリリースされたTigrisのバージョンは1.0です。 &copy; Jogral, LLC.'
      },
      'license': {
        'label': 'ライセンス',
        'message': ''
      },
      'privacy': {
        'label': 'プライバシー・ポリシー',
        'message': ''
      },
      'terms': {
        'label': 'ご利用規約',
        'message': ''
      },
      'tooltips': {
        'course': 'コース',
        'dashboard': 'ダッシュボード',
        'more': 'ナビゲーション',
        'notifications': {
          'label': 'お知らせ',
          'empty_message': 'お知らせなし'
        },
        'toc': '目次'
      }
    }
  },
  'content': {
    'search': {
      'label': 'コースを検索',
      'results': '検索結果',
      'no_results': '検索結果なし。'
    },
    'admin': {
      'tabs': {
        'settings': '設定',
        'courses': 'コース',
        'customization': 'カスタム化',
        'users': 'ユーザーとグループ'
      },
      'accordions': {
        'courses': {
          'add': {
            'label': 'コース作成',
            'content': 'UIでコースを作るあるいはコースのアーカイブをアップロードする。',
            'upload': {
              'button': 'コースアップロード',
              'info': 'コースファイルをアップロード。共通フォーマットがZIPとTAR。'
            },
            'button': '作る'
          },
          'delete': {
            'label': 'コース削除',
            'content': 'コースリストからコース削除。'
          },
          'edit': {
            'label': 'コース操作',
            'content': '作ったコースの変更と削除。'
          }
        },
        'customization': {
          'colors': {
            'label': 'カラー',
            'content': 'Tigrisのカラースキーム変更'
          },
          'logo': {
            'label': 'ロゴ',
            'content': '会社のロゴを変更。'
          }
        },
        'settings': {
          'account': {
            'label': 'アカウント',
            'content': '会社についての明細。'
          },
          'api': {
            'label': 'API',
            'content': 'API'
          },
          'security': {
            'label': 'セキュリティ',
            'content': '全部の会社でセキュリティ設定を変更する。'
          }
        },
        'users': {
          'permissions': {
            'label': '許可',
            'content': ''
          },
          'roles': {
            'label': 'グループ',
            'content': ''
          },
          'users': {
            'label': 'ユーザー',
            'content': ''
          }
        }
      },
      'course': {
        'detail': {
          'form': {
            'buttons': {
              'save': 'セーブする',
              'quit': 'セーブして終了',
              'add_modules': 'セーブして続ける'
            },
            'title': {
              'name': 'コースタイトル',
              'placeholder': 'マイ・ニュー・コース',
              'info': 'コースの題名。',
              'errors': {
                'required': 'タイトルは必須入力。',
                'minLength': 'タイトルは5字以上の文字が必要。'
              }
            },
            'description': {
              'name': '簡単な記述',
              'placeholder': '楽しいコースを学ぼう！',
              'info': 'コースの簡単な説明するのはこちら',
              'errors': {
                'required': '記述は必須入力。'
              }
            },
            'long_description': {
              'name': '詳しい記述',
              'placeholder': '詳細のためにコースの詳しい説明',
              'info': 'こちらはコースの詳しい説明のフィールド。'
            },
            'slug': {
              'name': 'URLのためのパーマーリンク（スラッグ）',
              'placeholder': 'my-new-course',
              'info': 'ここはコースのURL。例：<code>friendly-course-title</code>',
              'errors': {
                'required': 'スラッグは必須入力。',
                'isUnique': 'このスラッグがすでに存在。'
              }
            },
            'status': {
              'name': '',
              'info': ''
            },
            'tags': {
              'name': 'タッグ',
              'info': 'コースの検索語。'
            },
            'thumbnail': {
              'name': 'サムネイル',
              'info': 'タイトルの上のコースリストに表示するイメージ。<strong>（共通フォーマット：.gif、.jpgまたは.jpeg、.png）</strong>'
            }
          },
          'edit': {
            'heading': '『{n}』編集'
          },
          'new': {
            'heading': 'コース作成'
          }
        },
        'toasts': {
          'positive': '{c}というコースを削除しました。',
          'negative': '残念ですが、{c}の削除中のエラー。'
        }
      },
      'module': {
        'detail': {
          'form': {
            'buttons': {
              'save': 'セーブする',
              'quit': 'セーブして終了',
              'add_modules': 'セーブして続ける'
            },
            'title': {
              'name': 'モデュールタイトル',
              'placeholder': 'マイ・ニュー・モデュール',
              'info': 'コースのモデュールの題名。',
              'errors': {
                'required': 'モデュールタイトルは必須入力。',
                'minLength': 'モデュールタイトルは5字以上の文字が必要。'
              }
            },
            'description': {
              'name': '記述',
              'placeholder': '楽しいモデュールで勉強しましょう！',
              'info': 'モデュールの簡単な説明するのはこちら。',
              'errors': {
                'required': '記述は必須入力。'
              }
            },
            'content': {
              'name': 'コンテンツ',
              'placeholder': 'モデュールのレッスンのコンテンツ。',
              'info': 'ここには、レッスンのコンテンツを教えるモデュール。　イメージ、ビデオなど組み込んでもいいです。'
            },
            'slug': {
              'name': 'URLスラッグ',
              'placeholder': 'my-new-course',
              'info': 'ここにはURLフィールド。例：<code>friendly-course-title</code>',
              'errors': {
                'required': 'URLスラッグは必須入力。',
                'isUnique': 'URLスラッグはすでに存在します。'
              }
            }
          },
          'edit': {
            'heading': '{n}の変更'
          },
          'list': {
            'heading': 'モデュール'
          },
          'new': {
            'heading': '新しいモデュールを作る'
          },
          'toasts': {
            'positive': '{m}というモデュールが変更しました。',
            'negative': '{m}の変更エラー。'
          }
        },
        'list': {
          'buttons': {
            'delete': '削除',
            'edit': '変更'
          },
          'empty': 'モデュールなし',
          'heading': 'モデュールリスト'
        }
      },
      'role': {
        'headings': {
          'edit': '{g}の変更',
          'new': 'グループを作る'
        },
        'form': {
          'button': 'グループを作る',
          'title': {
            'label': 'ネーム',
            'info': 'グループネーム。',
            'placeholder': 'マイ・ニュー・グループ',
            'errors': {
              'required': 'ネームは必須入力。'
            }
          },
          'description': {
            'label': '記述',
            'info': 'グループの記述。',
            'placeholder': 'すごいグループです。'
          },
          'permissions': {
            'label': '許可',
            'info': 'グループの許可。',
            'errors': {
              'required': '1つ以上の許可が必要。'
            }
          }
        },
        'toasts': {
          'positive': '{n}のグループは首尾よく作りました。',
          'negative': 'グループを作ることのエラー。'
        }
      },
      'user': {
        'edit': {
          'heading': '{n}の変更',
          'form': {
            'shortname': {
              'errors': {
                'isUnique': 'ユーザーネームはすでに存在する。'
              },
              'name': 'ユーザーネーム',
              'placeholder': 'username'
            },
            'password': {
              'errors': {
                'minLength': 'パスワードは8字以上の文字が必要。'
              },
              'name': 'パスワード',
              'placeholder': 'p@ssw0rd'
            }
          }
        },
        'new': {
          'heading': 'ユーザー作成',
          'invite': {
            'subject': 'Tigrisのユーザーの登録',
            'message': '<p>Tigrisで学ぶことに参加よう勧められました。ここはユーザー確認のリンク<a href="{url}/verify/{token}">{url}/verify/{token}</a>。</p>'
          },
          'form': {
            'button': 'ユーザーを作る',
            'email': {
              'errors': {
                'required': 'Eメールアドレスは必須入力。',
                'email': 'Eメールアドレスは無効。'
              },
              'info': 'アカウント作成確認を送るEメールアドレス。',
              'name': 'ユーザーのEメールアドレス',
              'placeholder': 'email@your.ne.jp'
            },
            'group': {
              'name': 'グループ',
              'info': 'このユーザーはどんなグループ？'
            }
          },
          'toasts': {
            'positive': '{e}にユーザーの誘いを送りました。',
            'negative': '{e}にユーザーの誘いを送るのは失敗。'
          }
        }
      }
    },
    'courses': {
      'card': {
        'buttons': {
          'go_to_class': 'レッスンへ行く',
          'test_out': '修了する',
          'repeat_go_to_class': 'コースをやり直す',
          'repeat_test_out': '再修了する'
        }
      },
      'detail': {
        'buttons': {
          'continue': '続ける',
          'return': '戻る'
        },
        'info': {
          'duration': '{n}時間',
          'estimated_duration': '推定終了時間：　',
          'presenter': '講演者：　',
          'terms_used': '関連用語：　'
        }
      },
      'done': {
        'content': 'コース終了についておめでとうございます！今は続けて新しいコースする。',
        'position': {
          'message': 'おめでとう！コースは修了出来ました！勉強を続いて、{link}。',
          'new_course': '他のコースを受けましょう'
        },
        'repeat': {
          'message': 'コースのコンテンツへ戻りたいですか？{link}へ行ってください。',
          'toc': '目次'
        },
        'return': {
          'message': 'または{link}へ戻る。',
          'link': 'コースリスト'
        }
      },
      'exam': {
        'label': '試験',
        'buttons': {
          'finish': '試験を終了',
          'next': '次の質問',
          'prev': '前の質問',
          'repeat': '再び試験する'
        },
        'results': {
          'heading': '成績書',
          'score': '成績は<strong class="{class}">{n}％</strong>。',
          'question': '質問：',
          'answers': {
            'yours': '答え：',
            'correct': '正答：'
          }
        },
        'shortcut': 'ショートカット：'
      },
      'list': {
        'headings': {
          'all': '全部のコース',
          'page': 'コースリスト'
        }
      },
      'module': {
        'actions': {
          'read': 'モデュールを読む',
          'quiz': 'クイズを受ける'
        },
        'quiz': {
          'buttons': {
            'close': '閉じる',
            'submit': '提出する'
          },
          'headings': {
            'correct': 'その通りです！',
            'incorrect': '残念ですが…'
          },
          'types': {
            'fitb': {
              'instructions': '下記のフィールドに正確を入力してください。',
              'placeholder': '答えのフィールド',
              'question': '質問'
            },
            'ma': {
              'instructions': '質問に全ての最も良い答えを選択してください。'
            },
            'mc': {
              'instructions': 'この質問に最も良い答えを選択してください。'
            }
          }
        },
        'status': {
          'module': '現在コースは{title}。現在モデュールは{module}です。',
          'quiz': '現在コースは{title}。クイズ中です。'
        }
      }
    },
    'dashboard': {
      'welcome': 'アカウント・ダッシュボードへようこそ！このページには、通行中、修了コースがあります。それに更新のお知らせもあります。',
      'in_progress': '通行中コース',
      'empty': 'コースなし',
      'completed': '修了コース',
      'register': 'コースを検索',
      'headings': {
        'greeting': {
          'with_name': 'こんにちは、{name}',
          'without_name': 'こんにちは'
        },
        'your_list': 'コースリスト',
        'recommended_list': '推奨コース'
      }
    },
    'modals': {
      'account': {
        'buttons': {
          'close': 'セーブせずに閉じる',
          'save': 'セーブして閉じる'
        },
        'label': 'アカウント',
        'profile': {
          'tab': 'プロフィール',
          'form': {
            'heading': '個人情報',
            'buttons': {
              'save': 'セーブする',
              'upload': 'アップロード'
            },
            'fields': {
              'first_name': '名前',
              'last_name': '姓',
              'shortname': 'ユーザーネーム',
              'email': 'Eメールアドレス',
              'avatar': 'アバターをアップロード'
            },
            'toast': {
              'success': '変更しました！',
              'failure': '残念ですが、アカウントがセーブされませんでした。'
            }
          }
        },
        'settings': {
          'tab': '設定',
          'forms': {
            'password': {
              'button': '変更',
              'heading': 'パスワードを変更',
              'fields': {
                'password1': {
                  'label': '新パスワード',
                  'error': {
                    'required': 'パスワードは必須入力。',
                    'minLength': 'パスワードは8字以上の文字が必要。'
                  }
                },
                'password2': {
                  'label': 'パスワード確認',
                  'error': {
                    'sameAs': 'パスワードとパスワード確認のフィールドは同一のことが必要。'
                  }
                }
              }
            },
            'username': {
              'button': '変更',
              'heading': 'ユーザーネームの入力',
              'fields': {
                'shortname': 'ユーザーネーム'
              }
            }
          },
          'toast': {
            'success': 'アカウントを変更しました！',
            'failure': '残念ですが、アカウントが変更されませんでした。'
          }
        }
      },
      'notifications': {
        'title': 'お知らせ',
        'buttons': {
          'close': '閉じる'
        },
        'labels': {
          'untitled': '無題',
          'count': '{n}件',
          'notifications': '{0}のお知らせ'
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
      'error': 'ユーザーネームかパスワードは無効です。もう一度お願いします。',
      'password': {
        'required': 'パスワードは必須入力。',
        'minLength': 'パスワードは8字以上の文字が必要。'
      },
      'username': {
        'required': 'ユーザーネームは必須入力。'
      }
    },
    'labels': {
      'login': 'ログイン',
      'heading': 'Tigris Learningにログイン',
      'username': 'ユーザーネーム',
      'password': 'パスワード',
      'sso': {
        'heading': '{company}の社員？',
        'instructions': '{company}での社員またはシングルサインオンのユーザーだったら、下のボタンをクリックしてください。',
        'login': 'シングルサインオンでのログイン',
        'switch': 'シングルサインオンのユーザーじゃなかったら、ここをクリックしてください。'
      }
    }
  },
  'logout': {
    'labels': {
      'heading': 'Tigrisでログアウトしました。'
    }
  },
  'verify': {
    'heading': 'コードが確認しました！新しいパスワードを入力してください。',
    'instructions': 'パスワードは8字以上の文字が必要。どんなキーを入力できる。',
    'errors': {
      'no_token': '確認コードなし。',
      'expired': '確認コードが期限切れとなりました。',
      'invalid': '確認コードは無効。',
      'validated': '確認コードがすでに確認されました。'
    }
  }
}
