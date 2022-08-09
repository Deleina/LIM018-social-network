import { signOutUser } from '../firebase/firebaseAuth.js';
import {
    savePost,
    getUser,
    onGetPost,
    deletePost,
    gettingPost,
    editPost,
    addLike,
    gettingPostLike,
} from '../firebase/baseDatos.js';
import { imageUrl } from '../firebase/storage.js';
import { localStorageCall } from '../lib/index.js';

export default () => {
    const viewHome = `<section class= "sectionHome">
    <header class= "headerHome">
        <nav>
            <input type="checkbox" id="check">
            <label for="check" class="checkbtn">
                <img class="btnMenuBar" src="image/menu.png" >
            </label>

            <div class=logoComplete>
                <img class="logoNav" src="image/GATITO LOGO.png">
                <label class="logoNameNav">PUUR LOVE</label>
            </div>
            
            <ul class="menuLeft">
                <li>
                    <a href="#/home">
                        <img class="icon" src="image/home.png">
                        <label class="home">Inicio</label>
                    </a>
                </li>
                <li>
                    <a href="#/perfil">
                        <img class="icon" src="image/perfil.png">
                        <label class="profile">Perfil</label>
                    </a>
                </li>
            </ul>
            
            <ul class="menuTop">
                <li>
                    <a href="#/home">
                        <img class="icon home" src="image/home.png">
                        <label class="home">Inicio</label>
                    </a>
                </li>
                <li>
                    <a href="#/perfil">
                        <img class="icon profile" src="image/perfil.png">
                        <label class="profile">Perfil</label>
                    </a>
                </li>
                <li>
                    <div class= "search">
                        <img class="icon searchIcon" src="image/buscar.png">
                        <input class="searchInput" type="search" placeholder="Buscar">
                    </div>           
                </li>
                <li>
                
                    <button class="btnSalir" id="signOut">Salir</button>

                </li>
            </ul>
        </nav>
    </header>
    <section class= "secHome">
        
        <div class="backgroundModal" id="backgroundModal">    
            <form class="formPost" id="formPost">
                <div class= "modalCreatePost">
                    <div class="createPostTitle">
                        <p class="modalTitle" id="modalTitle">Crear Publicación</p>
                        <button type="button" class="cerrarModalPost" id="cerrarModalPost">X</button>
                    </div>
                    <div class="DescriptionUser">
                        <div class= "userPost">
                            <label class="userNamePost" id="userNamePost"></label>
                        </div>
                        <textarea type="text" class= "addPost" id="addPost" placeholder="Agrega una publicación" ></textarea>   
                        <p id="textEmptyModal"></p>
                        <label type="button" class="btnCatImg" for="btnImgFile">
                        <input id="btnImgFile" type ="file">   
                        <img class="iconCatImg" alt="icono imagen" src="image/iconCatImg.png">
                        </label>
                        <button type="submit" class="btnPost" id="btnPost">Publicar</button>
                    </div>
                </div>
            </form>
        </div>
    
        <div id="containerDelete"></div>
        <div class="postAddBtn">
            <button type="button" class= "addPost" id="btnModalPost" >Agrega una publicación:</button>
            <div id="postContainer"></div>
        </div>

    </section>
    </section>`;

    const divElem = document.createElement('div');
    divElem.classList.add('divElem');
    divElem.innerHTML = viewHome;
    return divElem;
};

// FUMCIÓN CERRAR SESIÓN
export const SignOutActive = (idElementSignOut) => {
    const idBtnSignOut = document.getElementById(idElementSignOut);
    idBtnSignOut.addEventListener('click', () => {
        window.location.href = '#/login';
        signOutUser()
            .then(() => {
                // Sign-out successful.
                console.log('Salió');
                window.location.href = '#/login';
            })
            .catch((error) => {
                // An error happened.
                console.log('Ocurrió un error al querer salir' + error);
            });
    });
};

