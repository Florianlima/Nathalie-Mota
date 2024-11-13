
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

(function ($) {
    $(document).ready(function () {
        let currentPage = 2;
        
    
        $('#load-more-btn').on('click', function () {
            console.log('Bouton "Charger plus" cliqué');
            let button = $(this);
            let postId = button.data('postid');
            let nonce = button.data('nonce');
            let action = button.data('action');
            let ajaxurl = button.data('ajaxurl');

            let data = {
                action: action,
                nonce: nonce,
                page: currentPage,
                postid: postId,
            };

            console.log("Données envoyées", data);

            fetch(ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: new URLSearchParams(data),
            })
            .then(response => response.json())
            .then(responseData => {
                console.log("Réponse reçue", responseData);

                if (responseData.success && responseData.data.html) {
                    $('#photos-list').append(responseData.data.html);
                    currentPage++;
                }

                if (!responseData.data.post_next_page) {
                    $('#load-more-btn').hide();
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        });
    });
})(jQuery);
