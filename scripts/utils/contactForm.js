/********** Display contact form and apply a filter on the body ***********/
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.focus();
  const filter = document.createElement("div");
  document.body.appendChild(filter);
  filter.style.display = "block";
  filter.setAttribute("class", "when-modal-is-displayed");
}

/********** Close contact form and remove the filter on the body ***********/

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const filter = document.querySelector(".when-modal-is-displayed");
  filter.classList.remove("when-modal-is-displayed");
}

document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

/*********** ***********/
/*********** Add an event listener on the form  ***********/
const form = document.querySelector(".contact-form");
form.addEventListener("submit", validate);

/*********** Inputs checking ***********/
/*********** DOM elements selection ***********/
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");

/*********** Regex for surname, name, and email ***********/
const nameValidation = /^[A-Za-zÀ-ÿ -]+$/;
const emailValidation = /^[a-zA-Z][a-z@.]/;
const messageValidation = /^.{2,}$/;

/*********** First name validation ***********/
function firstNameCheck() {
  if (firstName.value.trim() === "" || !nameValidation.test(firstName.value)) {
    firstName.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom"
    );
    firstName.parentElement.setAttribute("data-error-visible", true);
  } else {
    firstName.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

/********** Last name validation ***********/
function lastNameCheck() {
  if (lastName.value.trim() === "" || !nameValidation.test(lastName.value)) {
    lastName.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom"
    );
    console.log("Le nom n'est pas au bon format");

    lastName.parentElement.setAttribute("data-error-visible", true);
  } else {
    lastName.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

/********** Email validation ***********/

function emailCheck() {
  if (email.value.trim() === "" || !emailValidation.test(email.value)) {
    email.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner votre email"
    );
    email.parentElement.setAttribute("data-error-visible", true);
  } else {
    email.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

/********** Message validation***********/

function messageCheck() {
  if (message.value.trim() === "" || !messageValidation.test(message.value)) {
    message.parentElement.setAttribute(
      "data-error",
      "Veuillez écrire votre message"
    );
    message.parentElement.setAttribute("data-error-visible", true);
  } else {
    message.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

/********** Validate fonction on submit **********/
function validate(event) {
  event.preventDefault();

  firstNameCheck();
  lastNameCheck();
  emailCheck();
  messageCheck();

  if (firstNameCheck() && lastNameCheck() && emailCheck() && messageCheck()) {
    storeDataInConsole();
    closeModal();
    resetForm();
    return true;
  } else {
    return false;
  }
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
  let form = document.querySelector(".contact-form");
  form.reset();
}

function storeDataInConsole() {
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = email.value;
  const messageValue = message.value;

  console.log("Prénom :", firstNameValue);
  console.log("Nom :", lastNameValue);
  console.log("Email :", emailValue);
  console.log("Message :", messageValue);
}
