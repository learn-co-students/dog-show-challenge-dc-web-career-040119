const dogURL = 'http://localhost:3000/dogs'
document.addEventListener('DOMContentLoaded', () => {
  const find_form = document.getElementById('dog-form')
  Dog.renderDogs()
  find_form.addEventListener('submit', (e)=> {
    e.preventDefault()
    Dog.formSubmit(e)
    find_form.reset()
    alert('Changes Saved')
  })
})
