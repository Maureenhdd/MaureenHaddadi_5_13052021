const modal_contact = document.querySelector(".modal");
const modal_btn = document.querySelector(".btn__contact")
const closeModalIcon = document.querySelector(".modal_content__close")
const main = document.querySelector(".main")
modal_btn.addEventListener("click", launchModal)

// OPEN 

function launchModal() {
    modal_contact.style.display = "block";
    modal_contact.setAttribute('aria-hidden', 'false')
    main.setAttribute('aria-hidden', 'true')
    modal_contact.focus()
}

// CLOSE MODAL
closeModalIcon.addEventListener("click", closeModal)
function closeModal() {
    modal_contact.style.display = "none"
    modal_contact.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'false')
}


// GET VALUES 

const lastName = document.getElementById('last_name')
const email = document.getElementById('email')
const message = document.getElementById('message')
const form = document.querySelector('.modal_form')


form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log("   message : " + message.value + " nom :" + lastName.value + "   email :" + email.value)
})