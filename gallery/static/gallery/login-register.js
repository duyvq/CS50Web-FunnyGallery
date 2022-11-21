document.addEventListener('DOMContentLoaded', () => {
  // In case user not logged in, click "Add new..." will prompt modal
  document.querySelector('.addnew-button').addEventListener('click', () => {
    openLoginModal();
  })

  // Click button/link to open Login modal
  document.querySelectorAll('.login-button').forEach((elem) => {elem.addEventListener('click', () => {
    openLoginModal();
  })})
  loginButtonEvent();

  // Click button/link to open Register modal
  document.querySelectorAll('.register-button').forEach((elem) => {elem.addEventListener('click', () => {
    openRegisterModal();
  })})
  registerButtonEvent()
})

function openLoginModal() {
  closeLoginModal()
  closeRegisterModal()

  const loginModal = document.createElement('div');
  loginModal.className ='login-view-popup';
  loginModal.setAttribute('aria-hidden', 'true');
  loginModal.innerHTML = `
    <div class="mid-layer close-modal"></div>
    <div class="modal-dialog popup loginModal" role="document">
        <div class="modal-content rounded-4 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
                <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                <h1 class="fw-bold mb-0 fs-2">Login</h1>
                <a>
                    <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </a>
            </div>
    
            <div class="modal-body p-5 pt-0">
                <form action="/login" method="post">
                    <div class="form-floating mb-3">
                        <input class="form-control rounded-3" type="text" name="username" placeholder="Username">            
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" name="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" value="Log in">Log in</button>
                    Don't have an account? <a class="register-button">Register here.</a>
                </form>
            </div>
        </div>
    </div>`;
  document.body.append(loginModal);
  
  document.querySelector('.btn-close.btn-close-white').click();
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.querySelector('.mid-layer').classList.add('midlayer-css')
  document.querySelector('.login-view-popup').classList.add('opened');

  // Click button/link to open Register modal
  document.querySelectorAll('.register-button').forEach((elem) => {elem.addEventListener('click', () => {
    openRegisterModal();
  })})

  // Click button/link to close Login modal
  document.querySelectorAll('.close-modal').forEach((elem) => {elem.addEventListener('click', () => {
    closeLoginModal();
  })})

  loginButtonEvent()

}

function openRegisterModal() {
  closeLoginModal()
  closeRegisterModal()

  const registerModal = document.createElement('div');
  registerModal.className ='register-view-popup';
  registerModal.setAttribute('aria-hidden', 'true');
  registerModal.innerHTML = `
    <div class="mid-layer close-modal"></div>
    <div class="modal-dialog popup registerModal" role="document">
        <div class="modal-content rounded-4 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
                <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1>
                <a>
                    <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </a>
            </div>
    
            <div class="modal-body p-5 pt-0">
                <form action="/register" method="post">
                    <div class="form-floating mb-3">
                        <input class="form-control rounded-3" id="floatingInput" type="text" name="username" placeholder="Username">
                        <label for="floatingInput">Username</label>
                    </div>

                    <div class="form-floating mb-3">
                        <input class="form-control rounded-3" id="floatingInput" type="email" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control rounded-3" id="floatingPassword" name="confirmation" placeholder="Confirm Password">
                        <label for="floatingPassword">Confirmation Password</label>
                    </div>
                    <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" value="Sign up">Sign up</button>
                    <small class="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                    <!-- <hr class="my-4">
                    <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
                    <button class="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
                        <svg class="bi me-1" width="16" height="16"><use xlink:href="#twitter"/></svg>
                        Sign up with Twitter
                    </button>
                    <button class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                        <svg class="bi me-1" width="16" height="16"><use xlink:href="#facebook"/></svg>
                        Sign up with Facebook
                    </button>
                    <button class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                        <svg class="bi me-1" width="16" height="16"><use xlink:href="#github"/></svg>
                        Sign up with GitHub
                    </button> -->
                </form>
                Already have an account? <a class="login-button">Log In here.</a>
            </div>
        </div>
    </div>`
  document.body.append(registerModal);

  document.querySelector('.btn-close.btn-close-white').click();
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.querySelector('.mid-layer').classList.add('midlayer-css')
  document.querySelector('.register-view-popup').classList.add('opened');

  // Click button/link to open Login modal
  document.querySelectorAll('.login-button').forEach((elem) => {elem.addEventListener('click', () => {
    openLoginModal();
  })})

  // Click button/link to close Login/Register modal
  document.querySelectorAll('.close-modal').forEach((elem) => {elem.addEventListener('click', () => {
    closeRegisterModal();
  })})

  registerButtonEvent()
}

