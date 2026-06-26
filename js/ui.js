var UI = (function () {

  var editors = {
    exercise: null,
    freePractice: null,
    bug: null
  };

  var currentLevel = null;
  var currentLevelData = null;
  var hintsRevealed = 0;
  var hintsUsedCount = 0;
  var previousScreen = 'screenHome';
  var currentScreen = 'screenHome';
  var toastTimeout = null;

  function getEl(id) {
    return document.getElementById(id);
  }

  function getLevelById(id) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (LEVELS[i].id === id) return LEVELS[i];
    }
    return null;
  }

  function getModuleForLevel(levelId) {
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].levels.indexOf(levelId) !== -1) return MODULES[i];
    }
    return null;
  }

  function getModuleProgress(moduleId) {
    var mod = null;
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].id === moduleId) {
        mod = MODULES[i];
        break;
      }
    }
    if (!mod) return 0;
    var completed = 0;
    for (var j = 0; j < mod.levels.length; j++) {
      if (Game.isLevelCompleted(mod.levels[j])) completed++;
    }
    return Math.round((completed / mod.levels.length) * 100);
  }

  function getTypeLabel(type) {
    switch (type) {
      case 'fill': return 'Llenar espacios';
      case 'write': return 'Escribir código';
      case 'quiz': return 'Cuestionario';
      default: return type;
    }
  }

  return {
    init: function () {
      var self = this;

      editors.exercise = this.createEditor('editorWrapper');
      editors.freePractice = this.createEditor('freeEditorWrapper');
      editors.bug = this.createEditor('bugEditorWrapper');

      var btnBack = getEl('btnBack');
      if (btnBack) btnBack.addEventListener('click', function () {
        self.showScreen(previousScreen);
      });

      var btnStartMap = getEl('btnStartMap');
      if (btnStartMap) btnStartMap.addEventListener('click', function () {
        self.showScreen('screenMap');
      });

      var btnStartFree = getEl('btnStartFree');
      if (btnStartFree) btnStartFree.addEventListener('click', function () {
        self.showScreen('screenFreePractice');
      });

      var btnTheoryBack = getEl('btnTheoryBack');
      if (btnTheoryBack) btnTheoryBack.addEventListener('click', function () {
        self.showScreen('screenMap');
      });

      var btnTheoryContinue = getEl('btnTheoryContinue');
      if (btnTheoryContinue) btnTheoryContinue.addEventListener('click', function () {
        if (currentLevelData) {
          if (currentLevelData.quiz) {
            self.renderQuiz(currentLevelData.id);
            self.showScreen('screenExercise');
          } else if (currentLevelData.bugMode) {
            self.showScreen('screenExercise');
          } else {
            self.showScreen('screenExercise');
          }
          self.renderExercise(currentLevelData.id);
        }
      });

      var btnRun = getEl('btnRun');
      if (btnRun) btnRun.addEventListener('click', function () {
        if (typeof App !== 'undefined' && App.runCode) App.runCode();
      });

      var btnSubmit = getEl('btnSubmit');
      if (btnSubmit) btnSubmit.addEventListener('click', function () {
        if (typeof App !== 'undefined' && App.submitCode) App.submitCode();
      });

      var btnHint1 = getEl('btnHint1');
      if (btnHint1) btnHint1.addEventListener('click', function () {
        self.revealHint(1);
      });

      var btnHint2 = getEl('btnHint2');
      if (btnHint2) btnHint2.addEventListener('click', function () {
        self.revealHint(2);
      });

      var btnHint3 = getEl('btnHint3');
      if (btnHint3) btnHint3.addEventListener('click', function () {
        self.revealHint(3);
      });

      var btnReset = getEl('btnReset');
      if (btnReset) btnReset.addEventListener('click', function () {
        if (currentLevelData && editors.exercise) {
          editors.exercise.setValue(currentLevelData.starterCode);
        }
      });

      var btnResultMap = getEl('btnResultMap');
      if (btnResultMap) btnResultMap.addEventListener('click', function () {
        self.showScreen('screenMap');
      });

      var btnResultNext = getEl('btnResultNext');
      if (btnResultNext) btnResultNext.addEventListener('click', function () {
        if (currentLevelData) {
          var nextId = currentLevelData.id + 1;
          var nextLevel = getLevelById(nextId);
          if (nextLevel) {
            if (typeof App !== 'undefined' && App.startLevel) App.startLevel(nextId);
            else { self.renderTheory(nextId); self.showScreen('screenTheory'); }
          } else {
            self.showScreen('screenMap');
          }
        }
      });

      var btnAchievements = getEl('btnAchievements');
      if (btnAchievements) btnAchievements.addEventListener('click', function () {
        previousScreen = currentScreen;
        self.renderAchievements();
        self.showScreen('screenAchievements');
      });

      var btnAchievementsBack = getEl('btnAchievementsBack');
      if (btnAchievementsBack) btnAchievementsBack.addEventListener('click', function () {
        self.showScreen(previousScreen === 'screenAchievements' ? 'screenHome' : previousScreen);
      });

      var btnFreePractice = getEl('btnFreePractice');
      if (btnFreePractice) btnFreePractice.addEventListener('click', function () {
        previousScreen = currentScreen;
        self.showScreen('screenFreePractice');
      });

      var btnFreeBack = getEl('btnFreeBack');
      if (btnFreeBack) btnFreeBack.addEventListener('click', function () {
        self.showScreen(previousScreen === 'screenFreePractice' ? 'screenHome' : previousScreen);
      });

      var btnFreeRun = getEl('btnFreeRun');
      if (btnFreeRun) btnFreeRun.addEventListener('click', function () {
        if (typeof App !== 'undefined' && App.runFreeCode) App.runFreeCode();
      });

      var btnFreeClear = getEl('btnFreeClear');
      if (btnFreeClear) btnFreeClear.addEventListener('click', function () {
        var output = getEl('freeOutputContent');
        if (output) output.innerHTML = '<span class="output-placeholder">Presiona "Ejecutar" para compilar tu código...</span>';
      });

      var btnSettings = getEl('btnSettings');
      if (btnSettings) btnSettings.addEventListener('click', function () {
        previousScreen = currentScreen;
        self.renderSettings();
        self.showScreen('screenSettings');
      });

      var btnSettingsBack = getEl('btnSettingsBack');
      if (btnSettingsBack) btnSettingsBack.addEventListener('click', function () {
        self.showScreen(previousScreen === 'screenSettings' ? 'screenHome' : previousScreen);
      });

      var btnTheme = getEl('btnTheme');
      if (btnTheme) btnTheme.addEventListener('click', function () {
        var currentTheme = Game.getTheme();
        self.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
      });

      var btnThemeDark = getEl('btnThemeDark');
      if (btnThemeDark) btnThemeDark.addEventListener('click', function () {
        self.setTheme('dark');
      });

      var btnThemeLight = getEl('btnThemeLight');
      if (btnThemeLight) btnThemeLight.addEventListener('click', function () {
        self.setTheme('light');
      });

      var btnResetProgress = getEl('btnResetProgress');
      if (btnResetProgress) btnResetProgress.addEventListener('click', function () {
        self.showModal(
          '<h2>Reiniciar progreso</h2>' +
          '<p>Esto eliminará todo tu progreso, XP y logros. Esta acción no se puede deshacer.</p>' +
          '<div class="modal-actions">' +
          '<button class="btn btn-secondary" id="btnModalCancel">Cancelar</button>' +
          '<button class="btn btn-danger" id="btnModalConfirm">Reiniciar</button>' +
          '</div>'
        );
        setTimeout(function () {
          var btnCancel = getEl('btnModalCancel');
          var btnConfirm = getEl('btnModalConfirm');
          if (btnCancel) btnCancel.addEventListener('click', function () { self.hideModal(); });
          if (btnConfirm) btnConfirm.addEventListener('click', function () {
            Game.resetProgress();
            self.hideModal();
            self.showToast('success', 'Progreso reiniciado');
            self.renderHome();
            self.updateXPBar();
            self.updateStreak();
          });
        }, 50);
      });

      var btnBugBack = getEl('btnBugBack');
      if (btnBugBack) btnBugBack.addEventListener('click', function () {
        self.showScreen(previousScreen);
      });

      var btnBugRun = getEl('btnBugRun');
      if (btnBugRun) btnBugRun.addEventListener('click', function () {
        if (typeof App !== 'undefined' && App.runBugCode) App.runBugCode();
      });

      var btnBugSubmit = getEl('btnBugSubmit');
      if (btnBugSubmit) btnBugSubmit.addEventListener('click', function () {
        if (typeof App !== 'undefined' && App.submitBugCode) App.submitBugCode();
      });

      var btnBugReset = getEl('btnBugReset');
      if (btnBugReset) btnBugReset.addEventListener('click', function () {
        if (currentLevelData && currentLevelData.bugMode && editors.bug) {
          editors.bug.setValue(currentLevelData.bugMode.buggedCode);
        }
      });

      var btnClearOutput = getEl('btnClearOutput');
      if (btnClearOutput) btnClearOutput.addEventListener('click', function () {
        var outputContent = getEl('outputContent');
        if (outputContent) outputContent.innerHTML = '<span class="output-placeholder">Presiona "Ejecutar" para ver la salida...</span>';
        var errorsContent = getEl('errorsContent');
        if (errorsContent) errorsContent.textContent = '';
      });

      var btnSkipLevel = getEl('btnSkipLevel');
      if (btnSkipLevel) btnSkipLevel.addEventListener('click', function () {
        if (currentLevelData) {
          var nextId = currentLevelData.id + 1;
          var nextLevel = getLevelById(nextId);
          if (nextLevel) {
            if (typeof App !== 'undefined' && App.startLevel) App.startLevel(nextId);
            else { self.renderTheory(nextId); self.showScreen('screenTheory'); }
          } else {
            self.showScreen('screenMap');
          }
        }
      });

      var outputTabs = document.querySelectorAll('.output-tab');
      for (var t = 0; t < outputTabs.length; t++) {
        outputTabs[t].addEventListener('click', function () {
          var tab = this.getAttribute('data-tab');
          for (var i = 0; i < outputTabs.length; i++) {
            outputTabs[i].classList.remove('active');
          }
          this.classList.add('active');
          var outputContent = getEl('outputContent');
          var errorsContent = getEl('errorsContent');
          if (tab === 'output') {
            if (outputContent) outputContent.classList.remove('hidden');
            if (errorsContent) errorsContent.classList.add('hidden');
          } else if (tab === 'errors') {
            if (outputContent) outputContent.classList.add('hidden');
            if (errorsContent) errorsContent.classList.remove('hidden');
          }
        });
      }

      this.setTheme(Game.getTheme());
      this.updateXPBar();
      this.updateStreak();
    },

    showScreen: function (screenId) {
      if (screenId !== currentScreen) {
        previousScreen = currentScreen;
      }
      currentScreen = screenId;

      var screens = document.querySelectorAll('.screen');
      for (var i = 0; i < screens.length; i++) {
        screens[i].classList.remove('active');
      }

      var target = getEl(screenId);
      if (target) {
        target.classList.add('active');
        target.style.animation = 'none';
        target.offsetHeight;
        target.style.animation = '';
      }

      var btnBack = getEl('btnBack');
      if (btnBack) {
        if (screenId === 'screenHome') {
          btnBack.classList.add('hidden');
        } else {
          btnBack.classList.remove('hidden');
        }
      }

      if (screenId === 'screenHome') this.renderHome();
      if (screenId === 'screenMap') this.renderMap();
      if (screenId === 'screenTheory') window.scrollTo(0, 0);
      if (screenId === 'screenExercise') window.scrollTo(0, 0);

      window.scrollTo(0, 0);
    },

    renderHome: function () {
      var userLevel = Game.getUserLevel();
      var totalXP = Game.getXP();
      var XP_PER_USER_LEVEL = 50;
      var xpInLevel = totalXP % XP_PER_USER_LEVEL;
      var completedCount = 0;
      for (var i = 0; i < LEVELS.length; i++) {
        if (Game.isLevelCompleted(LEVELS[i].id)) completedCount++;
      }
      var streak = Game.getStreak();

      var elLevel = getEl('homeStatLevel');
      var elXP = getEl('homeStatXP');
      var elCompleted = getEl('homeStatCompleted');
      var elStreak = getEl('homeStatStreak');

      if (elLevel) elLevel.textContent = userLevel;
      if (elXP) elXP.textContent = totalXP;
      if (elCompleted) elCompleted.innerHTML = completedCount + '<span class="home-stat-total">/32</span>';
      if (elStreak) elStreak.textContent = streak;

      for (var m = 0; m < MODULES.length; m++) {
        var pct = getModuleProgress(MODULES[m].id);
        var pctEl = getEl('homeModule' + MODULES[m].id + 'Pct');
        var moduleEl = getEl('homeModule' + MODULES[m].id);
        if (pctEl) pctEl.textContent = pct + '%';
        if (moduleEl) {
          var dot = moduleEl.querySelector('.progress-dot');
          if (dot) {
            if (pct === 100) {
              dot.style.background = 'var(--node-completed)';
            } else if (pct > 0) {
              dot.style.background = 'var(--node-available)';
            } else {
              dot.style.background = 'var(--node-locked)';
            }
          }
        }
      }

      this.updateXPBar();
      this.updateStreak();
    },

    renderMap: function () {
      var mapPath = getEl('mapPath');
      if (!mapPath) return;
      mapPath.innerHTML = '';

      var lastModuleId = -1;

      for (var i = 0; i < LEVELS.length; i++) {
        var level = LEVELS[i];
        var progress = Game.getLevelProgress(level.id);
        var isUnlocked = Game.isLevelUnlocked(level.id);
        var currentLevelId = Game.getCurrentLevel();
        var isCurrent = (level.id === currentLevelId && !progress.completed);
        var isCompleted = progress.completed;
        var isLocked = !isUnlocked;

        if (level.module !== lastModuleId) {
          var modInfo = null;
          for (var m = 0; m < MODULES.length; m++) {
            if (MODULES[m].id === level.module) {
              modInfo = MODULES[m];
              break;
            }
          }
          if (modInfo) {
            if (i > 0) {
              var prevLevelProgress = Game.isLevelCompleted(LEVELS[i - 1].id);
              var connClass = prevLevelProgress ? 'completed' : 'available';
              var connector = document.createElement('div');
              connector.className = 'map-connector ' + connClass;
              mapPath.appendChild(connector);
            }

            var moduleLabel = document.createElement('div');
            moduleLabel.className = 'map-module-label';
            var moduleIcon = modInfo.icon || 'fa-book';
            var modulePct = getModuleProgress(modInfo.id);
            moduleLabel.innerHTML = '<i class="fas ' + moduleIcon + '"></i> Módulo ' + ['0', 'I', 'II', 'III'][modInfo.id] + ': ' + modInfo.name + ' <span class="progress-pct" style="margin-left:auto;">' + modulePct + '%</span>';
            mapPath.appendChild(moduleLabel);
          }
          lastModuleId = level.module;
        } else if (i > 0) {
          var prevCompleted = Game.isLevelCompleted(LEVELS[i - 1].id);
          var connClass = prevCompleted ? 'completed' : 'available';
          var connector = document.createElement('div');
          connector.className = 'map-connector ' + connClass;
          mapPath.appendChild(connector);
        }

        var nodeClass = 'map-node ';
        if (isCompleted) {
          nodeClass += 'completed';
        } else if (isCurrent) {
          nodeClass += 'current';
        } else if (isUnlocked) {
          nodeClass += 'available';
        } else {
          nodeClass += 'locked';
        }

        var starsHtml = '';
        for (var s = 0; s < 3; s++) {
          if (isCompleted && s < progress.stars) {
            starsHtml += '<i class="fas fa-star star-filled"></i>';
          } else {
            starsHtml += '<i class="fas fa-star star-empty"></i>';
          }
        }

        var nodeHtml = '<div class="' + nodeClass + '" data-level="' + level.id + '"' +
          (isLocked ? '' : ' onclick="App.startLevel(' + level.id + ')"') + '>' +
          '<div class="map-node-icon"><i class="fas ' + level.icon + '"></i></div>' +
          '<div class="map-node-info">' +
          '<div class="map-node-title">' + level.title + '</div>' +
          '<div class="map-node-subtitle">' + this.getTopicSubtitle(level) + '</div>' +
          '<div class="map-node-stars">' + starsHtml + '</div>' +
          '</div>' +
          '</div>';

        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = nodeHtml;
        mapPath.appendChild(tempDiv.firstChild);
      }
    },

    getTopicSubtitle: function (level) {
      var subtitles = {
        1: 'printf, estructura básica',
        2: 'int, float, char, printf formato',
        3: 'if/else, for, módulo',
        4: 'funciones, arreglos',
        5: 'char[], strlen, strcmp',
        6: '&, *, malloc, free',
        7: 'finitud, TDA, propiedades',
        8: 'pseudocódigo a C',
        9: 'O(1), O(n), O(n²)',
        10: 'inserción, estabilidad',
        11: 'selección, inestable',
        12: 'burbuja, optimización',
        13: 'divide y vencerás',
        14: 'secuencial y binaria',
        15: 'índice auxiliar',
        16: 'N-reinas, exploración',
        17: 'push, pop, peek',
        18: 'nodos, malloc, free',
        19: 'arreglo circular',
        20: 'prioridad, heap',
        21: 'insertar, imprimir',
        22: 'ant, sig, inserción',
        23: 'hash, sondeo lineal',
        24: 'encadenamiento',
        25: 'inorden, preorden, postorden',
        26: 'insertar, buscar, BST',
        27: 'heapify-up, heapify-down',
        28: 'rojo-negro, complejidad',
        29: 'matriz y lista de adyacencia',
        30: 'anchura y profundidad',
        31: 'pesos no negativos',
        32: 'BST, hash, merge sort'
      };
      return subtitles[level.id] || level.title;
    },

    renderTheory: function (levelId) {
      var level = getLevelById(levelId);
      if (!level) return;
      currentLevel = levelId;
      currentLevelData = level;

      var modInfo = null;
      for (var m = 0; m < MODULES.length; m++) {
        if (MODULES[m].id === level.module) {
          modInfo = MODULES[m];
          break;
        }
      }

      var moduleBadge = getEl('theoryModule');
      var levelBadge = getEl('theoryLevel') || document.querySelector('.theory-level');
      var title = getEl('theoryTitle');
      var content = getEl('theoryContent');

      var moduleLabel = 'Módulo ' + ['0', 'I', 'II', 'III'][level.module];
      if (modInfo) moduleLabel += ': ' + modInfo.name;

      if (moduleBadge) {
        moduleBadge.textContent = moduleLabel;
      }
      if (levelBadge) {
        levelBadge.textContent = 'Nivel ' + level.id;
      }
      if (title) {
        title.textContent = level.title;
      }
      if (content) {
        content.innerHTML = level.theory;
      }
    },

    renderExercise: function (levelId) {
      var level = getLevelById(levelId);
      if (!level) return;
      currentLevel = levelId;
      currentLevelData = level;
      hintsRevealed = 0;
      hintsUsedCount = 0;

      var elLevel = getEl('exerciseLevel');
      var elName = getEl('exerciseName');
      var elType = getEl('exerciseType');
      var elInstruction = getEl('exerciseInstruction');
      var elHint1 = getEl('btnHint1');
      var elHint2 = getEl('btnHint2');
      var elHint3 = getEl('btnHint3');
      var elHintText = getEl('hintText');
      var elSubmit = getEl('btnSubmit');
      var elOutput = getEl('outputContent');
      var elErrors = getEl('errorsContent');

      if (elLevel) elLevel.textContent = 'Nivel ' + level.id;
      if (elName) elName.textContent = level.title;
      if (elType) {
        elType.textContent = getTypeLabel(level.type);
        elType.className = 'exercise-type-badge';
      }
      if (elInstruction) elInstruction.innerHTML = level.instruction;
      if (editors.exercise) {
        editors.exercise.setValue(level.starterCode || '');
        editors.exercise.refresh();
      }

      if (elHint1) { elHint1.disabled = false; elHint1.classList.remove('used'); }
      if (elHint2) { elHint2.disabled = true; elHint2.classList.remove('used'); }
      if (elHint3) { elHint3.disabled = true; elHint3.classList.remove('used'); }
      if (elHintText) { elHintText.classList.add('hidden'); elHintText.textContent = ''; }

      if (elOutput) elOutput.innerHTML = '<span class="output-placeholder">Presiona "Ejecutar" para ver la salida...</span>';
      if (elErrors) elErrors.textContent = '';

      var outputTabs = document.querySelectorAll('.output-tab');
      for (var t = 0; t < outputTabs.length; t++) {
        outputTabs[t].classList.remove('active');
      }
      if (outputTabs.length > 0) outputTabs[0].classList.add('active');
      var outputContent = getEl('outputContent');
      var errorsContent = getEl('errorsContent');
      if (outputContent) outputContent.classList.remove('hidden');
      if (errorsContent) errorsContent.classList.add('hidden');

      if (elSubmit) {
        if (level.type === 'quiz') {
          elSubmit.classList.remove('hidden');
        } else if (level.expectedOutput) {
          elSubmit.classList.remove('hidden');
        } else {
          elSubmit.classList.add('hidden');
        }
      }
    },

    renderQuiz: function (levelId) {
      var level = getLevelById(levelId);
      if (!level || !level.quiz) return;

      var elInstruction = getEl('exerciseInstruction');
      if (elInstruction) {
        var html = '<div class="quiz-container">';
        html += '<p class="quiz-instruction">' + level.instruction + '</p>';
        for (var q = 0; q < level.quiz.length; q++) {
          html += '<div class="quiz-question">';
          html += '<p class="quiz-question-text">' + (q + 1) + '. ' + level.quiz[q].question + '</p>';
          html += '<div class="quiz-options">';
          for (var o = 0; o < level.quiz[q].options.length; o++) {
            html += '<label class="quiz-option">';
            html += '<input type="radio" name="q' + q + '" value="' + o + '"> ' + level.quiz[q].options[o];
            html += '</label>';
          }
          html += '</div>';
          html += '</div>';
        }
        html += '</div>';
        elInstruction.innerHTML = html;
      }

      var exerciseBody = document.querySelector('.exercise-body');
      if (exerciseBody) exerciseBody.style.display = 'none';

      var hintsSection = getEl('hintsSection');
      if (hintsSection) hintsSection.style.display = 'none';
    },

    renderBugMode: function (levelId) {
      var level = getLevelById(levelId);
      if (!level || !level.bugMode) return;
      currentLevel = levelId;
      currentLevelData = level;

      var elLevel = getEl('bugLevel');
      var elName = getEl('bugName');
      var elInstruction = getEl('bugInstruction');

      if (elLevel) elLevel.textContent = 'Nivel ' + level.id;
      if (elName) elName.textContent = level.title;
      if (elInstruction) elInstruction.innerHTML = level.bugMode.description;

      if (editors.bug) {
        editors.bug.setValue(level.bugMode.buggedCode || '');
        editors.bug.refresh();
      }

      var bugOutput = getEl('bugOutputContent');
      if (bugOutput) bugOutput.innerHTML = '<span class="output-placeholder">Ejecuta el código para ver qué produce...</span>';

      this.showScreen('screenBug');
    },

    renderResult: function (success, stars, xp, userOutput, expectedOutput, level) {
      var elIcon = getEl('resultIcon');
      var elTitle = getEl('resultTitle');
      var elMessage = getEl('resultMessage');
      var elStars = getEl('resultStars');
      var elXp = getEl('resultXp');
      var elUserOutput = getEl('resultUserOutput');
      var elExpectedOutput = getEl('resultExpectedOutput');
      var elOutputPreview = getEl('resultOutputPreview');
      var elResultNext = getEl('btnResultNext');

      if (elIcon) {
        elIcon.className = 'result-icon ' + (success ? 'success' : 'error');
        elIcon.innerHTML = success
          ? '<i class="fas fa-check"></i>'
          : '<i class="fas fa-times"></i>';
      }

      if (elTitle) {
        elTitle.textContent = success ? '¡Correcto!' : 'Incorrecto';
      }

      if (elMessage) {
        if (success) {
          if (stars === 3) {
            elMessage.textContent = '¡Excelente! Código perfecto a la primera.';
          } else if (stars === 2) {
            elMessage.textContent = '¡Bien! Lo lograste con algún intento extra.';
          } else {
            elMessage.textContent = 'Completado, pero podrías mejorar.';
          }
        } else {
          elMessage.textContent = 'La salida no coincide con lo esperado. Revisa tu código e inténtalo de nuevo.';
        }
      }

      if (elStars) {
        var starsHtml = '';
        for (var i = 0; i < 3; i++) {
          var filledClass = i < stars ? 'filled' : '';
          var delay = i * 0.2;
          starsHtml += '<span class="star ' + filledClass + '" style="animation-delay:' + delay + 's"><i class="fas fa-star"></i></span>';
        }
        elStars.innerHTML = starsHtml;
      }

      if (elXp) {
        elXp.innerHTML = '<span class="result-xp-value">+' + xp + '</span> XP';
      }

      if (elOutputPreview) {
        if (level && level.type === 'quiz') {
          elOutputPreview.style.display = 'none';
        } else {
          elOutputPreview.style.display = '';
        }
      }

      if (elUserOutput) elUserOutput.textContent = userOutput || '(sin salida)';
      if (elExpectedOutput) elExpectedOutput.textContent = expectedOutput || '(sin salida)';

      if (elResultNext) {
        if (level && level.id >= LEVELS[LEVELS.length - 1].id) {
          elResultNext.textContent = 'Mapa';
          elResultNext.innerHTML = '<i class="fas fa-map"></i> Mapa';
        } else {
          elResultNext.innerHTML = 'Siguiente nivel <i class="fas fa-arrow-right"></i>';
        }
      }

      if (success && stars === 3) {
        this.showConfetti();
      }

      this.showScreen('screenResult');
    },

    renderAchievements: function () {
      var grid = getEl('achievementsGrid');
      if (!grid) return;
      grid.innerHTML = '';

      var unlockedIds = [];
      try {
        var stored = localStorage.getItem('juego-c-progreso');
        if (stored) {
          var parsed = JSON.parse(stored);
          unlockedIds = parsed.achievements || [];
        }
      } catch (e) {}

      for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        var ach = ACHIEVEMENTS[i];
        var isUnlocked = unlockedIds.indexOf(ach.id) !== -1;

        var card = document.createElement('div');
        card.className = 'achievement-card ' + (isUnlocked ? 'unlocked' : 'locked');
        card.innerHTML =
          '<div class="achievement-icon">' + ach.icon + '</div>' +
          '<div class="achievement-name">' + ach.name + '</div>' +
          '<div class="achievement-desc">' + ach.desc + '</div>';
        grid.appendChild(card);
      }
    },

    renderSettings: function () {
      var elCurrentLevel = getEl('settingsCurrentLevel');
      var elTotalXP = getEl('settingsTotalXP');
      var elCompleted = getEl('settingsCompleted');
      var elJudge0Status = getEl('judge0Status');
      var elJudge0Remaining = getEl('judge0Remaining');
      var elThemeDark = getEl('btnThemeDark');
      var elThemeLight = getEl('btnThemeLight');

      var completedCount = 0;
      for (var i = 0; i < LEVELS.length; i++) {
        if (Game.isLevelCompleted(LEVELS[i].id)) completedCount++;
      }

      if (elCurrentLevel) elCurrentLevel.textContent = Game.getCurrentLevel();
      if (elTotalXP) elTotalXP.textContent = Game.getXP();
      if (elCompleted) elCompleted.textContent = completedCount + '/32';

      var currentTheme = Game.getTheme();
      if (elThemeDark) {
        elThemeDark.className = currentTheme === 'dark' ? 'btn btn-sm btn-toggle active' : 'btn btn-sm btn-toggle';
      }
      if (elThemeLight) {
        elThemeLight.className = currentTheme === 'light' ? 'btn btn-sm btn-toggle active' : 'btn btn-sm btn-toggle';
      }

      if (typeof Compiler !== 'undefined' && Compiler.checkJudge0Available) {
        Compiler.checkJudge0Available().then(function (result) {
          if (elJudge0Status) {
            elJudge0Status.textContent = result.available ? 'Disponible' : 'No disponible';
            elJudge0Status.style.color = result.available ? 'var(--success)' : 'var(--error)';
          }
          if (elJudge0Remaining) {
            elJudge0Remaining.textContent = result.remaining || '—';
          }
        });
      } else {
        if (elJudge0Status) {
          elJudge0Status.textContent = 'No configurado';
          elJudge0Status.style.color = 'var(--text-muted)';
        }
        if (elJudge0Remaining) {
          elJudge0Remaining.textContent = '—';
        }
      }
    },

    updateXPBar: function () {
      var totalXP = Game.getXP();
      var XP_PER_LEVEL = 50;
      var userLevel = Game.getUserLevel();
      var xpInLevel = totalXP % XP_PER_LEVEL;
      var pct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);

      var barFill = getEl('xpBarFill');
      var barLabel = getEl('xpBarLabel');

      if (barFill) barFill.style.width = pct + '%';
      if (barLabel) barLabel.textContent = 'Nivel ' + userLevel + ' — ' + xpInLevel + '/' + XP_PER_LEVEL + ' XP';
    },

    updateStreak: function () {
      var streak = Game.getStreak();
      var streakCount = getEl('streakCount');
      var streakBadge = getEl('streakBadge');

      if (streakCount) streakCount.textContent = streak;
      if (streakBadge) {
        if (streak > 0) {
          streakBadge.classList.remove('inactive');
        } else {
          streakBadge.classList.add('inactive');
        }
      }
    },

    showToast: function (type, message) {
      var container = getEl('toastContainer');
      if (!container) return;

      var icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
      };

      var toast = document.createElement('div');
      toast.className = 'toast ' + type;
      toast.innerHTML =
        '<span class="toast-icon"><i class="fas ' + (icons[type] || icons.info) + '"></i></span>' +
        '<span class="toast-msg">' + message + '</span>';

      container.appendChild(toast);

      setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      }, 3000);
    },

    showModal: function (content) {
      var overlay = getEl('modalOverlay');
      var modalContent = getEl('modalContent');
      if (overlay && modalContent) {
        modalContent.innerHTML = content;
        overlay.classList.remove('hidden');
      }
    },

    hideModal: function () {
      var overlay = getEl('modalOverlay');
      if (overlay) {
        overlay.classList.add('hidden');
      }
    },

    setTheme: function (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      Game.setTheme(theme);

      var btnTheme = getEl('btnTheme');
      if (btnTheme) {
        btnTheme.innerHTML = theme === 'dark'
          ? '<i class="fas fa-moon"></i>'
          : '<i class="fas fa-sun"></i>';
      }

      var btnThemeDark = getEl('btnThemeDark');
      var btnThemeLight = getEl('btnThemeLight');
      if (btnThemeDark) {
        btnThemeDark.className = theme === 'dark' ? 'btn btn-sm btn-toggle active' : 'btn btn-sm btn-toggle';
      }
      if (btnThemeLight) {
        btnThemeLight.className = theme === 'light' ? 'btn btn-sm btn-toggle active' : 'btn btn-sm btn-toggle';
      }

      for (var key in editors) {
        if (editors[key]) {
          try { editors[key].refresh(); } catch (e) {}
        }
      }
    },

    createEditor: function (containerId) {
      var container = getEl(containerId);
      if (!container || typeof CodeMirror === 'undefined') return null;

      var editor = CodeMirror(container, {
        mode: 'text/x-csrc',
        lineNumbers: true,
        theme: 'dracula',
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: false,
        styleActiveLine: true,
        viewportMargin: Infinity,
        extraKeys: {
          'Tab': function (cm) {
            if (cm.somethingSelected()) {
              cm.indentSelection('add');
            } else {
              cm.replaceSelection('    ', 'end');
            }
          },
          'Shift-Tab': function (cm) {
            cm.indentSelection('subtract');
          }
        }
      });

      return editor;
    },

    showConfetti: function () {
      if (typeof confetti !== 'undefined') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C9A84C', '#E4CC7A', '#4ADE80', '#38BDF8', '#F59E0B']
        });
        setTimeout(function () {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 250);
      }
    },

    revealHint: function (hintNumber) {
      if (!currentLevelData || !currentLevelData.hints) return;

      var hints = currentLevelData.hints;
      var hintText = getEl('hintText');

      if (hintNumber <= hintsRevealed + 1 && hintNumber <= hints.length) {
        hintsRevealed = hintNumber;
        hintsUsedCount = hintNumber;

        if (hintText) {
          hintText.classList.remove('hidden');
          hintText.innerHTML = hints[hintNumber - 1];
        }

        if (hintNumber >= 1) {
          var btn1 = getEl('btnHint1');
          if (btn1) { btn1.disabled = true; btn1.classList.add('used'); }
        }
        if (hintNumber >= 2) {
          var btn2 = getEl('btnHint2');
          if (btn2) { btn2.disabled = true; btn2.classList.add('used'); }
        }
        if (hintNumber >= 3) {
          var btn3 = getEl('btnHint3');
          if (btn3) { btn3.disabled = true; btn3.classList.add('used'); }
        }

        if (hintNumber < hints.length) {
          var nextBtn = getEl('btnHint' + (hintNumber + 1));
          if (nextBtn) nextBtn.disabled = false;
        }
      }
    },

    getEditor: function (name) {
      return editors[name] || null;
    },

    getCurrentLevel: function () {
      return currentLevel;
    },

    getCurrentLevelData: function () {
      return currentLevelData;
    },

    getHintsUsed: function () {
      return hintsUsedCount;
    },

    getExerciseCode: function () {
      if (editors.exercise) {
        return editors.exercise.getValue();
      }
      return '';
    },

    getFreeCode: function () {
      if (editors.freePractice) {
        return editors.freePractice.getValue();
      }
      return '';
    },

    getBugCode: function () {
      if (editors.bug) {
        return editors.bug.getValue();
      }
      return '';
    },

    setFreeEditorContent: function (code) {
      if (editors.freePractice) {
        editors.freePractice.setValue(code);
      }
    },

    setExerciseCode: function (code) {
      if (editors.exercise) {
        editors.exercise.setValue(code);
      }
    },

    setOutput: function (text) {
      var el = getEl('outputContent');
      if (el) el.textContent = text;
    },

    setErrors: function (text) {
      var el = getEl('errorsContent');
      if (el) el.textContent = text;
    },

    showOutputTab: function (tab) {
      var outputTabs = document.querySelectorAll('.output-tab');
      for (var i = 0; i < outputTabs.length; i++) {
        outputTabs[i].classList.remove('active');
      }
      var outputContent = getEl('outputContent');
      var errorsContent = getEl('errorsContent');

      if (tab === 'output') {
        if (outputContent) outputContent.classList.remove('hidden');
        if (errorsContent) errorsContent.classList.add('hidden');
        for (var i = 0; i < outputTabs.length; i++) {
          if (outputTabs[i].getAttribute('data-tab') === 'output') {
            outputTabs[i].classList.add('active');
          }
        }
      } else if (tab === 'errors') {
        if (outputContent) outputContent.classList.add('hidden');
        if (errorsContent) errorsContent.classList.remove('hidden');
        for (var i = 0; i < outputTabs.length; i++) {
          if (outputTabs[i].getAttribute('data-tab') === 'errors') {
            outputTabs[i].classList.add('active');
          }
        }
      }
    },

    setFreeOutput: function (text) {
      var el = getEl('freeOutputContent');
      if (el) el.textContent = text;
    },

    setBugOutput: function (text) {
      var el = getEl('bugOutputContent');
      if (el) el.textContent = text;
    },

    updateAuthUI: function (user) {
      var btnAuth = document.getElementById('btnAuth');
      if (!btnAuth) return;

      if (user) {
        var label = user.email || 'anon-' + user.id.slice(0, 6);
        btnAuth.innerHTML = '<i class="fas fa-user-check"></i>';
        btnAuth.title = label;
      } else {
        btnAuth.innerHTML = '<i class="fas fa-user"></i>';
        btnAuth.title = 'Iniciar sesión / Registrarse';
      }
    },

    showAuthModal: function (email, onLogout) {
      var content = '<h2>Tu cuenta</h2>' +
        '<div class="auth-info">' +
        '<p><strong>' + email + '</strong></p>' +
        '<p class="auth-status"><i class="fas fa-cloud-upload-alt"></i> Progreso sincronizado con la nube</p>' +
        '</div>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-secondary" id="btnModalClose">Cerrar</button>' +
        '<button class="btn btn-danger" id="btnModalLogout">Cerrar sesión</button>' +
        '</div>';

      this.showModal(content);

      setTimeout(function () {
        var btnClose = document.getElementById('btnModalClose');
        var btnLogout = document.getElementById('btnModalLogout');
        if (btnClose) btnClose.addEventListener('click', function () { UI.hideModal(); });
        if (btnLogout && onLogout) {
          btnLogout.addEventListener('click', function () {
            UI.hideModal();
            onLogout();
          });
        }
      }, 50);
    }
  };
})();

window.UI = UI;