export async function fetchCategories() {
    // Implementation of fetchCategories if needed
}

// Selecting the filter buttons and the filterable images
const filterButtons = document.querySelectorAll(".filter button");
const gallery = document.querySelectorAll(".gallery figure");

// Define the filterimages function
const filterimages = (e) => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    // Optional: to test the selected elements console.log(e.target);

    // iteratte over each filterable image
    gallery.forEach(figure => {
        // add "hide" class to the card initially
        figure.classList.add("hide");
        // check if the figure matches the selected filter or "all" is selected
        if(figure.dataset.name === e.target.dataset.name || e.target.dataset.name === "Tous"){
            figure.classList.remove("hide");
        }
    })
};

// Add click event listener to each filter button
filterButtons.forEach(button => button.addEventListener("click", filterimages));

// Optional: to test the selected elements console.log(filterButtons, gallery);