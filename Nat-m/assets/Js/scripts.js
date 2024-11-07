
const modalContainer = document.querySelector(".modal-container");


document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");
    const contactTrigger = document.querySelector(".menu-item-18 > a");


    contactTrigger.classList.add("modal-trigger");


    contactTrigger.addEventListener("click", function (event) {
        event.preventDefault();

        toggleModal();
    });

    overlay.addEventListener("click", function (event) {
        event.preventDefault();

        toggleModal();
    });

    modal.addEventListener("click", function (event) {
        event.stopPropagation();
    });


    function toggleModal() {
        modalContainer.classList.toggle("active");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const contactTriggerCPT = document.querySelector(".contact-button");


    if (contactTriggerCPT) {
        contactTriggerCPT.addEventListener("click", toggleModalCPT);
    }
});


function toggleModalCPT() {
    modalContainer.classList.toggle("active");
    console.log("Bouton contact cliqué !");
}


const lineBreakTitles = document.querySelectorAll(".line-break-title");
lineBreakTitles.forEach(function(title) {
    const words = title.textContent.split(" ");
    title.innerHTML = words.join("<br>");
});


const contactButton = document.querySelector('.contact-button');
const modalRefField = document.querySelector('input[name="your-subject"]');

if (contactButton && modalRefField) {
    contactButton.addEventListener('click', function (event) {
        event.preventDefault();


        const referenceElement = document.querySelector('.post-reference');
        const reference = referenceElement ? referenceElement.textContent.trim().replace('Référence : ', '') : '';


        modalRefField.value = reference;
    });
}