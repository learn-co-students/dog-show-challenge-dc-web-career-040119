
document.addEventListener('DOMContentLoaded', () => {
  addSubmitter()
  getAllDogs()
})


function addSubmitter() {
  let dogForm = document.getElementById('dog-form')
  dogForm.addEventListener("submit", patchDog)
}

function getAllDogs() {
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(dogs => dogs.forEach(renderDog))
}

function renderDog(dog) {
  let row = document.createElement("tr")
  let body = document.getElementById("table-body")
  row.innerHTML +=
  `<tr><td>${dog.name}</td> <td>${dog.breed}</td><td>${dog.sex}</td> <td><button class="edit-btn">Edit Dog</button></td></tr>`
  row.dataset.id = dog.id
  // debugger
  attachListeners(row)
  body.appendChild(row)
}

function attachListeners(row) {
  // debugger
  let button = row.querySelector("button")
  button.addEventListener("click", editDog)
}

function editDog(e) {
  // grab all attributes of dog row
  let fieldList = e.target.parentElement.parentElement.querySelectorAll("td")
  let nameField = fieldList[0].innerText
  let breedField = fieldList[1].innerText
  let sexField = fieldList[2].innerText
  let dogId = e.target.parentElement.parentElement.dataset.id
  // add respective attrs to corresponding fields in form
  let dogForm = document.getElementById('dog-form')
  dogForm.children["name"].value = nameField
  dogForm.children["breed"].value = breedField
  dogForm.children["sex"].value = sexField
  dogForm.dataset.id = dogId
}

function patchDog(e) {
  // debugger
  e.preventDefault()
  formName = e.target.name.value
  formBreed = e.target.breed.value
  formSex = e.target.sex.value
  id = e.target.dataset.id

  let dogData = {name: formName, breed: formBreed, sex: formSex}

  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(dogData)
  })
  .then(response => response.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .then( () => resetPage())
}

function resetPage() {
  clearForm()
  clearPage()
  getAllDogs()
  // .catch(error => console.error('Error:', error));
}

function clearForm() {
  let dogForm = document.getElementById('dog-form')
  dogForm.reset()
}

function clearPage() {
  let dogTable = document.getElementById("table-body")
  dogTable.innerHTML = ""
}

// ---------DONEZO----------
// Render all dogs in table
// ex:
// `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`

// ---------DONEZO----------
// - Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.


// question - adding submit listeners

// ---------DONEZO----------
// - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).


// - Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.
