class Dog{
  constructor(dog){
    this.id = dog.id
    this.name = dog.name
    this.breed = dog.breed
    this.sex = dog.sex
    Dog.all.push(this)
  }

  static all = []

  static renderDogs(){
    fetch(dogURL)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach( (dog) => {
      let dogInstance = new Dog(dog)
      dogInstance.showDogs()
    })

  )}

  showDogs(){
    //finds table and creates a new row
    let find_table = document.getElementById('dog-table')
    let new_row = document.createElement('tr')
    new_row.className = 'padding'
    new_row.id = `row-${this.id}`
    //creates new table data and sets values
    let name_data = document.createElement('td')
    name_data.innerText = this.name
    name_data.dataset.nameId = this.id
    let breed_data = document.createElement('td')
    breed_data.innerText = this.breed
    breed_data.dataset.breedId = this.id
    let sex_data = document.createElement('td')
    sex_data.innerText = this.sex
    sex_data.dataset.sexId = this.id

    //edit dog button
    let edit_button = document.createElement('button')
    edit_button.id = `edit-${this.id}`
    edit_button.innerHTML = 'Edit Dog'
    edit_button.addEventListener('click', (e) => {
      e.preventDefault()
      const find_form = document.getElementById('dog-form')
      find_form.dataset.dogId = this.id
      // find_form.dataset.petId
      let find_name = document.getElementById('dog-name')
      let find_breed = document.getElementById('dog-breed')
      let find_sex = document.getElementById('dog-sex')
      find_name.value = this.name
      find_breed.value = this.breed
      find_sex.value = this.sex
    })
    let edit_dog = document.createElement('td')
    edit_dog.append(edit_button)


    //appends table data and row to the table
    new_row.append(name_data, breed_data, sex_data, edit_dog)
    find_table.appendChild(new_row)
  }

  static formSubmit(e){
    let name_val = document.getElementById('dog-name').value
    let breed_val = document.getElementById('dog-breed').value
    let sex_val = document.getElementById('dog-sex').value
    let dog_id = parseInt(e.currentTarget.dataset.dogId)
    let find_dog = Dog.all.find((dog) => (dog.id === dog_id))


    fetch(`http://localhost:3000/dogs/${dog_id}`,
    { method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'id': dog_id,
        'name': name_val,
        'breed': breed_val,
        'sex': sex_val
      })
    })
    .then(resp => resp.json())
    .then((dog) => {
      let find_name = document.querySelector(`[data-name-id='${dog.id}']`)
      let find_breed = document.querySelector(`[data-breed-id='${dog.id}']`)
      let find_sex = document.querySelector(`[data-sex-id='${dog.id}']`)
      find_name.innerText = dog.name
      find_breed.innerText = dog.breed
      find_sex.innerText = dog.sex
      find_dog.name = dog.name
      find_dog.breed = dog.breed
      find_dog.sex = dog.sex
    })

  }


}
