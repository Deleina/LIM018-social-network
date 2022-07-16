import { components } from '../pageview/viewlist.js';
import { buttonShow, loginActive, GoogleBtnActive } from '../pageview/login.js';
import { registerActive, buttonShowRegister } from '../pageview/register.js';
import { SignOutActive, postHome, getP, btnLikeCounter } from '../pageview/home.js';

const changeView = (name) => {
  const container = document.getElementById('container');
  container.innerHTML = ' ';

  switch (name) {
    case '': case '#/login':
    { container.appendChild(components.login());
      loginActive('formLogin');
      buttonShow('btn-password-login', 'passwordLogin');
      GoogleBtnActive('btnLoginGoogle');
      break;
    }

    case '#/Registrate':
    { container.appendChild(components.registro());
      registerActive('formRegister');
      buttonShowRegister('btnRegister', 'passwordRegister');
      buttonShowRegister('btnRepeatRegister', 'passwordRepeatRegister');
      GoogleBtnActive('btnRegisterGoogle');
      break; }

    case '#/home':
    { container.appendChild(components.home());
      SignOutActive('signOut');
      postHome('addPost', 'formPost');
      getP('btnProbar', 'postContainer')
      btnLikeCounter('likeBtn', 'likeNumber');
      break; }

    default:
      break;
  }
};

export { changeView };