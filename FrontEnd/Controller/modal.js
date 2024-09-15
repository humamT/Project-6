import {
    fetchWorks, addWork, deleteWork
} from "../Model/works.js"


// to create the edit gallery modal //

const editGalleryContainer = document.querySelector(".edit-gallery");  // Edit gallery container

function createWorkElement(work) {
    let figure = document.createElement("figure")
    let img = document.createElement("img")
    let button = document.createElement('button')
    button.classList.add('trash-icon')
    let i = document.createElement('i')
    i.classList.add('fa-solid', 'fa-trash-can')
    button.addEventListener('click', handleRemove(work.id))
    img.src = work.imageUrl
    figure.appendChild(img)
    figure.appendChild(button)
    button.appendChild(i)
    return figure
}

function displayWorks(works) {
    let worksElement = works.map(createWorkElement)
    editGalleryContainer.innerHTML = ""
    worksElement.forEach((work) => {
        editGalleryContainer.appendChild(work)
    })
}

async function initWorks() {
    document.works = await fetchWorks(); // Fetch works (images)
    if (!document.works) {
        console.error("Failed to fetch images");
        return;
    }
    displayWorks(document.works)
}

initWorks()

// to swicth between the two modals or close them //

const initModalForm = function () {
    const editButton = document.getElementById("edit")
    const modalOverlay = document.querySelector(".overlay")
    editButton.addEventListener("click", function (event) {
        modalOverlay.classList.remove("hidden")
        addOverlay.classList.add("hidden")
        galleryOverlay.classList.remove("hidden")
    })

    const closeButton = document.getElementById("close");
    const closeButton2 = document.getElementById("close-2");
    closeButton.addEventListener("click", function (event) {
        modalOverlay.classList.add("hidden");
    });
    closeButton2.addEventListener("click", function (event) {
        modalOverlay.classList.add("hidden");
    });

    const addButton = document.getElementById("add")
    const addOverlay = document.querySelector(".ajouter-photo")
    const galleryOverlay = document.querySelector(".gallery-photo")
    addButton.addEventListener("click", function (event) {
        addOverlay.classList.remove("hidden")
        galleryOverlay.classList.add("hidden")
    })

    const backButton = document.getElementById("back")
    backButton.addEventListener("click", function (event) {
        addOverlay.classList.add("hidden")
        galleryOverlay.classList.remove("hidden")
    })

}


initModalForm();

// to add the delete trash can and delete works//

function handleRemove(workId) {
    return async function (event) {
        event.preventDefault()
        try {
            await deleteWork(workId)
            document.works = document.works.filter((work) => {
                if (work.id === workId) {
                    return false
                } else {
                    return true
                }
            })
            initModalForm()
            displayWorks(document.works)
        }
        catch (error) {
            console.log(error)
        }
    }
}

// to upload an image//



const uploadButton = document.querySelector(".plus button"); // Button to trigger file upload
const inputForm = document.querySelector(".input"); // Input form
const validerButton = document.querySelector(".valider"); // Submit button
const titleInput = document.getElementById("titre"); // Title input field
const categorySelect = document.getElementById("categorie"); // Category select input

/*
function addTrashIcon(clonedImageElement, originalImageElement) {
    // Create the trash can icon element using FontAwesome
    const trashIcon = document.createElement('i');
    trashIcon.className = 'fa-solid fa-trash-can trash-icon';

    // Set the position style of the cloned image element to relative to ensure absolute positioning works
    clonedImageElement.style.position = 'relative';

    // Append the trash icon to the cloned image element
    clonedImageElement.appendChild(trashIcon);

    // Add click event to remove both the cloned and original image elements
    trashIcon.addEventListener('click', () => {
        clonedImageElement.remove(); // Remove from cloned gallery
        originalImageElement.remove(); // Remove from original gallery
    });
}

/**
 * Reuse createImageElement function from index.js
 * Function to create an image element for the gallery.
 * @param {Object} imageData - The data for the image.
 * @returns {HTMLElement} The created image element.
 

function createImageElement(imageData) {
    const figure = document.createElement("figure");
    figure.classList.add("gallery-item");
    figure.setAttribute("data-id", imageData.categoryId);

    const img = document.createElement("img");
    img.src = imageData.imageUrl; // Assuming imageData.imageUrl contains the image URL
    img.alt = imageData.title || "Image"; // Optional: Adding an alt text

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = imageData.title || "Caption"; // Optional: Adding a caption

    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}
*/
