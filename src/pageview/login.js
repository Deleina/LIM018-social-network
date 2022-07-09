import { loginGoogle, loginUser } from '../firebaseConfig.js';

export default () => {
  const viewLogin = `<header class="nameLogo">
  <img class="gatitoLogo" src="GATITO LOGO.png">
  <h1>PUUR LOVE</h1>
  <h2>Una comunidad hecha para los amantes de los gatos.</h2>
   <a href="#/login"></a>
</header>
  <section class="secLogin">
  <form class="formLogin" id="formLogin">
    <legend>Inicia sesión</legend>
    <label>Correo electrónico:</label>
    <input type="email" id="emailLogin" class="emaillogin" required>
    <label>Contraseña:</label>
    <div class="container-password-login">
      <input type="password" class="passwordLogin" id="passwordLogin" required>
      <div>
        <button class="button-password-login"  id="btn-password-login"> 
          <img src="face.png" class="img-button-password">
        </button>
      </div>
    </div>
    <button type="submit" class="btnLogin" id="btnLogin">Inicia Sesión</button>
    <legend>o</legend>
  </form>
  <div>
    <button class="btnLoginGoogle" id="btnLoginGoogle">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAgRJREFUWEftltsxREEQhv+NABEgAyJABIgAGRABIkAEyMBGgAyIABkQAfVVzVYdx/Rl9titfdiu2tqHM5dvuv++jLRgNlowHi2BoogM9dCupG9JW5I+Jb1L+pL0El1sfZ8G6EDSkSRgVo2DAXuSdFkg03wtQACcF5D0BZLuJJ0VD4b7skDHkm7D0+wFhPOweM09JgPECwnREENXeDjUVgQ01DM8Ig3DYg+IFz06bvko+uDV/AgL2YboechKK0wERJbsGEA3ki4coZJ9fCfcYZi6d1ge8kKFOB+GCMrbawFx4X5lI545nRWMFzKqb99eS6aglZlZzUOWmKm66MIyvtUeYq1/rtWlFqC9oLC1wABZDX8NiJfSIvq2FpT/ViA8RDR+WQvQZtAoZwZkaei/Q1bVZIuGIlFTSC2rFdg0EIeS2pT+rjHjbGfHiM7GDUlvFdJqgZ1HYbSSpHq3BeQ11pPSozLF0TpnXJrwnzO8bu81V1oLYF7VpsVQPmpjrpkgHhCjBFB9LU1ehaYAo5vTVriY1McrjCDsr5npHRbPY0DrQjGsIXLTsxEQh+H6q4xggjWpyTEDxD3MR9dO+CJepkvCGA5rWSAuxNVMgNYUaUHdFy+nxpYWoMmFiBaP8b9uUCByEgKvIv60TQPUPZxM6qc1AE0Q3QOHAqVfnl24BIo8tXAe+gFPeGwlzWWFWwAAAABJRU5ErkJggg=="/>
      Inicia sesión con Google</button>
  </div>
  <div class="ntcRegis">
    <p>¿No tienes cuenta?</p>
    <a class="hrefRegistrate" href="#/Registrate">Registrate</a>
  </div>
</section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewLogin;
  return divElem;
};

export const loginActive = (idElementoForm) => {
  const idForm = document.getElementById(idElementoForm);
  idForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    // aqui se puede colocar el método del firebase
    loginUser(email, password)
      .then((userCredential) => {
      // Signed in
        const user = userCredential.user;
        console.log(user);
      // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-alert
        alert(`${errorMessage}revisa tus datos`);
      });
    console.log(email, password);
  });
};

export const buttonShow = (idbtn, idInput) => {
  const password = document.getElementById(idInput);
  const viewPassword = document.getElementById(idbtn);
  let click = false;
  viewPassword.addEventListener('click', () => {
    if (!click) {
      password.type = 'text';
      click = true;
    } else if (click) {
      password.type = 'password';
      click = false;
    }
  });
};

export const GoogleBtnActive = (idbtnGoogle) => {
  const btnGoogle = document.getElementById(idbtnGoogle);
  btnGoogle.addEventListener('click', () => {
    loginGoogle();
  });
};
