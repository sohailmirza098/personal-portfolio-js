const homeNav = document.querySelector('.home-nav');
const aboutMeNav = document.querySelector('.about-me-nav');
const galleryNav = document.querySelector('.gallery-nav');
const contactNav = document.querySelector('.contact-nav');
const galleryAdminNav = document.querySelector('.gallery-admin-nav');
const addButton = document.querySelector('.add-button');
const galleryAdminPageImages = document.querySelector('.gallery-admin-page-images');
const addForm = document.querySelector('.add-form');

let globalID = 10;
let currID = 0;

var doc9 = {};

const loadImages = () => {
    fetch('./data/images.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        doc9 = data;
    })    
}

loadImages();

loadEventListeners();

function loadEventListeners() {

    document.querySelector('#fu').addEventListener('click', doTask);

    homeNav.addEventListener('click', (e) => {
        e.preventDefault();
        const main = [...document.querySelector('main').children];
        main.forEach((page) => {
            if(page.classList.contains('home-page') && page.classList.contains('hidden')) {
                page.classList.remove('hidden');
            } else if(!page.classList.contains('home-page') && !page.classList.contains('hidden')) {
                page.classList.add('hidden');
            }
        })
        homeNav.classList.add('active');
        aboutMeNav.classList.remove('active');
        galleryNav.classList.remove('active');
        contactNav.classList.remove('active');
        galleryAdminNav.classList.remove('active');
    });

    aboutMeNav.addEventListener('click', (e) => {
        e.preventDefault();
        const main = [...document.querySelector('main').children];
        main.forEach((page) => {
            if(page.classList.contains('about-me-page') && page.classList.contains('hidden')) {
                page.classList.remove('hidden');
            } else if(!page.classList.contains('about-me-page') && !page.classList.contains('hidden')) {
                page.classList.add('hidden');
            }
        })
        homeNav.classList.remove('active');
        aboutMeNav.classList.add('active');
        galleryNav.classList.remove('active');
        contactNav.classList.remove('active');
        galleryAdminNav.classList.remove('active');
    });

    galleryNav.addEventListener('click', (e) => {
        loadData();
        e.preventDefault();
        const main = [...document.querySelector('main').children];
        main.forEach((page) => {
            if(page.classList.contains('gallery-page') && page.classList.contains('hidden')) {
                page.classList.remove('hidden');
            } else if(!page.classList.contains('gallery-page') && !page.classList.contains('hidden')) {
                page.classList.add('hidden');
            }
        })
        homeNav.classList.remove('active');
        aboutMeNav.classList.remove('active');
        galleryNav.classList.add('active');
        contactNav.classList.remove('active');
        galleryAdminNav.classList.remove('active');
    });

    contactNav.addEventListener('click', (e) => {
        e.preventDefault();
        const main = [...document.querySelector('main').children];
        main.forEach((page) => {
            if(page.classList.contains('contact-page') && page.classList.contains('hidden')) {
                page.classList.remove('hidden');
            } else if(!page.classList.contains('contact-page') && !page.classList.contains('hidden')) {
                page.classList.add('hidden');
            }
        })
        homeNav.classList.remove('active');
        aboutMeNav.classList.remove('active');
        galleryNav.classList.remove('active');
        contactNav.classList.add('active');
        galleryAdminNav.classList.remove('active');
    });

    galleryAdminNav.addEventListener('click', (e) => {
        loadCards();
        e.preventDefault();
        const main = [...document.querySelector('main').children];
        main.forEach((page) => {
            if(page.classList.contains('gallery-admin-page') && page.classList.contains('hidden')) {
                page.classList.remove('hidden');
            } else if(!page.classList.contains('gallery-admin-page') && !page.classList.contains('hidden')) {
                page.classList.add('hidden');
            }
        })
        homeNav.classList.remove('active');
        aboutMeNav.classList.remove('active');
        galleryNav.classList.remove('active');
        contactNav.classList.remove('active');
        galleryAdminNav.classList.add('active');
    });

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        galleryAdminPageImages.classList.add('hidden');
        console.log(galleryAdminPageImages);
        document.querySelector('.add-image').classList.remove('hidden');
    });


    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#new-name');
        const url = document.querySelector('#new-url');
        const information = document.querySelector('#new-information');
        
        let date = new Date();
        let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        let obj = {
            "id": globalID,
            "url": `${url.value}`,
            "name": `${name.value}`,
            "information": `${information.value}`,
            "uploadedDate": `${today}`
        };

        globalID++;

        doc9.push(obj);
        console.log(name);
        name.value = '';
        url.value = '';
        information.value = '';
        loadCards();
        
        galleryAdminPageImages.classList.remove('hidden');
        document.querySelector('.add-image').classList.add('hidden');
        document.querySelector('.edit-image').classList.add('hidden');
    })

    document.querySelector('.edit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log(document.querySelector('.add-image'));
        const name = document.querySelector('#edit-name');
        const url = document.querySelector('#edit-url');
        // const date = document.querySelector('#edit-date');
        const information = document.querySelector('#edit-information');
        
        let date = new Date();
        let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        let obj = {
            "id": currID,
            "url": `${url.value}`,
            "name": `${name.value}`,
            "information": `${information.value}`,
            "uploadedDate": `${today}`
        };

        var index = doc9.map((item) => {return item.id;}).indexOf(currID);
        doc9[index] = obj
        loadCards();
        
        galleryAdminPageImages.classList.remove('hidden');
        document.querySelector('.add-image').classList.add('hidden');
        document.querySelector('.edit-image').classList.add('hidden');
    })
}



