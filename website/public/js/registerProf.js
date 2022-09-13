const isEmpty = (input) => input.value.trim() != "";
const minDos = (input) => input.value.trim() < 2;
const minOcho = (input) => input.value.trim() < 8;

const validations = [
  {
    inputName: "name",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Nombre no puede estar vacío",
      },
      {
        validator: minDos,
        errorMsg: "Nombre debe tener al menos dos caracteres",
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
      {
        validator: minDos,
        errorMsg: "Apellido debe tener al menos dos caracteres",
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
      {
        validator: minOcho,
        errorMsg: "Contraseña debe tener al menos ocho caracteres",
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
    inputName: "rubro",
    validations: [
      {
        errorMsg: "Debe seleccionar al menos un Rubro",
        validator: (input) => {
          let isValid = false;
          input.forEach((element) => {
            if (element.checked) {
              isValid = true;
            }
          });
          return isValid;
        },
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
  {
    inputName: "finished-jobs",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes subir una imagen de algun trabajo realizado",
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
          if (inputToValidate.inputName == "rubro") {
            document.querySelector("#errorRubro").innerHTML =
              validation.errorMsg;
              console.log(document.querySelector("#errorRubro"));
          } else {
            input.parentElement.classList.add("is-notvalid");
            input.parentElement.classList.remove("is-valid");
            input.parentElement.querySelector(".error").innerHTML =
              validation.errorMsg;
          }
          return;
        }
      }
      input.parentElement.classList.add("is-valid");
      input.parentElement.classList.remove("is-notvalid");
      input.parentElement.querySelector(".error").innerHTML = "";
      document.querySelector("#errorRubro").innerHTML = "";
    });

    if (errores.length == 0) {
      formulario.submit();
    } else {
      console.log(errores);
    }
  });
};
