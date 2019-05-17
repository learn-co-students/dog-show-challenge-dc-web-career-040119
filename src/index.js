document.addEventListener('DOMContentLoaded', () => {
    throwTheBall();

    dogForm = document.getElementById('dog-form');
    dogForm.addEventListener('submit', haircut);
    dogForm.style.display = 'none';
    document.querySelector('div.margin').style.display = 'none'
});

//FETCH!!
const throwTheBall = () => {
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(goodDogs => goodDogs.forEach(pup => giveCookiesTo(pup)))
};

//GOOD DOG!!
const giveCookiesTo = (doggo) => {
    const dogPile = document.getElementById('table-body');

    const goodDog = document.createElement('tr');
    goodDog.dataset.dogId = doggo.id;
    dogPile.appendChild(goodDog);

    const dogName = document.createElement('td');
    dogName.innerText = doggo.name;
    goodDog.appendChild(dogName);

    const dogBreed = document.createElement('td');
    dogBreed.innerText = doggo.breed;
    goodDog.appendChild(dogBreed);

    const dogSex = document.createElement('td');
    dogSex.innerText = doggo.sex;
    goodDog.appendChild(dogSex);

    const editField = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit Dog';
    editButton.addEventListener('click', takeDogToTheGroomers);
    editField.appendChild(editButton);
    goodDog.appendChild(editField)
};

const takeDogToTheGroomers = e => {
    const editForm = document.getElementById('dog-form');

    editForm.style.display = 'block';
    document.querySelector('div.margin').style.display = 'block';

    const dogSex = e.target.parentElement.previousSibling;
    const dogBreed = dogSex.previousSibling;
    const dogName = dogBreed.previousSibling;

    editForm.dataset.editDogId = dogName.parentElement.dataset.dogId;

    editForm[0].value = dogName.innerText;
    editForm[1].value = dogBreed.innerText;
    editForm[2].value = dogSex.innerText

};

const haircut = (e) => {
    e.preventDefault();

    const name = e.target.children[0].value;
    const breed = e.target.children[1].value;
    const sex = e.target.children[2].value;

    if (!!name && !!breed) {
        if (sex === "male" || sex === "female") {

            fetch(`http://localhost:3000/dogs/${e.target.dataset.editDogId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: e.target.children[0].value,
                    breed: e.target.children[1].value,
                    sex: e.target.children[2].value
                })
            })
                .then(response => response.json())
                .then(updatePrettyPup)
                .catch(error => alert(error.message));

            e.target.style.display = 'none';
            e.target.previousElementSibling.style.display = 'none';

            e.target.dataset.editDogId = '';
            e.target.reset()
        } else {
            alert('Sex must be either "male" or "female"')
        }
    } else {
        alert('Dog must have a name and a breed')
    }
};

const updatePrettyPup = (pup) => {
    const prettyDoggie = document.querySelector(`[data-dog-id = "${pup.id}"]`);
    prettyDoggie.children[0].innerText = pup.name;
    prettyDoggie.children[1].innerText = pup.breed;
    prettyDoggie.children[2].innerText = pup.sex
};