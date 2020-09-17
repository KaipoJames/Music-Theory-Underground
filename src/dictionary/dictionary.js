import { NoteIdentifiers } from "./sticky.js";

import { Chord } from "@tonaljs/tonal";
import { ChordType } from "@tonaljs/tonal";
import { Howl, Howler } from "howler";
import { Note } from "@tonaljs/tonal";

let pianoKeys = [];

let selectedStartNote;
let selectedStartOctave;
var j = 0;

const sound = new Howl({
  src: ["../../assets/piano-sprite.mp3"],
  onload() {
    console.log("loaded sound file. do something here");
    soundEngine.init();
  },
  onloaderror(e, msg) {
    console.log("Error", e, msg);
  },
});

const startNotes = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
];
const octaves = ["1", "2", "3", "4", "5", "6", "7"];

const startNoteSelector = document.querySelector("#start-note");
const octaveNoteSelector = document.querySelector("#octave-select");
const notesDisplay = document.querySelector("#notes");
const intervalDisplay = document.querySelector("#intervals");
const buttons = document.querySelector(".buttons");
const chords = ChordType.symbols();
var keyBoard = document.querySelector(".keyboard");

const SetUpButtons = {
  init() {
    this.setupStartNotes();
    this.setUpOctaves();
    this.setUpButtons();
    this.setUpEventListeners();
    // this.updateChordsNotesDisplay();
  },
  setupStartNotes() {
    startNotes.forEach((noteName) => {
      let noteNameOption = this.createElement("option", noteName);
      startNoteSelector.appendChild(noteNameOption);
    });
  },
  setUpOctaves() {
    octaves.forEach((octaveName) => {
      let octaveNameOption = this.createElement("option", octaveName);
      octaveNoteSelector.appendChild(octaveNameOption);
    });
  },
  createElement(elementName, content) {
    let element = document.createElement(elementName);
    element.innerHTML = content;
    return element;
  },
  setUpButtons() {
    chords.forEach((chordSymbol) => {
      let chordSymbolBtn = this.createElement("button", chordSymbol);
      buttons.appendChild(chordSymbolBtn);
    });
  },
  displayAndPlayChords() {
    // Update Intervals
    const chordSymbol = ChordType.get(event.target.innerHTML);
    const chordIntervals = chordSymbol.intervals;
    intervalDisplay.innerHTML = chordIntervals.join(" - ");

    const chordName = event.target.innerHTML;
    const currentNote = startNoteSelector.value;
    const currentOctave = octaveNoteSelector.value;
    const combined = currentNote + chordName;
    const chordObject = Chord.get(combined);
    const chordNotes = chordObject.notes;
    for (var i = 0; i < chordNotes.length; i++) {
      chordNotes[i] = chordNotes[i] + currentOctave;
    }
    notesDisplay.innerHTML = chordNotes.join(" - ");
    this.getChordNotes(chordNotes);
    console.log("ChordNotes = " + chordNotes);

    soundEngine.playChord(chordNotes);
  },

  getChordNotes(note_s) {
    const notes = [];
    notes.push(note_s);
    console.log("Chord Notes: " + notes);
    return notes;
  },

  setUpEventListeners() {
    startNoteSelector.addEventListener("change", () => {
      selectedStartNote = startNoteSelector.value;
    });
    octaveNoteSelector.addEventListener("change", () => {
      selectedStartOctave = octaveNoteSelector.value;
    });
    buttons.addEventListener("click", (event) => {
      // Update Note Names, Intervals, and play Chords
      this.displayAndPlayChords(event);
    });
  },
};

const soundEngine = {
  init() {
    const noteLength = 2400;
    let timeIndex = 0;
    // Loop through the midi values of every note(@note/tonaljs)
    for (let i = 24; i <= 96; i++) {
      sound["_sprite"][i] = [timeIndex, noteLength];
      timeIndex += noteLength;
    }
  },

  playChord(noteSequence) {
    SetUpKeyboard.clearKeyboard();
    for (const noteName of noteSequence) {
      let midiInt = Note.midi(noteName);
      const midiString = midiInt.toString();
      sound.play(midiString);

      for (const note of pianoKeys) {
        if (noteName == note.id) {
          if (note.classList.contains("sharp")) {
            note.classList.add("black-key-pressed");
          } else {
            note.classList.add("white-key-pressed");
          }
        }
        if (note.getAttribute("data-note") == noteName) {
          if (note.classList.contains("shasrp")) {
            note.classList.add("black-key-pressed");
          }
        }
        if (noteName == note.classList[2]) {
          note.classList.add("white-key-pressed");
        }
      }
    }
  },

  playNote(note) {
    let midiKey = Note.midi(note.id);
    const midiString = midiKey.toString();
    sound.play(midiString);
  },

  stopSound(note) {
    let stopID = Note.midi(note.id);
    const midiString = stopID.toString();
    sound.stop(midiString);
  },
};

