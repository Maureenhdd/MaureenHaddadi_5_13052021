const modal_contact = document.querySelector(".modal");
const modal_btn = document.querySelector(".btn__contact")
const closeModalIcon = document.querySelector(".modal_content__close")
modal_btn.addEventListener("click", launchModal)
function launchModal() {
    modal_contact.style.display = "block";
}

closeModalIcon.addEventListener("click", closeModal)
function closeModal() {
    modal_contact.style.display = "none"
}