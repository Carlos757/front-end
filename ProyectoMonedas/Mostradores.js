var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador");
const { BrowserWindow } = require("electron").remote;
const app = require("electron").app;
const path = require("path");
const url = require("url");
let PantallaMonedas;

var btnMostradores = document.getElementsByClassName("btnMostrar");

var VentanaMonedas = function() {
  localStorage.setItem("mostrador", this.value);

  PantallaMonedas = new BrowserWindow({ width: 620, height: 600 });
  PantallaMonedas.loadURL(
    url.format({
      pathname: path.join(__dirname, "VentanaMonedas.html"),
      protocol: "file",
      slashes: true
    })
  );

  PantallaMonedas.show();
};

var buscaMostradores = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      mostradores = datos.mostradores;
      var resultado = "";
      for (let i = 0; i < mostradores.length; i++) {
        resultado += `

		<article id="ventanaMost">
			<span id="most">${datos.mostradores[i].titulo}</span>
          	<img src="img/flecha.png" alt="">
          	<button class="btnMostrar btnMostradores" id="btnVer"value="${i}">Ver</button>        
		</article>
			`;
      }
      resultado += "</ol>";
      document.getElementById("Mostradores").innerHTML = resultado;

      for (let i = 0; i < btnMostradores.length; i++) {
        btnMostradores[i].addEventListener("click", VentanaMonedas);
      }
    });
};

buscaMostradores();
