window.onload = async () => {
  const checkbox = document.querySelector("#rubro");


  checkbox.addEventListener("click", async () => {
    if (checkbox.checked){
        checkbox.innertext = "checked"
    }
    
  });
};
