/*** @jest-environment jsdom*/

import { loginActive, loginUser, buttonShow } from '../src/pageview/login.js'
import viewLogin from '../src/pageview/login.js'

jest.mock('../src/firebase/firebaseAuth.js');
jest.mock('../src/firebase/baseDatos.js');


describe('Login', () => {
    it('debería ', () => {
        document.body.appendChild(viewLogin());
        const login = viewLogin();
        expect(login instanceof HTMLElement).toBe(true);
        // loginActive();
    });
});

describe('Mensaje de error para iniciar sesión', () => {
    it('Se debe mostrar un mensaje de error', () => {
        const loginUser = jest.fn((emailLogin, passwordLogin) => Promise.resolve({
            email: emailLogin,
            password: passwordLogin,
        }));
        loginUser.mockRejectedValue('El correo ingresado es inválido.');

        document.body.appendChild(viewLogin());
        const login = viewLogin();
        const idform = login.querySelector('#formLogin');
        const emailLogin = login.querySelector('#emailLogin');
        const passwordLogin = login.querySelector('#passwordLogin');
        emailLogin.value = 'f@f.com';
        passwordLogin.value = '123456';
        //const btnLogin = login.getElementById('btnLogin');

        idform.dispatchEvent(new Event('submit'));
        loginUser().catch((error) => {
            expect(error).toEqual(
                'El correo ingresado es inválido.',
            );
        });
    });
});


describe('Ingreso a la red social', () => {
    it('Registra usuario y lo lleva al Home', (done) => {
        document.body.appendChild(viewLogin());
        const login = viewLogin();
        const idform = login.querySelector('#formLogin');
        idform.dispatchEvent(new Event('submit'));
        setTimeout(() => {
            expect(window.location.href).toBe('http://localhost/');
            done();
        });
    });
});


describe('Mostar y ocultar contraseña', () => {
    it('Icono de ojo que muestra y oculta la contraseña', () => {
        document.body.appendChild(viewLogin());
        viewLogin();
        const btnShow = buttonShow();
        const password = btnShow.querySelector('#passwordLogin');
        const btnPassword = btnShow.querySelector('#btn-password-login');
        password.type = 'text';
        btnPassword.dispatchEvent(new Event('click'));
        expect(password.type).toBe('text');
        // expect(password.type).toBe('text');
    });
});


        //})
        //expect(getByTestId('emailLogin')).toBeRequired();
        //expect(document.getElementById('emailLogin').value).toBe('');
        //expect(document.getElementById('passwordLogin').value).toBe('');
    //});
//});

// describe('Login', () => {
//     it('', () => {
//         // document.body.appendChild(loginActive());
//         loginActive();
//         const idform = document.getElementById('formLogin');
//         idform.dispatchEvent(new Event('submit'));
//         expect(document.getElementById('emailLogin').value).toBe('* correo electrónico');
//         expect(document.getElementById('passwordLogin').value).toBe('*contraseña');
//         console.log(signInWithEmailAndPassword.mock);
//     });
// });*/