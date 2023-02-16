const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const noteColor = document.getElementById('note-color');
const notePin = document.getElementById('note-pin');
const noteList = document.getElementById('note-list');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
    if (noteTitle.value === '' || noteContent.value === '') {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }
  
    const note = {
      id: Date.now(),
      title: noteTitle.value,
      content: noteContent.value,
      color: noteColor.value,
      pin: notePin.checked,
      created: new Date() // dodanie daty utworzenia notatki
    };
  
    notes.push(note);
    saveNotes();
    renderNotes();
    noteForm.reset();
  }

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

function pinNote(id) {
  const noteIndex = notes.findIndex(note => note.id === id);
  const note = notes[noteIndex];
  note.pin = !note.pin;
  notes.splice(noteIndex, 1);
  if (note.pin) {
    notes.unshift(note);
  } else {
    notes.push(note);
  }
  saveNotes();
  renderNotes();
}

function editNoteTitle(id, newTitle) {
  const note = notes.find(note => note.id === id);
  note.title = newTitle;
  saveNotes();
}

function editNoteContent(id, newContent) {
  const note = notes.find(note => note.id === id);
  note.content = newContent;
  saveNotes();
}

function renderNotes() {
    noteList.innerHTML = '';
  
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.style.backgroundColor = note.color;
  
      const titleElement = document.createElement('h2');
      titleElement.innerText = note.title;
      titleElement.contentEditable = true;
      titleElement.addEventListener('blur', () => {
        editNoteTitle(note.id, titleElement.innerText);
      });
  
      const contentElement = document.createElement('p');
      contentElement.innerText = note.content;
      contentElement.contentEditable = true;
      contentElement.addEventListener('blur', () => {
        editNoteContent(note.id, contentElement.innerText);
      });
  
      const createdElement = document.createElement('p');
      createdElement.innerText = `Utworzono: ${note.created.toLocaleString('pl-PL', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})}`;
      createdElement.classList.add('created');
  
      const actionsElement = document.createElement('div');
      actionsElement.classList.add('actions');
  
      const pinElement = document.createElement('button');
      pinElement.innerText = note.pin ? 'Odepnij' : 'Przypnij';
      pinElement.addEventListener('click', () => {
        pinNote(note.id);
      });
  
      const deleteElement = document.createElement('button');
      deleteElement.innerText = 'Usuń';
      deleteElement.classList.add('delete-btn');
      deleteElement.addEventListener('click', () => {
        deleteNote(note.id);
      });
  
      actionsElement.appendChild(pinElement);
      actionsElement.appendChild(deleteElement);
  
      noteElement.appendChild(titleElement);
      noteElement.appendChild(createdElement); // dodanie elementu z datą utworzenia
      noteElement.appendChild(contentElement);
      noteElement.appendChild(actionsElement);
  
      noteList.appendChild(noteElement);
    });
  }

renderNotes();

noteForm.addEventListener('submit', event => {
  event.preventDefault();
  addNote();
});
