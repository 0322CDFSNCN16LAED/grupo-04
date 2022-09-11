const isEmpty = (input) => input.value.trim() != "";

const validations = [
  {
    inputName: "name",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Nombre no puede estar vacío",
      },
    ],
  },
  {
    inputName: "lastName",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Apellido no puede estar vacío",
      },
    ],
  },
  {
    inputName: "userName",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Nombre de usuario no puede estar vacío",
      },
    ],
  },
  {
    inputName: "email",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Email no puede estar vacío",
      },
    ],
  },
  {
    inputName: "password",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Contraseña no puede estar vacío",
      },
    ],
  },
  {
    inputName: "phone",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Teléfono no puede estar vacío",
      },
    ],
  },
  {
    inputName: "DNI",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "DNI no puede estar vacío",
      },
    ],
  },
  {
    inputName: "address",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Dirección no puede estar vacío",
      },
    ],
  },
  {
    inputName: "city",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Ciudad no puede estar vacío",
      },
    ],
  },
  {
    inputName: "state",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Provincia no puede estar vacío",
      },
    ],
  },
  {
    inputName: "zipCode",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Código Postal no puede estar vacío",
      },
    ],
  },
  {
    inputName: "avatar",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes subir una imagen de perfil",
      },
      {
        validator: (input) =>
          /.(gif|jpeg|jpg|png|tif)$/i.test(input.value) != "",
        errorMsg:
          "Debes ingresar un archivo válido (JPG, JPEG, PNG, GIF, TIF).",
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

      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
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

    if (errores.length == 0) {
      formulario.submit();
    } else {
      console.log(errores);
    }
  });
};
