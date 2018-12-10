window.onload= function(){

  var vitrina = localStorage.getItem("indice");
  var mostrador = localStorage.getItem("mostrador");
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  fetch('http://localhost/pw218309server/mostrarFavoritos.php')
  .then(dat=>dat.json())
  .then(dat=>{
    fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
            
      document.getElementById("VentanaMonedas").innerHTML = "";
      grupos = datos.mostradores[grupo].grupos;
      var foto = "";
      var descrip = "";
      var botonfav='';
      var bot;
      for (let i = 0; i < grupos.length; i++) {
        descrip = datos.mostradores[grupo].grupos[i].descripcion;
        if (descrip == null) {
          descrip = "Grupo de Piezas";
        }
        
        if (datos.mostradores[grupo].grupos[i].unico) {
           console.log('si entra');
          bot='<button class="btnMostradores" value="'+i+'">Detalle</button>';
          if (dat.length!=0) {
            for (var y = 0; y < dat.length; y++) {            
              if (datos.mostradores[grupo].grupos[i].id==dat[y].favId) {              
                botonfav='<button class="btnFavoritos" value="'+datos.mostradores[grupo].grupos[i].id+'"><img id="'+datos.mostradores[grupo].grupos[i].id+'" src="img/rojo.png"/></button>';                                
                break;
              }else{              
                botonfav='<button class="btnFavoritos" value="'+datos.mostradores[grupo].grupos[i].id+'"><img id="'+datos.mostradores[grupo].grupos[i].id+'" src="img/blanco.png"/></button>';                
              }
            }
          }else{
            botonfav='<button class="btnFavoritos" value="'+datos.mostradores[grupo].grupos[i].id+'"><img id="'+datos.mostradores[grupo].grupos[i].id+'" src="img/blanco.png"/></button>';                
          }          
                   
        
        }else{         
          bot='<button class="btnMostradores" value="'+i+'">Piezas</button>';
        }        
        document.getElementById("VentanaMonedas").innerHTML += `
        <article class="abajoIzquierda info">
          <img src="${datos.mostradores[grupo].grupos[i].imagenFondoUrl}" class="imgFoto">
          
      
          <div >${datos.mostradores[grupo].grupos[i].titulo}</div>
          <div >${descrip}</div>
          ${bot} 
          <span class="favBtn">${botonfav}</span>
        </article>        


      `;
      botonfav='';
      }

      for (let i = 0; i < btnMostradores.length; i++) {
        btnMostradores[i].addEventListener("click", VentanaDetalleMonedas);       
      }
      for (let i = 0; i < btnFavoritos.length; i++) {        
        btnFavoritos[i].addEventListener("click", agregaFav);
      }

      
    })
  })  
  
  
}
var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador");

var fav;
const { BrowserWindow } = require("electron").remote;
const app = require("electron").app;
const path = require("path");
const url = require("url");
let PantallaDetalleMonedas;
let PantallaDetalleGrupos;

var btnMostradores = document.getElementsByClassName("btnMostradores");
var btnFavoritos = document.getElementsByClassName("btnFavoritos");


var VentanaDetalleMonedas = function() {
  var unico = "";
  var detalle = "";
  var detalleGrupo = "";

  var urls = "http://museobillete.azurewebsites.net/api/Expo/";
  fetch(urls + indice)
    .then(datos => datos.json())
    .then(datos => {
      unico = datos.mostradores[grupo].grupos[this.value].unico;      

      if (unico == true) {
        detalle =
          datos.mostradores[grupo].grupos[this.value].piezas[0].detallesUrl;            
        localStorage.setItem("detalle", detalle);
        PantallaDetalleMonedas = new BrowserWindow({ width: 500, height: 400 });
        PantallaDetalleMonedas.loadURL(
          url.format({
            pathname: path.join(__dirname, "MonedaDetalle.html"),
            protocol: "file",
            slashes: true
          })
        );

        //PantallaDetalleMonedas.show();
      } else {
        detalleGrupo = this.value;        
        localStorage.setItem("detalleGrupo", detalleGrupo);
        PantallaDetalleGrupos = new BrowserWindow({ width: 700, height: 600 });
        PantallaDetalleGrupos.loadURL(
          url.format({
            pathname: path.join(__dirname, "PantallaDetalleGrupos.html"),
            protocol: "file",
            slashes: true
          })
        );        
      }
    });
};
var agregaFav=function(){
  var fid=this.value.toString();  
  var x=document.getElementById(fid);
  var atributo = x.getAttribute('src');  
  if (atributo=='img/blanco.png') {
    document.getElementById(fid).src="img/rojo.png";            
    var urls = "http://museobillete.azurewebsites.net/api/Expo/";
    fetch(urls + indice)
      .then(datos => datos.json())
      .then(datos => {           
        fav=this.value;                    
          const data = new FormData();
          data.append('favId',fav);          
          fetch('http://localhost/pw218309server/favoritos.php',{
            method:'post',
            body:data
          })                    
      })
  }else{
    document.getElementById(fid).src="img/blanco.png";
    var id=this.value;
    const data = new FormData();
    console.log(id);
    data.append("id",id);                  
    fetch('http://localhost/pw218309server/eliminar.php',{
      method:'post',
      body:data
    })        
  }
        
  
      
}




