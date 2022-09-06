const isEmpty = (input) => input.value.trim() != "";

const validations = [
  {
    inputName: "materiales",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe detallar los materiales Frontend",
      },
    ],
  },
  {
    inputName: "precioMateriales",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes colocar el precio Frontend ",
      },
    ],
  },
  {
    inputName: "manoDeObra",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe detallar este campo Frontend",
      },
    ],
  },
  {
    inputName: "precioManoObra",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes colocar un precio Frontend",
      },
    ],
  },
  {
    inputName: "duracionTrabajo",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes colocar un tiempo aproximado Frontend",
      },
    ],
  },
  {
    inputName: "comentariosTrabajo",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe completar este campo Frontend",
      },
    ],
  },
  {
    inputName: "precioFinal",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes colocar el precio Frontend",
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
      console.log("No hay errores, yay!");
    } else {
      console.log(errores);
    }
  });
};
