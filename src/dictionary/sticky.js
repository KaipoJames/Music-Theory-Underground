//prettier-ignore
//const blackNoteIds = ['CS1', 'DS1', 'FS1', 'GS1', 'AS1', 'CS2', 'DS2', 'FS2', 'GS2', 'AS2', 'CS3', 'DS3', 'FS3', 'GS3', 'AS3', 'CS4', 'DS4', 'FS4', 'GS4', 'AS4', 'CS5', 'DS5', 'FS5', 'GS5', 'AS5', 'CS6', 'DS6', 'FS6', 'GS6', 'AS6',]
const NoteIds = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// When the user scrolls, execute addStickyClass()
window.onscroll = () => {
  addStickyClass();
};

var mainContainer = document.querySelector(".main-container");
var keyBoard = document.querySelector(".keyboard");

// Get the offset position of the main-container
var sticky = mainContainer.offsetTop;

console.log("i run twice");

// When the scroll position is reached, add the sticky class. Otherwise, remove it.
function addStickyClass() {
  if (window.pageYOffset >= sticky) {
    mainContainer.classList.add("sticky");
  } else {
    mainContainer.classList.remove("sticky");
  }
}

export { NoteIds as NoteIdentifiers };
