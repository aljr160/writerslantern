(function () {
  var storageKey = "writers-lantern-state";
  var defaultMood = "ready";
  var defaultGenre = "general";
  var data = window.WRITER_LANTERN_DATA || { motivations: [], moodMotivations: {}, moodPrompts: {}, prompts: [], checklist: {} };

  function getTodayKey() {
    var now = new Date();
    var year = String(now.getFullYear());
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function getDayNumber(dateKey) {
    return Math.floor(new Date(dateKey + "T00:00:00").getTime() / 86400000);
  }

  function getDailyItem(items, offset) {
    if (!items.length) {
      return "";
    }

    var dayNumber = getDayNumber(getTodayKey());
    var index = Math.abs(dayNumber + offset) % items.length;
    return items[index];
  }

  function getRotatingItem(items, offset, extraStep) {
    if (!items.length) {
      return "";
    }

    var dayNumber = getDayNumber(getTodayKey());
    var index = Math.abs(dayNumber + offset + extraStep) % items.length;
    return items[index];
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(storageKey);
      if (!raw) {
        return { streak: 0, lastCheckIn: "", mood: defaultMood, genre: defaultGenre, promptIndex: 0, completed: {} };
      }

      var parsed = JSON.parse(raw);
      return {
        streak: Number(parsed.streak) || 0,
        lastCheckIn: parsed.lastCheckIn || "",
        mood: parsed.mood || defaultMood,
        genre: parsed.genre || defaultGenre,
        promptIndex: Number(parsed.promptIndex) || 0,
        completed: parsed.completed || {}
      };
    } catch (error) {
      return { streak: 0, lastCheckIn: "", mood: defaultMood, genre: defaultGenre, promptIndex: 0, completed: {} };
    }
  }

  function saveState(state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function getMoodMessage(state) {
    var moodMessages = data.moodMotivations && data.moodMotivations[state.mood];
    if (moodMessages && moodMessages.length) {
      return getDailyItem(moodMessages, 1);
    }

    return getDailyItem(data.motivations, 0);
  }

  function getMoodPrompt(state) {
    var extraStep = state.promptIndex || 0;
    var moodPrompts = data.moodPrompts && data.moodPrompts[state.mood];
    if (moodPrompts && moodPrompts.length) {
      return getRotatingItem(moodPrompts, 5, extraStep);
    }

    return getRotatingItem(data.prompts, 3, extraStep);
  }

  function renderChecklist(state) {
    var container = document.getElementById("checklist-sections");
    var genreSelect = document.getElementById("genre-select");
    if (!container) {
      return;
    }

    var generalSections = data.checklist && data.checklist.general ? data.checklist.general : [];
    var genreSections = data.checklist && data.checklist[state.genre] ? data.checklist[state.genre] : [];
    var sections = state.genre === "general" ? generalSections : generalSections.concat(genreSections);

    if (genreSelect) {
      genreSelect.value = state.genre;
    }

    container.innerHTML = sections
      .map(function (section, sectionIndex) {
        var items = section.items
          .map(function (item, itemIndex) {
            var key = "check-" + state.genre + "-" + sectionIndex + "-" + itemIndex;
            var checked = state.completed && state.completed[key] ? "checked" : "";
            return '<label class="checklist-item"><input type="checkbox" data-check-key="' + key + '" ' + checked + '> <span>' + item + '</span></label>';
          })
          .join("");

        return '<section class="checklist-group"><h3 class="checklist-group-title">' + section.title + '</h3><div class="checklist-items">' + items + '</div></section>';
      })
      .join("");
  }

  function updateMoodButtons(activeMood) {
    var buttons = document.querySelectorAll(".mood-button");
    Array.prototype.forEach.call(buttons, function (button) {
      var isActive = button.getAttribute("data-mood") === activeMood;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function getCheckInView(state) {
    var today = getTodayKey();
    var last = state.lastCheckIn;
    var alreadyCheckedIn = last === today;

    if (!last) {
      return {
        streak: state.streak,
        alreadyCheckedIn: alreadyCheckedIn,
        note: "Start with one brief writing touchpoint today."
      };
    }

    var gap = getDayNumber(today) - getDayNumber(last);
    if (gap > 1) {
      return {
        streak: 0,
        alreadyCheckedIn: alreadyCheckedIn,
        note: "A missed day is just a pause. Restart with one tiny scene or sentence."
      };
    }

    return {
      streak: state.streak,
      alreadyCheckedIn: alreadyCheckedIn,
      note: alreadyCheckedIn
        ? "Today's visit is logged. Protect tomorrow by making the next step obvious."
        : "You're still in rhythm. Count anything that keeps contact with the draft."
    };
  }

  function toLabel(value) {
    if (value === "scifi") {
      return "Sci-Fi";
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function render() {
    var state = loadState();
    var view = getCheckInView(state);
    var streakCount = view.alreadyCheckedIn ? state.streak : view.streak;
    var currentStateEl = document.getElementById("current-state");
    var motivationEl = document.getElementById("motivation-message");
    var promptEl = document.getElementById("writing-prompt");
    var streakEl = document.getElementById("streak-text");
    var noteEl = document.getElementById("checkin-note");
    var button = document.getElementById("checkin-button");

    updateMoodButtons(state.mood);
    renderChecklist(state);

    if (currentStateEl) {
      currentStateEl.textContent = "Mood: " + toLabel(state.mood) + " • Genre: " + toLabel(state.genre);
    }
    if (motivationEl) {
      motivationEl.textContent = getMoodMessage(state);
    }
    if (promptEl) {
      promptEl.textContent = getMoodPrompt(state);
    }
    if (streakEl) {
      streakEl.textContent =
        streakCount > 0
          ? "Current streak: " + streakCount + " day" + (streakCount === 1 ? "" : "s")
          : "Current streak: begin with today";
    }
    if (noteEl) {
      noteEl.textContent = view.note;
    }
    if (button) {
      button.disabled = view.alreadyCheckedIn;
      button.textContent = view.alreadyCheckedIn
        ? "Today's writing moment is logged"
        : "Mark today's writing moment";
    }
  }

  function handleMoodSelect(event) {
    var mood = event.currentTarget.getAttribute("data-mood") || defaultMood;
    var state = loadState();
    state.mood = mood;
    state.promptIndex = 0;
    saveState(state);
    render();
  }

  function handleGenerateAnother() {
    var state = loadState();
    state.promptIndex = (state.promptIndex || 0) + 1;
    saveState(state);
    render();
  }

  function handleGenreChange(event) {
    var state = loadState();
    state.genre = event.target.value || defaultGenre;
    saveState(state);
    render();
  }

  function handleChecklistToggle(event) {
    var target = event.target;
    if (!target.matches("input[type='checkbox'][data-check-key]")) {
      return;
    }

    var state = loadState();
    state.completed = state.completed || {};
    state.completed[target.getAttribute("data-check-key")] = target.checked;
    saveState(state);
  }

  function handleCheckIn() {
    var today = getTodayKey();
    var state = loadState();

    if (state.lastCheckIn === today) {
      render();
      return;
    }

    var nextStreak = 1;
    if (state.lastCheckIn) {
      var gap = getDayNumber(today) - getDayNumber(state.lastCheckIn);
      nextStreak = gap === 1 ? state.streak + 1 : 1;
    }

    saveState({
      streak: nextStreak,
      lastCheckIn: today,
      mood: state.mood || defaultMood,
      genre: state.genre || defaultGenre,
      promptIndex: state.promptIndex || 0,
      completed: state.completed || {}
    });

    render();
  }

  Array.prototype.forEach.call(document.querySelectorAll(".mood-button"), function (button) {
    button.addEventListener("click", handleMoodSelect);
  });

  var generateButton = document.getElementById("generate-button");
  var genreSelect = document.getElementById("genre-select");
  var checklistSections = document.getElementById("checklist-sections");
  var checkinButton = document.getElementById("checkin-button");

  if (generateButton) {
    generateButton.addEventListener("click", handleGenerateAnother);
  }
  if (genreSelect) {
    genreSelect.addEventListener("change", handleGenreChange);
  }
  if (checklistSections) {
    checklistSections.addEventListener("change", handleChecklistToggle);
  }
  if (checkinButton) {
    checkinButton.addEventListener("click", handleCheckIn);
  }

  render();
})();
