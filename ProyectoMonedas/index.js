window.onload = function() {
  const { BrowserWindow } = require("electron").remote;
  const app = require("electron").app;
  const path = require("path");
  const url = require("url");
  let PantallaMostradores;
  let PantallaFavoritos;
  var btnMostradores = document.getElementsByClassName("btnMostradores");

  var Mostradores = function() {
    //alert(this.value);
    var variable = "";

    var urls = "http://museobillete.azurewebsites.net/api/Expo";
    fetch(urls)
      .then(datos => datos.json())
      .then(datos => {
        variable = datos[this.value].id;
        console.log(variable);
        localStorage.setItem("indice", variable);
      });

    PantallaMostradores = new BrowserWindow({ width: 400, height: 540 });
    PantallaMostradores.loadURL(
      url.format({
        pathname: path.join(__dirname, "Mostradores.html"),
        protocol: "file",
        slashes: true
      })
    );

    PantallaMostradores.show();
  };

  var MostrarVitrinas = function() {
    // personaje=document.getElementById('txtPersonaje').value;
    var url = "http://museobillete.azurewebsites.net/api/Expo";
    fetch(url)
      .then(datos => datos.json())
      .then(datos => {
        var vitrina = "";
        var foto = "";
        document.getElementById("abajo").innerHTML = "";
        for (let i = 0; i < datos.length; i++) {
          vitrina = datos[i].titulo;
          foto = datos[i].imagenFondoUrl;

          document.getElementById("abajo").innerHTML += `
          <article class="abajoIzquierda contenido info">
				<img src="${foto}" class="imgFoto">
				<span class="txtNombre roboto">${vitrina}</span>
				<button class="btnMostradores roboto" id="btnMos" value="${i}">Mostrador</button>

		   </article>
			

			`;
        } //termina for
        for (let i = 0; i < btnMostradores.length; i++) {
          btnMostradores[i].addEventListener("click", Mostradores);
        }
      });
  };

  var muestraFavoritos=function(){                
    localStorage.setItem("fav",this.value);
    localStorage.setItem("favoritos",favoritos);
    pantallaDetalle=new BrowserWindow({width:610,height:500})
    pantallaDetalle.loadURL(url.format({
      pathname: path.join(__dirname,'PantallaFavoritos.html'),
      protocol:'file',
      slashes:true
    }))    
  }




  MostrarVitrinas();
  var btnFavoritos=document.getElementById('btnFavoritos');
  btnFavoritos.addEventListener('click',muestraFavoritos)
  
};
