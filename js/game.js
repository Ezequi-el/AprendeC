var Game = (function () {
  var STORAGE_KEY = "juego-c-progreso";

  var XP_PER_USER_LEVEL = 50;

  var data = {
    currentLevel: 1,
    levels: {},
    xp: 0,
    streak: 0,
    lastPlayDate: null,
    achievements: [],
    theme: "dark",
    bugsCompleted: 0
  };

  var _supabaseInitialized = false;

  function getTodayString() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function calculateStars(attempts, hintsUsed) {
    if (attempts === 1 && hintsUsed === 0) return 3;
    if (hintsUsed >= 2) return 1;
    if (attempts > 2) return 1;
    return 2;
  }

  function getLevelXp(levelId) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (LEVELS[i].id === levelId) {
        return LEVELS[i].xp;
      }
    }
    return 10;
  }

  return {
    init: function () {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          var parsed = JSON.parse(stored);
          data.currentLevel = parsed.currentLevel || 1;
          data.levels = parsed.levels || {};
          data.xp = parsed.xp || 0;
          data.streak = parsed.streak || 0;
          data.lastPlayDate = parsed.lastPlayDate || null;
          data.achievements = parsed.achievements || [];
          data.theme = parsed.theme || "dark";
          data.bugsCompleted = parsed.bugsCompleted || 0;
        } catch (e) {
          data = {
            currentLevel: 1,
            levels: {},
            xp: 0,
            streak: 0,
            lastPlayDate: null,
            achievements: [],
            theme: "dark",
            bugsCompleted: 0
          };
        }
      }

      this.initSupabase();
    },

    save: function () {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.syncToSupabase();
    },

    initSupabase: function () {
      if (_supabaseInitialized) return;
      if (!window.__supabase) return;

      _supabaseInitialized = true;
      var self = this;

      window.__supabase.auth.onAuthStateChange(function (event, session) {
        if (event === 'SIGNED_IN' && session) {
          self.syncFromSupabase();
        }
      });

      window.__supabase.auth.getSession().then(function (result) {
        if (result.data.session) {
          self.syncFromSupabase();
        }
      });
    },

    syncToSupabase: function () {
      if (!window.__supabase) return;

      var payload = JSON.parse(JSON.stringify(data));

      window.__supabase.auth.getSession().then(function (result) {
        var session = result.data.session;
        if (!session) return;

        var userId = session.user.id;
        var today = getTodayString();

        window.__supabase.from('progress').upsert({
          id: userId + '-' + today,
          user_id: userId,
          game_date: today,
          data: payload
        }, { onConflict: 'id' }).then();
      });
    },

    syncFromSupabase: function () {
      if (!window.__supabase) return;

      var self = this;
      window.__supabase.auth.getSession().then(function (result) {
        var session = result.data.session;
        if (!session) return;

        var userId = session.user.id;

        window.__supabase.from('progress')
          .select('data')
          .eq('user_id', userId)
          .order('game_date', { ascending: false })
          .limit(1)
          .then(function (result) {
            if (result.error) return;
            if (result.data && result.data.length > 0) {
              var cloudData = result.data[0].data;
              var merged = self._mergeProgress(data, cloudData);
              if (merged) {
                data = merged;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
              }
            }
          });
      });
    },

    _mergeProgress: function (local, cloud) {
      if (!cloud) return null;
      var merged = JSON.parse(JSON.stringify(local));

      var localXp = merged.xp || 0;
      var cloudXp = cloud.xp || 0;

      if (cloudXp > localXp) {
        merged.xp = cloudXp;
        merged.levels = cloud.levels || {};
        merged.streak = cloud.streak || 0;
        merged.currentLevel = cloud.currentLevel || 1;
        merged.achievements = cloud.achievements || [];
        merged.bugsCompleted = cloud.bugsCompleted || 0;
        return merged;
      } else if (cloudXp === localXp && cloudXp > 0) {
        for (var key in cloud.levels) {
          if (!merged.levels[key] || (cloud.levels[key].completed && !merged.levels[key].completed)) {
            merged.levels[key] = cloud.levels[key];
            merged.currentLevel = Math.max(merged.currentLevel, parseInt(key) + 1);
          }
        }
        if (cloud.achievements) {
          cloud.achievements.forEach(function (a) {
            if (merged.achievements.indexOf(a) === -1) {
              merged.achievements.push(a);
            }
          });
        }
        return merged;
      }
      return null;
    },

    completeLevel: function (levelId, attempts, hintsUsed) {
      if (typeof attempts === "undefined") attempts = 1;
      if (typeof hintsUsed === "undefined") hintsUsed = 0;

      var stars = calculateStars(attempts, hintsUsed);
      var isFirstCompletion = !this.isLevelCompleted(levelId);

      data.levels[String(levelId)] = {
        completed: true,
        stars: stars,
        attempts: attempts,
        hintsUsed: hintsUsed
      };

      if (isFirstCompletion) {
        var xpAmount = getLevelXp(levelId);
        this.addXP(xpAmount);
      }

      if (levelId >= data.currentLevel) {
        data.currentLevel = levelId + 1;
      }

      var levelData = null;
      for (var i = 0; i < LEVELS.length; i++) {
        if (LEVELS[i].id === levelId) {
          levelData = LEVELS[i];
          break;
        }
      }
      if (levelData && levelData.bugMode) {
        var alreadyCounted = false;
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            var parsed = JSON.parse(stored);
            if (parsed.levels && parsed.levels[String(levelId)] && parsed.levels[String(levelId)].bugCompleted) {
              alreadyCounted = true;
            }
          } catch (e) {}
        }
        if (!alreadyCounted) {
          data.bugsCompleted = (data.bugsCompleted || 0) + 1;
          data.levels[String(levelId)].bugCompleted = true;
        }
      }

      this.updateStreak();
      this.save();
      this.checkAchievements();

      return {
        stars: stars,
        xpEarned: isFirstCompletion ? getLevelXp(levelId) : 0
      };
    },

    getLevelProgress: function (levelId) {
      var progress = data.levels[String(levelId)];
      if (!progress) {
        return { completed: false, stars: 0, attempts: 0, hintsUsed: 0 };
      }
      return {
        completed: progress.completed,
        stars: progress.stars,
        attempts: progress.attempts,
        hintsUsed: progress.hintsUsed
      };
    },

    getCurrentLevel: function () {
      return data.currentLevel;
    },

    isLevelUnlocked: function (levelId) {
      return true;
    },

    isLevelCompleted: function (levelId) {
      var progress = data.levels[String(levelId)];
      return progress && progress.completed === true;
    },

    isModuleCompleted: function (moduleId) {
      var moduleLevels = null;
      for (var i = 0; i < MODULES.length; i++) {
        if (MODULES[i].id === moduleId) {
          moduleLevels = MODULES[i].levels;
          break;
        }
      }
      if (!moduleLevels) return false;
      for (var j = 0; j < moduleLevels.length; j++) {
        if (!this.isLevelCompleted(moduleLevels[j])) return false;
      }
      return true;
    },

    isAllCompleted: function () {
      for (var i = 0; i < LEVELS.length; i++) {
        if (!this.isLevelCompleted(LEVELS[i].id)) return false;
      }
      return true;
    },

    allThreeStars: function () {
      var completedCount = 0;
      var threeStarCount = 0;
      for (var i = 0; i < LEVELS.length; i++) {
        var progress = data.levels[String(LEVELS[i].id)];
        if (progress && progress.completed) {
          completedCount++;
          if (progress.stars === 3) {
            threeStarCount++;
          }
        }
      }
      if (completedCount === 0) return false;
      return completedCount === threeStarCount && completedCount === LEVELS.length;
    },

    getStreak: function () {
      return data.streak;
    },

    updateStreak: function () {
      var today = getTodayString();
      if (data.lastPlayDate === today) {
        return;
      }
      if (data.lastPlayDate) {
        var last = new Date(data.lastPlayDate);
        var now = new Date(today);
        var diffMs = now.getTime() - last.getTime();
        var diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          data.streak += 1;
        } else if (diffDays > 1) {
          data.streak = 1;
        }
      } else {
        data.streak = 1;
      }
      data.lastPlayDate = today;
    },

    getBugsCompleted: function () {
      return data.bugsCompleted || 0;
    },

    addXP: function (amount) {
      data.xp += amount;
    },

    getXP: function () {
      return data.xp;
    },

    getUserLevel: function () {
      return Math.floor(data.xp / XP_PER_USER_LEVEL) + 1;
    },

    getTheme: function () {
      return data.theme;
    },

    setTheme: function (theme) {
      data.theme = theme;
      this.save();
    },

    resetProgress: function () {
      data = {
        currentLevel: 1,
        levels: {},
        xp: 0,
        streak: 0,
        lastPlayDate: null,
        achievements: [],
        theme: data.theme,
        bugsCompleted: 0
      };
      this.save();
    },

    checkAchievements: function () {
      var newlyUnlocked = [];
      for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        var ach = ACHIEVEMENTS[i];
        if (data.achievements.indexOf(ach.id) === -1) {
          if (ach.condition(this)) {
            data.achievements.push(ach.id);
            newlyUnlocked.push(ach.id);
          }
        }
      }
      if (newlyUnlocked.length > 0) {
        this.save();
      }
      return newlyUnlocked;
    }
  };
})();

window.Game = Game;