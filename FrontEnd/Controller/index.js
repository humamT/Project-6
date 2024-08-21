import {
    fetchCategories
} from "../Model/catagories.js"

import {
    fetchWorks
} from "../Model/works.js"

//// FILTERS //// 

const createCategoryElement = function (category) {
    const button = document.createElement("button");
    button.innerText = category.name
    button.setAttribute("data-id", category.id)
    return button
}

const initFilters = async function () {
    let categories = await fetchCategories()
    let categoriesElements = categories.map(createCategoryElement)
    const filter = document.querySelector(".filter")
    filter.appendChild(createCategoryElement({
        id: 0,
        name: "Tous"
    }))
    categoriesElements.forEach((category) => {
        filter.appendChild(category)
    })

    // Selecting the filter buttons and the filterable images

    const filterButtons = document.querySelectorAll(".filter button");
    filterButtons[0].classList.add("active")
    const gallery = document.querySelectorAll(".gallery figure");

    // Define the filterimages function
    const filterimages = (e) => {
        let active = document.querySelector(".active")
        if (active) active.classList.remove("active");
        e.target.classList.add("active");
        // Optional: to test the selected elements console.log(e.target);

        // iteratte over each filterable image
        gallery.forEach(figure => {
            // add "hide" class to the card initially
            figure.classList.add("hide");
            // check if the figure matches the selected filter or "all" is selected
            if (figure.dataset.id === e.target.dataset.id || e.target.dataset.id === "0") {
                figure.classList.remove("hide");
            }
        })
    };

    // Add click event listener to each filter button
    filterButtons.forEach(button => button.addEventListener("click", filterimages));

    // Optional: to test the selected elements console.log(filterButtons, gallery);
}
initFilters();