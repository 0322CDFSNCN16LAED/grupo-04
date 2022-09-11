const validations = [
  {
    inputName: "diaTurno",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debes seleccionar una fecha",
      },
      {
        validator: (input)=> (new Date().toISOString().split('T')[0]) < input.value,
        errorMsg: "Debes seleccionar una fecha válida",
      },
    ],
  },
  {
    inputName: "horario",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debes seleccionar un horario entre las 8:00 y las 20:00 horas",
      },
      {
        validator: (input) => input.value > "8:00" || input.value < "20:00",
        errorMsg: "Debes seleccionar un horario entre las 8:00 y las 20:00 horas",
      },
    ],
  },
  {
    inputName: "metodoPago",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debes seleccionar un método de pago",
      },
    ],
  }
];

window.onload = function () {
  const formulario = document.querySelector("#formulario");

  formulario.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const errores = [];

    validations.forEach((inputToValidate) => {
      const input = formulario[inputToValidate.inputName];
      console.log(input.value)
      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
        console.log(isValid)
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