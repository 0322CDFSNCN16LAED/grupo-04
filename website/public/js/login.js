const isEmpty = (input) => input.value.trim() != "";

const validations = [
  {
    inputName: "email",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes completar tu email",
      },
      {
        validator: (input) => /\S+@\S+\.\S+/.test(input.value) != "",
        errorMsg: "Email debe tener un formato válido",
      },
    ],
  },
  {
    inputName: "password",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes completar tu contraseña",
      },
    ],
  },
];

window.onload = function () {
  const formulario = document.querySelector("#formulario");

  formulario.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const errores = [];

    validations.forEach((inputToValidate) => {
      const input = formulario[inputToValidate.inputName];
      console.log(input.value);
      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
        console.log(isValid);
        if (!isValid) {
          errores.push(validation.errorMsg);
          input.parentElement.classList.add("is-notvalid");
          input.parentElement.classList.remove("is-valid");
          input.parentElement.querySelector(".error").innerHTML =
            validation.errorMsg;
          return;
        }
      }
      input.parentElement.classList.add("is-valid");
      input.parentElement.classList.remove("is-notvalid");
      input.parentElement.querySelector(".error").innerHTML = "";
    });

    if (errores.length > 0) {
      console.log(errores);
    } else {
      formulario.submit();
    }
  });
};