function loadData() {
    let images = ''
    doc9.map((image) => {
        images += `
        <img src="${image.url}" alt="x">
        `
    });
    document.querySelector('.grid').innerHTML = images;
}

function loadCards() {
    
    let date = new Date();
    let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


    let images = ''
    doc9.map((image) => {
        images += `
        <div class="card">
            <img src="${image.url}" alt="image" style="width:100%">
            <div class="container">
                <h4><b>${image.name}</b></h4>
                <p>${image.information} ${image.uploadedDate}</p>
                <div class="card-buttons">
                    <button class="green">Edit <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <button class="red">Remove <i class="fa fa-times" aria-hidden="true"></i></button>                                        
                </div>
                
            </div>
        </div>
        `
    });
    document.querySelector('#fu').innerHTML = images;
}


function doTask(e) {
    if(e.target.classList.contains('red')) {
        removeImage(e.target.parentElement.parentElement.parentElement);
        e.target.parentElement.parentElement.parentElement.remove();
    } else if(e.target.classList.contains('green')) {
        editImage(e.target.parentElement.parentElement.parentElement);
    }
}

function removeImage(e) {
    let src = e.children[0].src;
    var index = doc9.map((item) => {return item.url;}).indexOf(src);
    doc9.splice(index, 1);
    loadCards();
}

function editImage(e) {
    let src = e.children[0].src;
    var index = doc9.map((item) => {return item.url;}).indexOf(src);
    let item = doc9[index];
    console.log(item);

    currID = item.id;

    document.querySelector('.add-image').classList.add('hidden');
    galleryAdminPageImages.classList.add('hidden');
    document.querySelector('.edit-image').classList.remove('hidden');
    
    let editContent = `
            <label for="url">URL</label>
            <input id="edit-url" type="url" name="url" placeholder="url" autocomplete="off" value = "${item.url}" required/>

            <label for="name">Name</label>
            <input id="edit-name" type="text" name="name" placeholder="Name" autocomplete="off" value = "${item.name}" required/>

            <label for="information">Information</label>
            <input id="edit-information" type="text" name="information" placeholder="Information" value = "${item.information}" autocomplete="off" required/>

            
            <div style="display: flex; width: 25%; margin: auto;">
                <input type="submit" value="submit" class="add-submit">
            </div>
        `;
    document.querySelector('.edit-form').innerHTML = editContent;
}
