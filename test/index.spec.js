import viewLogin from '../src/pageview/login.js'
import { createUser, loginUser } from '../src/firebase/firebaseAuth.js';
import { createUserRegisterDB, savePost } from '../src/firebase/baseDatos.js'
jest.mock('../src/firebase/firebaseAuth.js');
jest.mock('../src/firebase/baseDatos.js');

describe('Registrar usuario', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });

  it('Debería poder registrar a un usuario', () => createUser('f@f.com', '123456')
    .then(() => {
      console.log(createUser.mock.calls);
      expect(createUser.mock.calls[0][0]).toBe('f@f.com');
      expect(createUser.mock.calls[0][1]).toBe('123456');
      console.log(createUser.mock.calls);
    }));
});


describe('Datos de Usuario creado', () => {
  it('debería ser una función', () => {
    expect(typeof createUserRegisterDB).toBe('function');
  });

  it('Debería haber creado Datos de usuario', () => createUserRegisterDB('6cwnDZzwQrMyqkF6AVbIV5Q4mVT2', 'Gabriela', 'gabriela@prueba.com', '123456')
    .then(() => {
      console.log(createUserRegisterDB.mock.calls);
      expect(createUserRegisterDB.mock.calls[0][0]).toBe('6cwnDZzwQrMyqkF6AVbIV5Q4mVT2');
      expect(createUserRegisterDB.mock.calls[0][1]).toBe('Gabriela');
      expect(createUserRegisterDB.mock.calls[0][2]).toBe('gabriela@prueba.com');
      expect(createUserRegisterDB.mock.calls[0][3]).toBe('123456');

    }));
});


describe('Datos de la publicacion', () => {
  it('debería ser una función', () => {
    expect(typeof savePost).toBe('function');
  });

  it('Debería haber creado Datos de la publicacion', () => savePost('gab', 'Mon Aug 01 2022', 'hola', 'Zjgj0AJDpHaYyckXigDjdEp1Wb93', '[0:Zjgj0AJDpHaYyckXigDjdEp1Wb93]', 'https://firebasestorage.googleapis.com/v0/b/purr-love.appspot.com/o/postsImagen%2F5500_9_10.jpg?alt=media&token=73914d69-52dd-4d50-ae66-96ddcfc7a2b8')
    .then(() => {
      console.log(savePost.mock.calls);
      expect(savePost.mock.calls[0][0]).toBe('gab');
      expect(savePost.mock.calls[0][1]).toBe('Mon Aug 01 2022');
      expect(savePost.mock.calls[0][2]).toBe('hola');
      expect(savePost.mock.calls[0][3]).toBe('Zjgj0AJDpHaYyckXigDjdEp1Wb93');
      expect(savePost.mock.calls[0][4]).toBe('[0:Zjgj0AJDpHaYyckXigDjdEp1Wb93]');
      expect(savePost.mock.calls[0][5]).toBe('https://firebasestorage.googleapis.com/v0/b/purr-love.appspot.com/o/postsImagen%2F5500_9_10.jpg?alt=media&token=73914d69-52dd-4d50-ae66-96ddcfc7a2b8');

    }));
});


