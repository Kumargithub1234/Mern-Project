import axios from "axios";

let notesRootElement = document.querySelector('.notesList');

let noteBtn = document.getElementById('createNoteButton')

let notes = [];

let updatingID = null;

noteBtn.addEventListener('click',async ()=>{
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('telephone_number').value;
  const role = document.getElementById('role').value;
  const available = document.querySelector('input[name="available"]:checked')?
  document.querySelector('input[name="available"]:checked').value: "";
  
  if(!first_name || !last_name || !email || !phone || !role || !available){
    document.getElementById('warning-msg').innerHTML = 'All fields are mandatory'
  }

  let body = {first_name,last_name,email,phone,role,available}
  
  if(updatingID){
    let result = await axios.put(`http://localhost:3000/api/v1/players/update-player/${updatingID}`, body)
    updatingID = null;
    noteBtn.innerHTML = 'Submit'
  } else{
    let res = await axios.post('http://localhost:3000/api/v1/players/add-players', body)
    document.getElementById('warning-msg').innerHTML = ""
  }
  renderElementsToScreen()
})


async function renderElementsToScreen(){
  notesRootElement.innerHTML = ""
  let players = await axios.get('http://localhost:3000/api/v1/players/get-players')
  notes = players.data.data

  if(Array.isArray(notes)){
    notes.forEach(note => {
      renderNoteToList(note, note._id)
    })
  }
}


function renderNoteToList(note , uniqueId){
    let noteDiv = document.createElement('div')
    noteDiv.classList.add('note' , `note${uniqueId}`)
    let noteTitle = document.createElement('h3')
    let noteContent = document.createElement('p')
    let playerMobile = document.createElement('p')
    let playerRole = document.createElement('p')
    let playerAvailability = document.createElement('p')
    let deleteNoteButton = document.createElement('button')
    deleteNoteButton.className = 'deleteNote'
    let updateButton = document.createElement('button')
    updateButton.className = 'updateButton'

    noteTitle.innerHTML = `Name: ${note.first_name} ${note.last_name}`
    noteContent.innerHTML = `Email: ${note.email}`
    playerMobile.innerHTML = `Phone: ${note.phone}`
    playerRole.innerHTML = `Role: ${note.role}`
    playerAvailability.innerHTML = `Availability: ${note.available ? "Yes" : "No"}`
    deleteNoteButton.innerHTML = 'Delete'
    updateButton.innerHTML = 'Update'
  
    deleteNoteButton.addEventListener('click',()=>{
      removeElementOfThisId(uniqueId)
    })

    updateButton.addEventListener('click',()=>{
      updatePlayer(uniqueId, note)
    })

    noteDiv.appendChild(noteTitle)
    noteDiv.appendChild(noteContent)
    noteDiv.appendChild(playerMobile)
    noteDiv.appendChild(playerRole)
    noteDiv.appendChild(playerAvailability)
    noteDiv.appendChild(deleteNoteButton)
    noteDiv.appendChild(updateButton)
  
    notesRootElement.appendChild(noteDiv)

    document.getElementById('first_name').value = ""
    document.getElementById('last_name').value = ""
    document.getElementById('email').value = ""
    document.getElementById('telephone_number').value = ""
    document.getElementById('role').value = ""
}


async function removeElementOfThisId(id){
  let response = await axios.delete(`http://localhost:3000/api/v1/players/delete-player/${id}`)
  document.querySelector(`.note${id}`).remove();
  renderElementsToScreen()
}


async function updatePlayer(uniqueId, note){
  document.getElementById('first_name').value = note.first_name;
  document.getElementById('last_name').value = note.last_name;
  document.getElementById('email').value = note.email;
  document.getElementById('telephone_number').value = note.phone;
  document.getElementById('role').value = note.role;
  note.available? document.getElementById('role_yes').checked=true:
  document.getElementById('role_no').checked=true;
  
  updatingID = uniqueId;
  noteBtn.innerHTML = 'Update'
}

renderElementsToScreen()