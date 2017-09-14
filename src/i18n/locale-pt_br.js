export default {
  'lang': 'Português (Brasileiro)',
  'assessments': {
    'answer': {
      'heading': 'Qual Tipo de Resposta?',
      'label': 'Resposta',
      'placeholder': 'Uma resposta.',
      'types': {
        'label': 'Número de Respostas',
        'fitb': 'Campo em branco',
        'ma': 'Resposta Múltipla',
        'mc': 'Escolha Múltipla'
      }
    },
    'message': {
      'labels': {
        'correct': 'Mensagem de Diálogo (Resposta Correta)',
        'incorrect': 'Mensagem de Diálogo (Resposta Incorreta)'
      },
      'placeholder': 'Sua resposta é correta!'
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
      'fitb': 'Digite a oração e use <code>[input]</code> no lugar do campo. Por exemplo, "A Luta do [input] occoreu em San Antonio."',
      'heading': 'Digite Sua Pergunta',
      'placeholder': 'O que faz ela uma noite horrível?'
    },
    'table': {
      'answer': 'Resposta',
      'correct': 'Correto?',
      'message': 'Mensagem de Diálogo'
    },
    'types': {
      'quiz': 'Teste',
      'test': 'Exame'
    }
  },
  'buttons': {
    'add': 'Adicionar {n}',
    'cancel': 'Cancelar',
    'draft': 'Salvar como Rascunho',
    'delete': 'Apagar{item}',
    'edit': 'Editar{item}',
    'publish': 'Publicar',
    'reset_password': 'Reiniciar a Senha',
    'save': 'Salvar'
  },
  'forgot_password': {
    'error': 'O email não é válido.',
    'heading': 'Entre o Endereço de Email',
    'instructions': 'Por favor coloque o endereço de email ligado a sua conta.',
    'result': 'Com certeza! Nós vamos mandar as instruções de reinício da sua conta para esse email!',
    'email_message': {
      'subject': 'Reiniciar a sua Senha',
      'body': '<p>Se pede o reinício da sua conta. Se você fiz esse pedido, favor reinicie sua conta em <a href="{url}/reset-password/[token]">{url}/reset-password/[token]</a>. Este link vai terminar daqui 8 horas.</p>' +
              '<p>Se você <em>não</em> fiz esse pedido, por favor mude a sua senha rápido.</p>'
    }
  },
  'labels': {
    'email': 'Endereço de Email',
    'questions': 'Número de Perguntas:',
    'quiz': 'Teste ::: Testes',
    'module': 'Aula ::: Aulas',
    'roles': 'Grupo ::: Grupos',
    'test': 'Exame ::: Exames'
  },
  'result': {
    'success': {
      'icon': 'check_circle',
      'class': 'text-green-10',
      'message': 'Completou com sucesso!'
    },
    'failure': {
      'icon': 'highlight_off',
      'class': 'text-red-9',
      'message': 'Ops! Um erro occoreu!'
    }
  },
  'coming_soon': 'Em breve',
  'header': {
    'nav': {
      'admin': 'Administração',
      'account': 'Conta',
      'login': 'Entrar',
      'logout': 'Sair',
      'about': {
        'label': 'Sobre o Tigris',
        'close': 'Fechar',
        'message': 'Isto é versão 1.0, lançado em julho de 2017. &copy; Jogral, LLC.'
      },
      'tooltips': {
        'course': 'Cursos',
        'dashboard': 'Dashboard',
        'more': 'Ver mais',
        'notifications': {
          'label': 'Notificações',
          'empty_message': 'Sem notificações novas'
        },
        'toc': 'Índice'
      }
    }
  },
  'content': {
    'search': {
      'label': 'Pesquisar os cursos',
      'results': 'Resultados',
      'no_results': 'Nenhum resultado.'
    },
    'admin': {
      'tabs': {
        'courses': 'Cursos',
        'customization': 'Customização',
        'settings': 'Configurações',
        'users': 'Usuários e Grupos'
      },
      'accordions': {
        'courses': {
          'add': {
            'label': 'Adicionar um novo Curso',
            'content': 'Criar um novo curso de nossa interface do usuário ou carregar um arquivo de um curso.',
            'upload': {
              'button': 'Carregar Curso',
              'info': 'Carregar um arquivo de um curso. Aceita-se os arquivos de ZIP e de TAR.'
            },
            'button': 'Adicionar Curso'
          },
          'delete': {
            'label': 'Remover Curso',
            'content': 'Remover um curso da sua lista.'
          },
          'edit': {
            'label': 'Gereção de Cursos',
            'content': 'Mudar ou apagar os cursos criados.'
          }
        },
        'customization': {
          'colors': {
            'label': 'Cores',
            'content': 'Mudar a esquema de cores para o Tigris.'
          },
          'logo': {
            'label': 'Logotipo',
            'content': 'Mudar o logotipo que você deseja incluir dentro da sua organização.'
          }
        },
        'settings': {
          'account': {
            'label': 'Conta',
            'content': 'Detalhes sobre a organização.'
          },
          'api': {
            'label': 'API',
            'content': 'API'
          },
          'security': {
            'label': 'Security',
            'content': 'Mudar as configurações dentro a organização inteira.'
          }
        },
        'users': {
          'permissions': {
            'label': 'Permissões',
            'content': ''
          },
          'roles': {
            'label': 'Grupos',
            'content': ''
          },
          'users': {
            'label': 'Usuários',
            'content': ''
          }
        }
      },
      'course': {
        'detail': {
          'form': {
            'buttons': {
              'save': 'Salvar',
              'quit': 'Salvar & Deixar',
              'add_modules': 'Salvar & Continuar'
            },
            'title': {
              'name': 'Título do Curso',
              'placeholder': 'Meu novo Curso',
              'info': 'O que deseja chamar o curso?',
              'errors': {
                'required': 'O título é exigido.',
                'minLength': 'Você precisa um mínimo número de 5 caracteres.'
              }
            },
            'description': {
              'name': 'Descrição Breve',
              'placeholder': 'Aprenda sobre a razão os novos cursos são interessantes.',
              'info': 'Dê uma descrição muito breve do curso.',
              'errors': {
                'required': 'A descrição é exigida.'
              }
            },
            'long_description': {
              'name': 'Descrição em Detalhes.',
              'placeholder': 'Uma descrição com bastante detalhe.',
              'info': 'Esta descrição dá uma explicação em mais detalhes para eles que querem adicionar o curso.'
            },
            'slug': {
              'name': 'URL Intuitivo (Slug)',
              'placeholder': 'meu-novo-curso',
              'info': 'Seu URL. Algo como assim: <code>titulo-do-curso-intuitivo</code>',
              'errors': {
                'required': 'O nome para o URL Intuitivo é exigido.',
                'isUnique': 'Este URL já existe.'
              }
            },
            'status': {
              'name': '',
              'info': ''
            },
            'tags': {
              'name': 'Tags',
              'info': 'Termos para pesquisa'
            },
            'thumbnail': {
              'name': 'Imagem em Miniatura',
              'info': 'Esta será mostrada na lista de cursos abaixo do título. <strong>(Aceita-se estes formatos: .gif, .jpg/.jpeg e .png)</strong>'
            }
          },
          'edit': {
            'heading': 'Editar {n}'
          },
          'new': {
            'heading': 'Adicionar Novo Curso'
          }
        },
        'toasts': {
          'positive': 'Apagou o curso {c} com sucesso.',
          'negative': 'Ocorreu um erro em apagar o curso {c}.'
        }
      },
      'module': {
        'detail': {
          'form': {
            'buttons': {
              'save': 'Salvar',
              'quit': 'Salvar e Deixar',
              'add_modules': 'Salvar e Continuar'
            },
            'title': {
              'name': 'Título de Aula',
              'placeholder': 'Minha Nova Aula',
              'info': 'O nome que você quer dar à aula.',
              'errors': {
                'required': 'Título é exigido.',
                'minLength': 'O título exige pelo menos 5 caracteres.'
              }
            },
            'description': {
              'name': 'Descrição',
              'placeholder': 'Ensine sobre esta aula divertida.',
              'info': 'Dê uma explicação muita breve da aula.',
              'errors': {
                'required': 'Descrição é exigida.'
              }
            },
            'content': {
              'name': 'Conteúdo',
              'placeholder': 'Conteúdo para a lição desta aula.',
              'info': 'Aqui os alunos devem ler o conteúdo da aula. Inclua as imagens, os vídeos, etc. Coloque o que desejaria!'
            },
            'slug': {
              'name': 'URL (Slug)',
              'placeholder': 'minha-nova-aula',
              'info': 'O URL da aula. Você pode colocar algo como assim: <code>titulo-compativel-da-aula</code>',
              'errors': {
                'required': 'O slug é exigido.',
                'isUnique': 'O slug já existe.'
              }
            }
          },
          'edit': {
            'heading': 'Editar {n}'
          },
          'list': {
            'heading': 'Ver Aulas'
          },
          'new': {
            'heading': 'Adicionar Novas Aulas'
          },
          'toasts': {
            'positive': 'Salvou a atualização dos detalhes da aula {m}.',
            'negative': 'Erro ocorreu na atualização dos detalhes da aula {m}.'
          }
        },
        'list': {
          'buttons': {
            'delete': 'Apagar',
            'edit': 'Editar'
          },
          'empty': 'Sem aulas.',
          'heading': 'Ver Informação de Aulas'
        }
      },
      'role': {
        'headings': {
          'edit': 'Editar {g}',
          'new': 'Adicionar um Grupo'
        },
        'form': {
          'button': 'Adicionar Grupo',
          'title': {
            'label': 'Nome',
            'info': 'Um nome para o grupo.',
            'placeholder': 'Meu Novo Grupo',
            'errors': {
              'required': 'Nome é exigido.'
            }
          },
          'description': {
            'label': 'Descrição',
            'info': 'Uma descrição muito breve do grupo.',
            'placeholder': 'Um grupo legal.'
          },
          'permissions': {
            'label': 'Permissões',
            'info': 'Privilégios para o grupo.',
            'errors': {
              'required': 'Pelo menos um permissào é exigido.'
            }
          }
        },
        'toasts': {
          'positive': 'Adiocionou o grupo {n} com sucesso.',
          'negative': 'Um erro ocorreu de adiocionar o grupo.'
        }
      },
      'user': {
        'edit': {
          'heading': 'Editar {n}',
          'form': {
            'shortname': {
              'errors': {
                'isUnique': 'Nome de usuário já existe.'
              },
              'name': 'Nome de Usuário',
              'placeholder': 'username'
            },
            'password': {
              'errors': {
                'minLength': 'Senha deve ter de um mínimo de 8 caracteres.'
              },
              'name': 'Senha',
              'placeholder': 'p@ssw0rd'
            }
          }
        },
        'new': {
          'heading': 'Criar Novo Usuário',
          'invite': {
            'subject': 'Inscrição de Usuário em Tigris',
            'message': '<p>Uma convite tem enviado para você usar Tigris. Use este URL para a ativação da sua conta: <a href="{url}/verify/{token}">{url}/verify/{token}</a></p>'
          },
          'form': {
            'button': 'Criar Usuário',
            'email': {
              'errors': {
                'required': 'O endereço de email é exigido.',
                'email': 'O endereço de email não é valido.'
              },
              'info': 'Por entender onde enviar a confirmação de crição.',
              'name': 'O Endereço de Email do Usuário',
              'placeholder': 'email@sua.com.br'
            },
            'group': {
              'name': 'Grupo',
              'info': 'Qual é este tipo do usuário?'
            }
          },
          'toasts': {
            'positive': 'Convite enviou para {e}.',
            'negative': 'Não consegui enviar a convite para {e}.'
          }
        }
      }
    },
    'courses': {
      'card': {
        'buttons': {
          'go_to_class': 'Ir para a aula',
          'test_out': 'Fazer o exame',
          'repeat_go_to_class': 'Repetir curso',
          'repeat_test_out': 'Retomar o exame'
        }
      },
      'detail': {
        'buttons': {
          'continue': 'Continuar',
          'return': 'Voltar'
        },
        'info': {
          'duration': '{n} hora ::: {n} horas',
          'estimated_duration': 'Duração estimada: ',
          'presenter': 'Apresentação: ',
          'terms_used': 'Termos usados: '
        }
      },
      'done': {
        'content': 'Parabens por completar este curso. Vamos a procurar para mais cursos.',
        'position': {
          'message': 'Você é excelente! Bem, vamos continuar estudar e {link}!',
          'new_course': 'fazer um novo curso'
        },
        'repeat': {
          'message': 'Quer voltar para conteúdo neste curso? Vá para {link}.',
          'toc': 'o índice'
        },
        'return': {
          'message': 'Volte para a página da {link}.',
          'link': 'escolha de cursos'
        }
      },
      'exam': {
        'label': 'Exame',
        'buttons': {
          'finish': 'Enviar o exame',
          'next': 'Pergunta seguinte',
          'prev': 'Pergunta anterior',
          'repeat': 'Repetir o Exame'
        },
        'results': {
          'heading': 'Resultados do Exame',
          'score': 'Você tirou uma nota de <strong class="{class}">{n}%</strong> no seu exame.',
          'question': 'Pergunta:',
          'answers': {
            'yours': 'Sua Resposta:',
            'correct': 'Resposta Correta:'
          }
        },
        'shortcut': 'Shortcut: '
      },
      'list': {
        'headings': {
          'all': 'Todos os Cursos',
          'page': 'Cursos'
        }
      },
      'module': {
        'actions': {
          'read': 'Ler o módulo',
          'quiz': 'Fazer o teste'
        },
        'quiz': {
          'buttons': {
            'close': 'Fechar',
            'submit': 'Enviar'
          },
          'headings': {
            'correct': 'Pois é!',
            'incorrect': 'Desculpa...'
          },
          'types': {
            'fitb': {
              'instructions': 'Por favor entre a resposta correta no campo abaixo.',
              'placeholder': 'favor, entre a sua resposta',
              'question': 'Pergunta'
            },
            'ma': {
              'instructions': 'Favor escolha todas as respostas corretas para esta pergunta.'
            },
            'mc': {
              'instructions': 'Favor escolha a resposta maior para esta pergunta.'
            }
          }
        },
        'status': {
          'module': 'Você está fazendo o curso {title} na secção {module}.',
          'quiz': 'Você está fazendo o curso {title} e fazendo o teste.'
        }
      }
    },
    'dashboard': {
      'welcome': 'Bem-vindo ao seu painel. Você achará os cursos em progresso e completados, assim como as notificações sobre atualizações do software.',
      'empty': 'Sem cursos.',
      'in_progress': 'Cursos em andamento',
      'completed': 'Cursos acabados',
      'register': 'Ver os Cursos',
      'headings': {
        'greeting': {
          'with_name': 'Olá, {name}',
          'without_name': 'Olá'
        },
        'your_list': 'Seus Cursos',
        'recommended_list': 'Cursos Recomendados'
      }
    },
    'modals': {
      'account': {
        'buttons': {
          'close': 'Apagar a tela sem salvar',
          'save': 'Salvar e apagar a tela'
        },
        'label': 'Conta',
        'profile': {
          'tab': 'Perfil',
          'form': {
            'heading': 'Detalhes pessoais',
            'buttons': {
              'save': 'Salvar',
              'upload': 'Carregar'
            },
            'fields': {
              'first_name': 'Nome',
              'last_name': 'Sobrenome',
              'shortname': 'Nome de usuário',
              'email': 'Endereço de e-mail',
              'avatar': 'Carregar um avatar personalizado'
            },
            'toast': {
              'success': 'Salvou os detalhes na sua conta com sucesso.',
              'failure': 'Não conseguiu os detalhes na sua conta.'
            }
          }
        },
        'settings': {
          'tab': 'Configurções',
          'forms': {
            'password': {
              'button': 'Mudar',
              'heading': 'Mudar sua senha',
              'fields': {
                'password1': {
                  'label': 'Senha nova',
                  'error': {
                    'required': 'A senha é exigida.',
                    'minLength': 'Senha deve ter de um mínimo de 8 caracteres.'
                  }
                },
                'password2': {
                  'label': 'Confirme sua senha nova',
                  'error': {
                    'sameAs': 'As senhas deve igualar.'
                  }
                }
              }
            },
            'username': {
              'button': 'Atualizar',
              'heading': 'Inserir o nome de usuário',
              'fields': {
                'shortname': 'Nome de usuário'
              }
            }
          },
          'toast': {
            'success': 'Salvou a sua conta com sucesso.',
            'failure': 'Não conseguiu mudar a sua conta.'
          }
        }
      },
      'notifications': {
        'title': 'Notificações',
        'buttons': {
          'close': 'Fechar'
        },
        'labels': {
          'untitled': 'Sem título',
          'count': '<strong>{n}</strong> notificação ::: <strong>{n}</strong> notificações',
          'notifications': 'Tem {0}.'
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
      'error': 'O nome de usuário ou a senha não foram válidos. Por favor tente entrar novamente.',
      'password': {
        'required': 'A senha é exigida.',
        'minLength': 'A sua senha deve ter de um mínimo de 8 caracteres.'
      },
      'username': {
        'required': 'O nome de usuário é exigido.'
      }
    },
    'labels': {
      'login': 'Entrar',
      'heading': 'Entrar em Tigris Learning',
      'forgot': 'Esqueceu a sua conta??',
      'username': 'Nome de usuário',
      'password': 'Senha',
      'sso': {
        'heading': 'Funcionário em {company}?',
        'instructions': 'Se você é funcionário/a ou usuário de single sign-on em {company}, por favor clique no botão abaixo.',
        'login': 'Entrar por Single Sign-on',
        'switch': 'Não é usuário de single sign-on? Clique aqui para entrar.'
      }
    }
  },
  'logout': {
    'labels': {
      'heading': 'Você saiu de Tigris Learning'
    }
  },
  'reset_password': {
    'heading': 'Reiniciar a Sua Conta',
    'instructions': 'Favor preenche a sua senha nova.'
  },
  'verify': {
    'heading': 'O endereço de email é confirmado! Por favor criar uma senha agora.',
    'instructions': 'A sua senha deve ter de um mínimo de 8 caracteres. Você pode colocar qualquer tipo de cárater.',
    'errors': {
      'no_token': 'Você não tem um código para confirmar.',
      'expired': 'O seu código de confirmação é expirado.',
      'invalid': 'O seu código de confirmação não é válido.',
      'validated': 'Você já confirmou a sua conta.'
    }
  }
}
