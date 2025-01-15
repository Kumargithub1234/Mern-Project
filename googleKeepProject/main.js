import axios from "axios";

let notesRootElement = document.querySelector('.notesList');

let notes = [];

async function renderElementsToScreen(){
  let players = await axios.get('http://localhost:3000/api/v1/players/get-players')
  console.log(players)

  if(Array.isArray(notes)){
    notes.forEach(note => {
      renderNoteToList(note, note.uniqueId)
    })
  }
}


document.querySelector('#createNoteButton').addEventListener('click',()=>{
  let uniqueId = 'note' + Math.floor(Math.random()* 100+1)

  let note = {
    title : document.querySelector('#createNoteTitle').value,
    content : document.querySelector('#createNoteContent').value
  }

  addNoteToLocalStorage(note, uniqueId)
  renderNoteToList(note, uniqueId)
})


function renderNoteToList(note , uniqueId){
   if(document.querySelector('#createNoteTitle').value.length>0 && document.querySelector('#createNoteContent').value.length>0){
    let noteDiv = document.createElement('div')
    noteDiv.classList.add('note' , uniqueId)
    let noteTitle = document.createElement('h3')
    let noteContent = document.createElement('p')
    let deleteNoteButton = document.createElement('button')
    deleteNoteButton.className = 'deleteNote'

    noteTitle.innerHTML = note.title
    noteContent.innerHTML = note.content
    deleteNoteButton.innerHTML = 'Delete Note'
  
    deleteNoteButton.addEventListener('click',()=>{
      removeElementOfThisId(uniqueId)
    })

    noteDiv.appendChild(noteTitle)
    noteDiv.appendChild(noteContent)
    noteDiv.appendChild(deleteNoteButton)
  
    notesRootElement.appendChild(noteDiv)
  
    document.querySelector('#createNoteTitle').value = "";
    document.querySelector('#createNoteContent').value = "";
  }
  else{
    alert('Title and Content are Empty')
  }
}


function removeElementOfThisId(id){
  document.querySelector('.' + id).remove();
  notes = JSON.parse(localStorage.getItem('notes'))

  let index = notes.findIndex(note=> note.uniqueId == id)
  notes.splice(index,1)
  notes = localStorage.setItem('notes', JSON.stringify(notes))
}


renderElementsToScreen()