//FUNCIÓN GUARDADO DE DATOS PARA POST
let editingPost = false;
let id = '';
export const postHome = (idPost, formPost, idBtnModalPost, idBackgroundModal, idCerrarModalPost, idBtnPost, idModalTitle, idTextEmptyModal, idBtnImgFile) => {
    const btnModalPost = document.getElementById(idBtnModalPost);
    const backgroundModal = document.getElementById(idBackgroundModal);
    const cerrarModalPost = document.getElementById(idCerrarModalPost);
    const btnPost = document.getElementById(idBtnPost);
    const modalTitle = document.getElementById(idModalTitle);
    const textEmptyModal = document.getElementById(idTextEmptyModal);
    const btnImgFile = document.getElementById(idBtnImgFile);
    const userNamePost = document.getElementById("userNamePost");
    backgroundModal.style.display = 'none';
    const userObject = localStorageCall();
    const uid = userObject.id;
    const nameUser = userObject.name;
    let like = {};

    btnModalPost.addEventListener('click', () => {
        backgroundModal.style.display = 'flex';
        btnPost.innerText = 'Publicar';
        modalTitle.innerText = 'Crear Publicación';
        userNamePost.innerText = nameUser;
    })

    const PostH = document.getElementById(formPost);
    PostH.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fechaPost = formatoFecha();
        //const fecha = new Date();
        const fecha = Date.now();

        console.log(fechaPost);
        console.log(fecha);

        const fileImage = btnImgFile;
        console.log(fileImage);
        const newpost = document.getElementById(idPost).value;
        let imagen;

        if (fileImage.value) {
            const urlImage = fileImage.files[0].name;
            const nameFile = fileImage.files[0];
            imagen = await imageUrl(urlImage, nameFile);
            console.log(imagen);
        }

        if (!editingPost) {
            if (newpost.length === 0) {
                textEmptyModal.innerText = 'Publicación vacía, agrega contenido a tu publicación';
            }
            else {
                textEmptyModal.innerHTML = '';
                console.log(imagen);
                savePost(nameUser, fecha, fechaPost, newpost, uid, like, imagen);
                
                backgroundModal.style.display = 'none';
            }
        } else {
            editPost(id, newpost);
            backgroundModal.style.display = 'none';
        }

        editingPost = false;
        PostH.reset();

    });

    cerrarModalPost.addEventListener('click', () => {
        backgroundModal.style.display = 'none';
        PostH.reset();
        textEmptyModal.innerHTML = '';
    })

};

export const getP = async (idpostContainer, idAddPost,) => {
    const textArea = document.getElementById(idAddPost);
    // const btnImgFile = document.getElementById(idBtnImgFile);
    const postContainer = document.getElementById(idpostContainer);
    onGetPost((dataPost) => {
       postContainer.innerHTML = '';
            dataPost.forEach((doc) => {
            const dataNewPost = doc.data();
            const like = dataNewPost.like;
            let ultimoLike = 0;
            if (like){
                let arrayLikes = Object.keys(like);
                ultimoLike = arrayLikes.length;
            }

            if (dataNewPost.image) {
                postContainer.innerHTML += `
            <div class="postComplete">
                <div class="userNameDots">
                    <label class="userNamePost">${dataNewPost.nameUser}</label>
                    <div class="dotsEditDelete">
                        <img id="elementDots" class="dots" src="image/tresPuntos.png">
                    </div>
                </div>
                <div class="optionSetingsPost optionSetingsPostStyle">
                        <label class="editBtn editBtnStyle" data-id="${doc.id}">Editar</label>
                        <label class="deleteBtn deleteBtnStyle" data-id="${doc.id}">Eliminar</label>
                </div>
                <label class="date">${dataNewPost.fechaPost}</label>
                <label class="postDescription">
                    ${dataNewPost.newpost}
                </label> 
                <img class="imagePost" src="${dataNewPost.image}">
                <div class="likeComment">
                    <div class="likeContainer">
                        <button class= "likeBtn">
                        <img class="likeIcon" src="image/likeHeart.png" data-id="${doc.id}">
                        </button>
                        <label id="likeNumber" class="likeNumber">${ultimoLike}</label>
                    </div>
                    <div class= "btnCommentContainer">
                    <button class="btnComment">Comentar</button>
                    </div>
                </div>
            </div>`
            } else {

                postContainer.innerHTML += `
            <div class="postComplete">
                <div class="userNameDots">
                    <label class="userNamePost">${dataNewPost.nameUser}</label>
                    <div class="dotsEditDelete">
                        <img id="elementDots" class="dots" src="image/tresPuntos.png">
                    </div>
                </div>
                <div class="optionSetingsPost optionSetingsPostStyle">
                        <label class="editBtn editBtnStyle" data-id="${doc.id}">Editar</label>
                        <label class="deleteBtn deleteBtnStyle" data-id="${doc.id}">Eliminar</label>
                </div>
                <label class="date">${dataNewPost.fechaPost}</label>
                <label class="postDescription">
                    ${dataNewPost.newpost}
                </label>
                <div class="likeComment">
                    <div class="likeContainer">
                        <button class= "likeBtn" type="button">
                            <img class="likeIcon" src="image/likeHeart.png" data-id="${doc.id}">
                        </button>
                        <label id="likeNumber" class="likeNumber">${ultimoLike}</label>
                    </div>
                    <div class= "btnCommentContainer">
                    <button class="btnComment">Comentar</button>
                    </div>
                </div>
            </div>`

            }
        })

        //FUNCION BORRAR POST
        const dots = document.querySelectorAll('.dots');
        const optionSetingsPost = document.querySelectorAll('.optionSetingsPost');
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        deletingPost(dots, optionSetingsPost, deleteBtn);
        //FUNCION EDITAR TEXTO DE POST
        const editBtn = document.querySelectorAll('.editBtn');
        editingP(editBtn, optionSetingsPost, textArea)

        //FUNCION LIKES
        const likeAction = document.querySelectorAll('.likeBtn');
        const likeNumber = document.querySelectorAll('.likeNumber');
        const likeIcon = document.querySelectorAll('.likeIcon');
        
        for (let i = 0; i < likeAction.length; i++) {
            likeAction[i].addEventListener('click', async ({ target: { dataset } }) => {
                const doc = await gettingPostLike(dataset.id);
                const post = doc.data();
                const userObject = localStorageCall();
                const uidLike = userObject.id;
                console.log(uidLike);
                id = dataset.id;
                let likeobject = post.like;
                let array = Object.keys(likeobject);
                let num = array.length;
                let arrayid = Object.values(likeobject);
                let contador = false;
                let uidLikeString = uidLike.toString();
                for (let i = 0; i < arrayid.length; i++) {
                    if (arrayid[i] == uidLikeString) {
                        console.log("ya le diste like");
                        let newNum = getKeyByValue(likeobject, uidLikeString);
                        console.log(likeobject[newNum]);
                        delete likeobject[newNum];
                        contador = true;
                    }
                 }
                 if(contador == false){
                    likeobject[num]=uidLike;
                }

                addLike(id, likeobject);
                console.log(likeobject);
             });

            function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value);
            }
       }
   });
}


