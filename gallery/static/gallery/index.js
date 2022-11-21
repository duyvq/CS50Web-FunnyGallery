const parentNode = document.querySelector('.col');
var query = document.querySelector('form > input');
query.oninput = () => {
  query = document.querySelector('form > input').value;
}

document.addEventListener('DOMContentLoaded', function () {
  loadPicture();
  // document.querySelector('form[role=search] > button').addEventListener('click', (e) => {
  //   e.preventDefault();
  //   search();
  // })
})

function loadPicture() {
  fetch('/all_picture')
  .then(response => response.json())
  .then(pictures => {
    pictures.forEach(elem => {
      renderPicture(elem)
    })
  })
}


function search() {
  const childNode = document.createElement('p');
  console.log(query)
  childNode.innerHTML = `Result of: ${query}`;
  parentNode.insertBefore(childNode, parentNode.children[0])
  fetch(`/?q=${query}`)
  .then(response => response.json())
  .then(pictures => {
    pictures.forEach(elem => {
      renderPicture(elem)
    })
  })
}


function renderPicture(elem) {
  const childNode = document.createElement('div');
  childNode.classList.add('card', 'shadow-sm')
  childNode.innerHTML =`
      <div class="card-body">
        <p class="card-text">${elem.photoName}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <!-- <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button> -->
          </div>
          <small class="text-muted">${elem.timestamp}</small>
        </div>
      </div>
      <div class="picture-holder">
          <a class="bd-placeholder-img card-img-top" href="picture/${elem.id}">
          <img class="picture-overview" src="${elem.picture}">
        </a>
      </div>
    `;
  parentNode.append(childNode)
}