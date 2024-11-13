
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


//---------------------- Requete AJAX ------------------------------//



document.addEventListener('DOMContentLoaded', function () {

    const button = document.getElementById('load-more-btn');

    button.addEventListener('click', function () {
        console.log('Bouton "Charger plus" cliqué');
        const ajaxurl = button.getAttribute('data-ajaxurl');

        const data = {
            action: button.getAttribute('data-action'),
            nonce:  button.getAttribute('data-nonce'),
            postid: button.getAttribute('data-postid'),
            page: 2,
        };

        console.log("Données envoyées", data.toString());

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(responseData => {
            console.log("Réponse reçue", responseData);

            if (responseData.success && responseData.data.html) {
                document.getElementById('photos-list').insertAdjacentHTML('beforeend', responseData.data.html);
            }

            if (!responseData.data.post_next_page) {
                button.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Erreur Fetch:', error);
        });
    });
});

