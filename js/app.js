var App = (function () {
  var _currentLevelId = null;
  var _history = [];
  var _attempts = 0;
  var _freeUseJSCPP = true;
  var _currentScreen = 'screenHome';

  var SCREEN_MAP = {
    'home': 'screenHome',
    'map': 'screenMap',
    'theory': 'screenTheory',
    'exercise': 'screenExercise',
    'result': 'screenResult',
    'achievements': 'screenAchievements',
    'freePractice': 'screenFreePractice',
    'settings': 'screenSettings',
    'bug': 'screenBug'
  };

  function getLevelById(id) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (LEVELS[i].id === id) return LEVELS[i];
    }
    return null;
  }

  return {
    currentLevelId: null,
    history: [],

    init: function () {
      var self = this;

      Game.init();

      UI.setTheme(Game.getTheme());
      UI.init();
      this.initAuth();

      var btnJSCPP = document.getElementById('btnModeJSCPP');
      var btnJudge0 = document.getElementById('btnModeJudge0');
      if (btnJSCPP) {
        btnJSCPP.addEventListener('click', function () {
          _freeUseJSCPP = true;
          btnJSCPP.classList.add('active');
          if (btnJudge0) btnJudge0.classList.remove('active');
        });
      }
      if (btnJudge0) {
        btnJudge0.addEventListener('click', function () {
          _freeUseJSCPP = false;
          btnJudge0.classList.add('active');
          if (btnJSCPP) btnJSCPP.classList.remove('active');
        });
      }

      var freeEditor = UI.getEditor('freePractice');
      if (freeEditor) {
        freeEditor.setValue('#include <stdio.h>\n\nint main() {\n    printf("Hola, mundo!\\n");\n    return 0;\n}');
      }

      UI.showScreen('screenHome');
      UI.updateXPBar();
      UI.updateStreak();
    },

    initAuth: function () {
      var self = this;
      var btnAuth = document.getElementById('btnAuth');
      if (!btnAuth) return;

      btnAuth.addEventListener('click', function () { self.toggleAuth(); });

      if (window.__supabase) {
        window.__supabase.auth.getSession().then(function (result) {
          if (result.data.session) {
            UI.updateAuthUI(result.data.session.user);
          }
        });
      }
    },

    toggleAuth: function () {
      if (!window.__supabase) {
        UI.showToast('info', 'Supabase no configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu .env');
        return;
      }

      var self = this;
      window.__supabase.auth.getSession().then(function (result) {
        if (result.data.session) {
          var email = result.data.session.user.email || 'anon-' + result.data.session.user.id.slice(0, 8);
          UI.showAuthModal(email, function () {
            // Logout
            self.logout();
          });
        } else {
          self.showLoginForm();
        }
      });
    },

    showLoginForm: function () {
      UI.showModal(
        '<h2>Iniciar sesión</h2>' +
        '<p>Ingresa tu correo para recibir un enlace mágico. O juega como invitado (progreso local).</p>' +
        '<div class="auth-form">' +
        '<input type="email" id="authEmail" class="auth-input" placeholder="tu@correo.com" />' +
        '<div class="modal-actions">' +
        '<button class="btn btn-secondary" id="btnAuthCancel">Cancelar</button>' +
        '<button class="btn btn-primary" id="btnAuthSend">Enviar enlace</button>' +
        '</div>' +
        '</div>'
      );

      setTimeout(function () {
        var btnSend = document.getElementById('btnAuthSend');
        var btnCancel = document.getElementById('btnAuthCancel');
        var input = document.getElementById('authEmail');

        if (btnCancel) {
          btnCancel.addEventListener('click', function () {
            UI.hideModal();
          });
        }
        if (btnSend && input) {
          btnSend.addEventListener('click', function () {
            var email = input.value.trim();
            if (!email || !email.includes('@')) {
              UI.showToast('warning', 'Correo inválido');
              return;
            }
            btnSend.disabled = true;
            btnSend.textContent = 'Enviando...';
            window.__supabase.auth.signInWithOtp({ email: email }).then(function (result) {
              if (result.error) {
                UI.showToast('error', 'Error: ' + result.error.message);
                btnSend.disabled = false;
                btnSend.textContent = 'Enviar enlace';
              } else {
                UI.hideModal();
                UI.showToast('success', '¡Revisa tu correo! Recibirás un enlace para iniciar sesión.');
              }
            });
          });
          input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') btnSend.click();
          });
          input.focus();
        }
      }, 50);
    },

    logout: function () {
      if (!window.__supabase) return;
      var self = this;
      window.__supabase.auth.signOut().then(function () {
        UI.updateAuthUI(null);
        UI.showToast('success', 'Sesión cerrada');
      });
    },

    navigate: function (screen) {
      var screenId = SCREEN_MAP[screen] || 'screenHome';
      _history.push(_currentScreen);
      _currentScreen = screenId;
      this.history = _history.slice();
      UI.showScreen(screenId);
    },

    startLevel: function (levelId) {
      var level = getLevelById(levelId);
      if (!level) return;

      this.currentLevelId = levelId;
      _currentLevelId = levelId;
      _attempts = 0;

      UI.renderTheory(levelId);

      _history.push(_currentScreen);
      _currentScreen = 'screenTheory';
      this.history = _history.slice();

      UI.showScreen('screenTheory');
    },

    startExercise: function () {
      if (!_currentLevelId) return;
      var level = getLevelById(_currentLevelId);
      if (!level) return;

      _attempts = 0;

      UI.renderExercise(_currentLevelId);
      if (level.quiz) {
        UI.renderQuiz(_currentLevelId);
      }

      _history.push(_currentScreen);
      _currentScreen = 'screenExercise';
      this.history = _history.slice();

      UI.showScreen('screenExercise');
    },

    runCode: function () {
      if (!_currentLevelId) return;
      var level = getLevelById(_currentLevelId);
      if (!level) return;
      if (level.type === 'quiz') return;

      var code = UI.getExerciseCode();
      if (!code.trim()) {
        UI.showToast('warning', 'Escribe código antes de ejecutar');
        return;
      }

      UI.setOutput('Compilando...');
      UI.setErrors('');
      UI.showOutputTab('output');

      var self = this;
      Compiler.compile(code, _currentLevelId).then(function (result) {
        if (result.success) {
          UI.setOutput(result.output || '(sin salida)');
          if (result.errors) {
            UI.setErrors(result.errors);
          }
          UI.showOutputTab('output');

          if (level.expectedOutput) {
            var submitBtn = document.getElementById('btnSubmit');
            if (submitBtn) submitBtn.classList.remove('hidden');
          }
        } else {
          UI.setOutput(result.output || '');
          UI.setErrors(result.errors || 'Error desconocido');
          UI.showOutputTab('errors');
        }
      });
    },

    submitCode: function () {
      if (!_currentLevelId) return;
      var level = getLevelById(_currentLevelId);
      if (!level) return;

      _attempts++;

      if (level.type === 'quiz') {
        this.submitQuizAnswers(level);
        return;
      }

      var code = UI.getExerciseCode();
      if (!code.trim()) {
        UI.showToast('warning', 'Escribe código antes de verificar');
        _attempts--;
        return;
      }

      UI.setOutput('Compilando...');
      UI.setErrors('');

      var self = this;
      Compiler.compile(code, _currentLevelId).then(function (result) {
        var hintsUsed = UI.getHintsUsed();

        if (level.expectedOutput) {
          var userOutput = (result.success ? result.output : '').trim();
          var expected = level.expectedOutput.trim();
          var success = (userOutput === expected);

          var resultData = Game.completeLevel(_currentLevelId, _attempts, hintsUsed);

          UI.renderResult(
            success,
            resultData.stars,
            resultData.xpEarned,
            userOutput || '(sin salida)',
            expected,
            level
          );

          self.checkAchievements();
          UI.updateXPBar();
          UI.updateStreak();
        } else {
          if (result.success) {
            var resultData = Game.completeLevel(_currentLevelId, _attempts, hintsUsed);
            UI.renderResult(
              true,
              resultData.stars,
              resultData.xpEarned,
              result.output || '(sin salida)',
              '',
              level
            );
            self.checkAchievements();
            UI.updateXPBar();
            UI.updateStreak();
          } else {
            UI.setErrors(result.errors || 'Error desconocido');
            UI.showOutputTab('errors');
            UI.showToast('error', 'Tu código tiene errores. Corrígelos e inténtalo de nuevo.');
          }
        }
      });
    },

    submitQuizAnswers: function (level) {
      if (!level || !level.quiz) return;

      var allCorrect = true;
      var totalQuestions = level.quiz.length;
      var correctAnswers = 0;

      for (var q = 0; q < level.quiz.length; q++) {
        var selected = document.querySelector('input[name="q' + q + '"]:checked');
        if (selected && parseInt(selected.value, 10) === level.quiz[q].correct) {
          correctAnswers++;
        } else {
          allCorrect = false;
        }
      }

      var hintsUsed = UI.getHintsUsed();
      var resultData = Game.completeLevel(_currentLevelId, _attempts, hintsUsed);

      var userOutput = allCorrect
        ? 'Todas las respuestas correctas'
        : correctAnswers + ' de ' + totalQuestions + ' respuestas correctas';
      var expected = 'Todas las respuestas correctas';

      UI.renderResult(
        allCorrect,
        resultData.stars,
        resultData.xpEarned,
        userOutput,
        expected,
        level
      );

      this.checkAchievements();
      UI.updateXPBar();
      UI.updateStreak();
    },

    runFreeCode: function () {
      var code = UI.getFreeCode();
      if (!code.trim()) {
        UI.showToast('warning', 'Escribe código antes de ejecutar');
        return;
      }

      UI.setFreeOutput('Compilando...');

      Compiler.compileFree(code, _freeUseJSCPP).then(function (result) {
        if (result.success) {
          var output = result.output || '(sin salida)';
          if (result.errors) {
            output += '\n\n--- Advertencias ---\n' + result.errors;
          }
          UI.setFreeOutput(output);
        } else {
          var errorMsg = result.errors || 'Error desconocido';
          var partialOutput = result.output ? '\n\nSalida parcial:\n' + result.output : '';
          UI.setFreeOutput('Error:\n' + errorMsg + partialOutput);
        }
      });
    },

    runBugCode: function () {
      if (!_currentLevelId) return;
      var level = getLevelById(_currentLevelId);
      if (!level || !level.bugMode) return;

      var code = UI.getBugCode();
      if (!code.trim()) {
        UI.showToast('warning', 'Escribe código antes de ejecutar');
        return;
      }

      UI.setBugOutput('Compilando...');

      Compiler.compile(code, _currentLevelId).then(function (result) {
        if (result.success) {
          UI.setBugOutput(result.output || '(sin salida)');
        } else {
          var errorMsg = result.errors || 'Error desconocido';
          var partialOutput = result.output ? '\n\nSalida parcial:\n' + result.output : '';
          UI.setBugOutput('Error:\n' + errorMsg + partialOutput);
        }
      });
    },

    submitBugCode: function () {
      if (!_currentLevelId) return;
      var level = getLevelById(_currentLevelId);
      if (!level || !level.bugMode) return;

      _attempts++;

      var code = UI.getBugCode();
      if (!code.trim()) {
        UI.showToast('warning', 'Escribe código antes de verificar');
        _attempts--;
        return;
      }

      UI.setBugOutput('Compilando...');

      var self = this;
      Compiler.compile(code, _currentLevelId).then(function (result) {
        var hintsUsed = UI.getHintsUsed();
        var userOutput = (result.success ? result.output : '').trim();
        var success = false;
        var expectedDisplay = '';

        if (level.bugMode.expectedOutput) {
          var bugExpected = level.bugMode.expectedOutput.trim();

          if (bugExpected.indexOf('Cuando') === 0 || bugExpected.indexOf('Este') === 0 || bugExpected.indexOf('La') === 0) {
            success = result.success;
            expectedDisplay = bugExpected;
          } else {
            success = result.success && (userOutput === bugExpected);
            expectedDisplay = bugExpected;
          }
        } else if (level.expectedOutput) {
          success = result.success && (userOutput === level.expectedOutput.trim());
          expectedDisplay = level.expectedOutput.trim();
        } else {
          success = result.success;
        }

        if (success) {
          var resultData = Game.completeLevel(_currentLevelId, _attempts, hintsUsed);

          UI.renderResult(
            true,
            resultData.stars,
            resultData.xpEarned,
            userOutput || '(sin salida)',
            expectedDisplay || '',
            level
          );

          self.checkAchievements();
          UI.updateXPBar();
          UI.updateStreak();
        } else {
          UI.setBugOutput(result.success
            ? (userOutput || '(sin salida)')
            : 'Error:\n' + (result.errors || 'Error desconocido'));
          UI.showToast('error', 'La salida no coincide o hay errores. Sigue intentando.');
        }
      });
    },

    revealHint: function (hintNumber) {
      UI.revealHint(hintNumber);
    },

    nextLevel: function () {
      if (!_currentLevelId) {
        UI.showScreen('screenMap');
        return;
      }

      var nextId = _currentLevelId + 1;
      if (nextId <= LEVELS.length) {
        this.startLevel(nextId);
      } else {
        UI.showToast('success', 'Felicidades! Has completado todos los niveles!');
        UI.showScreen('screenHome');
      }
    },

    goBack: function () {
      if (_history.length > 0) {
        var previousScreen = _history.pop();
        _currentScreen = previousScreen;
        this.history = _history.slice();
        UI.showScreen(previousScreen);
      } else {
        UI.showScreen('screenHome');
      }
    },

    resetProgress: function () {
      UI.showModal(
        '<h2>Reiniciar progreso</h2>' +
        '<p>Esto eliminará todo tu progreso, XP y logros. Esta acción no se puede deshacer.</p>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-secondary" id="btnModalCancel">Cancelar</button>' +
        '<button class="btn btn-danger" id="btnModalConfirm">Reiniciar</button>' +
        '</div>'
      );

      var self = this;
      setTimeout(function () {
        var btnCancel = document.getElementById('btnModalCancel');
        var btnConfirm = document.getElementById('btnModalConfirm');
        if (btnCancel) {
          btnCancel.addEventListener('click', function () {
            UI.hideModal();
          });
        }
        if (btnConfirm) {
          btnConfirm.addEventListener('click', function () {
            Game.resetProgress();
            UI.hideModal();
            UI.showToast('success', 'Progreso reiniciado');
            UI.renderHome();
            UI.updateXPBar();
            UI.updateStreak();
            self.navigate('home');
          });
        }
      }, 50);
    },

    toggleTheme: function () {
      var currentTheme = Game.getTheme();
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      Game.setTheme(newTheme);
      UI.setTheme(newTheme);
    },

    checkAchievements: function () {
      var newlyUnlocked = Game.checkAchievements();
      for (var i = 0; i < newlyUnlocked.length; i++) {
        var ach = null;
        for (var j = 0; j < ACHIEVEMENTS.length; j++) {
          if (ACHIEVEMENTS[j].id === newlyUnlocked[i]) {
            ach = ACHIEVEMENTS[j];
            break;
          }
        }
        if (ach) {
          UI.showToast('success', 'Logro desbloqueado: ' + ach.icon + ' ' + ach.name);
        }
      }
    }
  };
})();

window.App = App;

document.addEventListener('DOMContentLoaded', function () {
  App.init();
});