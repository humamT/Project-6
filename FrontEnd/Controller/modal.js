import { fetchWorks, addWork, deleteWork } from "../Model/works.js";
import { initWorks, displayWorks } from "../Controller/index.js"
// To create the edit gallery modal //

export const editGalleryContainer = document.querySelector(".edit-gallery"); // Edit gallery container

export function createWorkElementModal(work) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let button = document.createElement('button');
    button.classList.add('trash-icon');
    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-trash-can');
    button.addEventListener('click', handleRemove(work.id));
    img.src = work.imageUrl;
    figure.appendChild(img);
    figure.appendChild(button);
    button.appendChild(i);
    return figure;
}

// To switch between the two modals or close them //

const initModalForm = function () {
    const editButton = document.getElementById("edit");
    const modalOverlay = document.querySelector(".overlay");
    const addOverlay = document.querySelector(".ajouter-photo");
    const galleryOverlay = document.querySelector(".gallery-photo");
    const backGround = document.querySelector(".background");

    backGround.addEventListener("click", function () {
        modalOverlay.classList.add("hidden");
    })

    editButton.addEventListener("click", function () {
        modalOverlay.classList.remove("hidden");
        addOverlay.classList.add("hidden");
        galleryOverlay.classList.remove("hidden");
    });

    const closeButton = document.getElementById("close");
    const closeButton2 = document.getElementById("close-2");
    closeButton.addEventListener("click", function () {
        modalOverlay.classList.add("hidden");
    });
    closeButton2.addEventListener("click", function () {
        modalOverlay.classList.add("hidden");
    });

    const addButton = document.getElementById("add");
    addButton.addEventListener("click", function () {
        addOverlay.classList.remove("hidden");
        galleryOverlay.classList.add("hidden");
    });

    const backButton = document.getElementById("back");
    backButton.addEventListener("click", function () {
        addOverlay.classList.add("hidden");
        galleryOverlay.classList.remove("hidden");
    });

    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is being retrieved correctly
};

initModalForm();

// To add the delete works //

function handleRemove(workId) {
    return async function (event) {
        event.preventDefault();
        try {
            await deleteWork(workId);
            document.works = document.works.filter((work) => work.id !== workId);
            displayWorks(document.works);
        } catch (error) {
            console.log(error);
        }
    };
}

// To upload an image //

const titleInput = document.getElementById('titre');
const categorySelect = document.getElementById('categorie');

document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById("inputFile");
    const preview = document.getElementById("preview");
    const imgIcon = document.querySelector(".imgIcon");
    const fileName = document.getElementById("fileName");
    const max = document.getElementById("max");
    const addWorkBtn = document.getElementById('add-photo');

    inputElement.addEventListener("change", handleFiles, false);

    function handleFiles(event) {
        const files = event.target.files;

        // Clear the preview container before adding new images
        preview.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            var filesize = ((file.size / 1024) / 1024).toFixed(4);
            console.log(file.type)

            if (!file.type.startsWith("image/png") && !file.type.startsWith("image/jpeg")) {
                alert('le fichier sélectionné n`est pas supporté')
                return; // Skip non-image files
            }

            if (filesize >= 4) {
                alert('la taille de l`image est supérieure à 4 Mo');
                return;
            }


            const img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            preview.appendChild(img); // Add the image to the preview container

            imgIcon.classList.add("hidden");
            fileName.classList.add("hidden");
            max.classList.add("hidden");

            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result; // Set the src of the img element to the file data
            };
            reader.readAsDataURL(file);
        }
    }

    function validModalForm() {
        const titleContent = titleInput.value.trim();
        const selectedCategory = Number(categorySelect.value);

        return inputElement.files.length > 0 && titleContent.length > 0 && selectedCategory !== 'empty';
    }

    categorySelect.addEventListener('change', () => {
        if (validModalForm()) {
            // All conditions are met, disable the button
            addWorkBtn.classList.remove('btn-disabled');
        } else {
            // One or more conditions are not met, activate the button
            addWorkBtn.classList.add('btn-disabled');
        }
    });

    addWorkBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        if (validModalForm()) {
            try {
                const selectedImg = inputElement.files[0];
                const titleContent = titleInput.value.trim();
                const selectedCategory = categorySelect.value;

                console.log(titleContent, selectedImg, selectedCategory);

                // Send the data to the server
                let result = await addWork(selectedImg, titleContent, selectedCategory);

                // Assuming document.works is where the works are stored
                document.works.push(result);

                //call initWorks
                initWorks()

                // Close the modal
                const modalOverlay = document.querySelector(".overlay");
                modalOverlay.classList.add("hidden");

                //empty privew

                inputElement.value = ""
                titleInput.value = ""
                categorySelect.value = 0
                
                preview.innerHTML = ""
                imgIcon.classList.remove("hidden");
                fileName.classList.remove("hidden");
                max.classList.remove("hidden");


            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Veuillez remplir tous les champs !');
        }
    });
});

