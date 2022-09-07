const isEmpty = (input) => input.value.trim() != "";

const validations = [
  {
    inputName: "tituloSolicitud",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Titulo no puede ser vacío",
      },
    ],
  },
  {
    inputName: "detalleSolicitud",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Detalle no puede ser vacío",
      },
    ],
  },
  {
    inputName: "rubroNombre",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Rubro no puede ser vacío",
      },
    ],
  },
  {
    inputName: "imgReferencia",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes subir una imagen de referencia",
      },
      {
        validator: (input) => /.(gif|jpeg|jpg|png|tif)$/i.test(input.value) != "",
        errorMsg: "Debe ingresar un archivo válido (JPG, JPEG, PNG, GIF, TIF).",
      },
    ],
  },
  {
    inputName: "urgenciaTrabajo",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Fecha no puede ser vacío",
      },
    ],
  },
  {
    inputName: "ubicacion",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Ubicacion no puede ser vacío",
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