function closeLoginModal() {
  let login = document.querySelectorAll('.login-view-popup');
  login.forEach((elem) => {
    elem.remove()
  }) 

  let midLayer = document.querySelector('.mid-layer');
  if (midLayer != null) {
    midLayer.classList.remove('midlayer-css')
  }

  document.body.style.overflow = 'auto';
}

function closeRegisterModal() {
  let register = document.querySelectorAll('.register-view-popup');
  register.forEach((elem) => {
    elem.remove()
  }) 

  let midLayer = document.querySelector('.mid-layer');
  if (midLayer != null) {
    midLayer.classList.remove('midlayer-css')
  }
  
  document.body.style.overflow = 'auto';
}

// Get csrf token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
};

function loginButtonEvent() {
  // Add event to login button
  var arrayOfButton = document.querySelectorAll('button');
  for (var i in arrayOfButton) {
    if (arrayOfButton[i].value == 'Log in') {
      arrayOfButton[i].addEventListener('click', (event) => {
        event.preventDefault();
        console.log('ok')
        submitLogin()
      })
    }
  }
}

function submitLogin() {
  // Remove error message if any
  var errorMessage = document.querySelector('div[class=error-message]');
  if (errorMessage !== null) errorMessage.remove()

  var username = document.querySelector('input[name=username]').value;
  var password = document.querySelector('input[name=password]').value;

  const csrftoken = getCookie('csrftoken');

  var url = `${window.location.origin}/login`;
  fetch(url, {
    method: 'POST',
    headers: {'X-CSRFToken': csrftoken},
    mode: 'same-origin',
    body: JSON.stringify({
        username: username,
        password: password
    })
  })
  .then(response => {
    if (response.status == '201') {
      window.location.href = `${window.location.href}`;
    } else {
      // In case something wrong in username or password, emit error
      let newNode = document.createElement('div');
      newNode.className = 'error-message';
      newNode.innerHTML = 'Invalid username and/or password.';
      let parentNode = document.querySelector('.modal-content');
      parentNode.insertBefore(newNode, parentNode.children[1]);

      /* window.location.href = `${window.location.origin}/login#fail`;
      in case of reload /login page with emitting error, using hash and replaceState
      */
    }
  })
}

function registerButtonEvent() {
  // Add event to register button
  var arrayOfButton = document.querySelectorAll('button');
  for (var i in arrayOfButton) {
    if (arrayOfButton[i].value == 'Sign up') {
      arrayOfButton[i].addEventListener('click', (event) => {
        event.preventDefault();
        console.log('ok')
        submitRegister()
      })
    }
  }
}

function submitRegister() {
  // Remove error message if any
  var errorMessage = document.querySelector('div[class=error-message]');
  if (errorMessage !== null) errorMessage.remove()

  var username = document.querySelector('input[name=username]').value;
  var email = document.querySelector('input[type=email]').value;
  var password = document.querySelector('input[type=password]').value;
  var confirmation = document.querySelector('input[name=confirmation]').value;

  const csrftoken = getCookie('csrftoken');

  var url = `${window.location.origin}/register`;
  fetch(url, {
    method: 'POST',
    headers: {'X-CSRFToken': csrftoken},
    mode: 'same-origin',
    body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmation: confirmation
    })
  })
  .then(response => response.json())
  .then(result => {
    if (result.message == 'Create new user successfully.') {
      window.location.href = `${window.location.href}`;
    } else {
      let newNode = document.createElement('div');
      newNode.className = 'error-message';
      newNode.innerHTML = result.message;
      let parentNode = document.querySelector('.modal-content');
      parentNode.insertBefore(newNode, parentNode.children[1]);
    }
    
  })
}