//Main App Object Conatining All Of Our Functions
const SetUpKeyboard = {
  init() {
    this.addKeysToKeyboard();
  },

  createElement(element, className) {
    const newNote = document.createElement(element);
    newNote.classList.add(className);
    newNote.classList.add("note");
    return newNote;
  },
  createOctaves(n) {
    for (var i = 0; i < n; i++) {
      j++;
      //Create divs that represent keys. Add Event Listeners Later.
      var whiteNote_C = this.createElement("div", "white-note");
      var blackNote_Db = this.createElement("div", "black-note");
      var whiteNote_D = this.createElement("div", "white-note");
      var blackNote_Eb = this.createElement("div", "black-note");
      var whiteNote_E = this.createElement("div", "white-note");
      var whiteNote_F = this.createElement("div", "white-note");
      var blackNote_Gb = this.createElement("div", "black-note");
      var whiteNote_G = this.createElement("div", "white-note");
      var blackNote_Ab = this.createElement("div", "black-note");
      var whiteNote_A = this.createElement("div", "white-note");
      var blackNote_Bb = this.createElement("div", "black-note");
      var whiteNote_B = this.createElement("div", "white-note");

      //Add the data-note identifier to each note, and an id
      whiteNote_C.setAttribute("data-note", "C" + j);
      whiteNote_C.setAttribute("id", "C" + j);
      whiteNote_C.classList.add("B#" + j);
      blackNote_Db.setAttribute("data-note", "Db" + j);
      blackNote_Db.setAttribute("id", "C#" + j);
      whiteNote_D.setAttribute("data-note", "D" + j);
      whiteNote_D.setAttribute("id", "D" + j);
      blackNote_Eb.setAttribute("data-note", "Eb" + j);
      blackNote_Eb.setAttribute("id", "D#" + j);
      whiteNote_E.setAttribute("data-note", "E" + j);
      whiteNote_E.setAttribute("id", "E" + j);
      whiteNote_F.setAttribute("data-note", "F" + j);
      whiteNote_F.setAttribute("id", "F" + j);
      whiteNote_F.classList.add("E#" + j);
      blackNote_Gb.setAttribute("data-note", "Gb" + j);
      blackNote_Gb.setAttribute("id", "F#" + j);
      whiteNote_G.setAttribute("data-note", "G" + j);
      whiteNote_G.setAttribute("id", "G" + j);
      blackNote_Ab.setAttribute("data-note", "Ab" + j);
      blackNote_Ab.setAttribute("id", "G#" + j);
      whiteNote_A.setAttribute("data-note", "A" + j);
      whiteNote_A.setAttribute("id", "A" + j);
      blackNote_Bb.setAttribute("data-note", "Bb" + j);
      blackNote_Bb.setAttribute("id", "A#" + j);
      whiteNote_B.setAttribute("data-note", "B" + j);
      whiteNote_B.setAttribute("id", "B" + j);

      //Add the sharp class to all black keys
      blackNote_Db.classList.add("sharp");
      blackNote_Eb.classList.add("sharp");
      blackNote_Gb.classList.add("sharp");
      blackNote_Ab.classList.add("sharp");
      blackNote_Bb.classList.add("sharp");

      //Add all Keys to Keyboard DOM Object - Make them appear on keyboard
      keyBoard.appendChild(whiteNote_C);
      keyBoard.appendChild(blackNote_Db);
      keyBoard.appendChild(whiteNote_D);
      keyBoard.appendChild(blackNote_Eb);
      keyBoard.appendChild(whiteNote_E);
      keyBoard.appendChild(whiteNote_F);
      keyBoard.appendChild(blackNote_Gb);
      keyBoard.appendChild(whiteNote_G);
      keyBoard.appendChild(blackNote_Ab);
      keyBoard.appendChild(whiteNote_A);
      keyBoard.appendChild(blackNote_Bb);
      keyBoard.appendChild(whiteNote_B);

      // Add elements to helper array(to add event listeners later)
      pianoKeys.push(whiteNote_C);
      pianoKeys.push(blackNote_Db);
      pianoKeys.push(whiteNote_D);
      pianoKeys.push(blackNote_Eb);
      pianoKeys.push(whiteNote_E);
      pianoKeys.push(whiteNote_F);
      pianoKeys.push(blackNote_Gb);
      pianoKeys.push(whiteNote_G);
      pianoKeys.push(blackNote_Ab);
      pianoKeys.push(whiteNote_A);
      pianoKeys.push(blackNote_Bb);
      pianoKeys.push(whiteNote_B);
    }
    // C7 all alone :)
    var whiteNote_C7 = this.createElement("div", "white-note");
    whiteNote_C7.setAttribute("data-note", "C7");
    whiteNote_C7.setAttribute("id", "C7");
    keyBoard.appendChild(whiteNote_C7);
  },

  addKeysToKeyboard() {
    this.createOctaves(6);
    this.addClickListeners();
  },
  clearKeyboard() {
    for (const key of pianoKeys) {
      if (key.classList.contains("black-key-pressed")) {
        key.classList.remove("black-key-pressed");
      } else if (key.classList.contains("white-key-pressed")) {
        key.classList.remove("white-key-pressed");
      }
    }
  },

  // Use a CLOSURE in these two methods to save the index of current iteration.
  // Otherwise, it would overwrite every iteration and return only the last iteration.
  addClickListeners() {
    for (var i = 0; i < pianoKeys.length; i++) {
      pianoKeys[i].addEventListener("click", this.keyInteractions(i));
    }
  },
  keyInteractions(i) {
    return function () {
      // Check if key is black or white, then add appropriate class
      if (pianoKeys[i].classList.contains("sharp") == true) {
        pianoKeys[i].classList.add("black-key-pressed");
        soundEngine.playNote(pianoKeys[i]);
        setTimeout(function () {
          pianoKeys[i].classList.remove("black-key-pressed");
        }, 900);
      } else {
        pianoKeys[i].classList.add("white-key-pressed");
        soundEngine.playNote(pianoKeys[i]);
        setTimeout(function () {
          pianoKeys[i].classList.remove("white-key-pressed");
        }, 900);
      }
    };
  },
};

SetUpButtons.init();
SetUpKeyboard.init();
