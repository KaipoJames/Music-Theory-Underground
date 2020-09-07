import { NoteIdentifiers } from "./sticky.js";

import { Chord, note } from "@tonaljs/tonal";
import { ChordType } from "@tonaljs/tonal";
import { Howl, Howler } from "howler";
import { Scale, Note } from "@tonaljs/tonal";

let noteCombs = [];
let finalComb = [];

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

const SetUpApp = {
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
    for (const noteName of noteSequence) {
      let midiInt = Note.midi(noteName);
      const midiString = midiInt.toString();
      sound.play(midiString);
    }
  },
};

//Main App Object Conatining All Of Our Functions
const app = {
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

      //Add the sharp class to all black keys
      blackNote_Db.classList.add("sharp");
      blackNote_Eb.classList.add("sharp");
      blackNote_Gb.classList.add("sharp");
      blackNote_Ab.classList.add("sharp");
      blackNote_Bb.classList.add("sharp");

      //Add the data-note identifier to each note, and id for every black key
      whiteNote_C.setAttribute("data-note", "C" + j);
      blackNote_Db.setAttribute("data-note", "C#" + j);
      blackNote_Db.setAttribute("id", "Db" + j);
      whiteNote_D.setAttribute("data-note", "D" + j);
      blackNote_Db.setAttribute("data-note", "D#" + j);
      blackNote_Db.setAttribute("id", "Eb" + j);
      whiteNote_E.setAttribute("data-note", "E" + j);
      whiteNote_F.setAttribute("data-note", "F" + j);
      blackNote_Gb.setAttribute("data-note", "F#" + j);
      blackNote_Gb.setAttribute("id", "Gb" + j);
      whiteNote_G.setAttribute("data-note", "G" + j);
      blackNote_Ab.setAttribute("data-note", "G#" + j);
      blackNote_Ab.setAttribute("id", "Ab" + j);
      whiteNote_A.setAttribute("data-note", "A" + j);
      blackNote_Bb.setAttribute("data-note", "A#" + j);
      blackNote_Bb.setAttribute("id", "Bb" + j);
      whiteNote_B.setAttribute("data-note", "B" + j);

      //Add all Keys to Keyboard DOM Object
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
    }
  },

  addKeysToKeyboard() {
    this.createOctaves(6);
    var whiteNote = this.createElement("div", "white-note");
    whiteNote.setAttribute("data-note", "C7");
    keyBoard.appendChild(whiteNote);
  },
};

SetUpApp.init();
app.init();
