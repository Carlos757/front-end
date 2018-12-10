var detalle = localStorage.getItem("detalle");

var buscaDetalleComics = function() {
  document.getElementById("MonedaDetalle").innerHTML = "";
  document.getElementById("MonedaDetalle").innerHTML += `


         ${window.open(detalle, "_self")}
        


      `;
};

buscaDetalleComics();