function deletingPost(dots, optionSetingsPost, deleteBtn) {
    for (let i = 0; i < dots.length; i++) {
        optionSetingsPost[i].style.display = 'none';
        dots[i].addEventListener('click', () => {

            if (optionSetingsPost[i].style.display === 'none') {
                optionSetingsPost[i].style.display = 'flex';
            }
            else {
                optionSetingsPost[i].style.display = 'none';
            }
        });
    }
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', ({ target: { dataset } }) => {
            containerDelete.innerHTML = ` <div class="backgroundModal" id="backgroundModalDelete">
            <div id="warningPostDelete" class="modalDeletePost">
            <button type="button" class="cerrarModalPost" id="cerrarDelete">X</button>
            <img class="gatitoWarning" src="image/gatoTriste.png">
            <p class="modalTitleDelete">¿Estás seguro que deseas eliminar?</p>
            <div class= "btnsDeleteCancel">
            <button type="button" class="btnPost" id="deletePostModal">Eliminar</button>
            <button type="button" class= "btnPost" id="deleteCancel">Cancelar</button>
        </div>
        </div>
            `
            const deletePostModal = document.getElementById('deletePostModal');
            deletePostModal.addEventListener('click', () => {
                deletePost(dataset.id);
                containerDelete.innerHTML = '';
            })
            const deleteCancel = document.getElementById('deleteCancel');
            deleteCancel.addEventListener('click', () => {
                containerDelete.innerHTML = '';
            })

            const cerrarDelete = document.getElementById('cerrarDelete');
            cerrarDelete.addEventListener('click', () => {
                containerDelete.innerHTML = '';
            })
            optionSetingsPost[i].style.display = 'none';
        });
    }
}

function editingP(editBtn, optionSetingsPost, textArea) {
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', async ({ target: { dataset } }) => {
            backgroundModal.style.display = 'flex';
            const doc = await gettingPost(dataset.id);
            const post = doc.data();
            textArea.value = post.newpost;
            editingPost = true;
            id = dataset.id;
            btnPost.innerText = 'Guardar';
            modalTitle.innerText = 'Editar Publicación';
            optionSetingsPost[i].style.display = 'none';
            console.log(post);
        });
    }
    cerrarModalPost.addEventListener('click', () => {
        backgroundModal.style.display = 'none';
        textArea.innerHTML = '';
    })
}

function formatoFecha(){
const f = new Date();
const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const mes = meses[f.getMonth()]
  const dia = f.getDate();
  const año = f.getFullYear();
  const hora = f.toLocaleTimeString();

  const fechaPost =  `${ dia } de ${ mes } de ${ año } a las ${ hora }`
  return fechaPost;
}