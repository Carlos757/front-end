var detalleGrupo = localStorage.getItem("detalleGrupo");
var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador");
var btnFavoritos = document.getElementsByClassName("btnFavoritos");
var btnGrupos = document.getElementsByClassName("btnGrupos");
var grupodetalle = "";

window.onload=function(){
    fetch('http://localhost/pw218309server/mostrarFavoritos.php')   
    .then(guardados => guardados.json())
    .then(guardados => {
      fetch('http://museobillete.azurewebsites.net/api/Expo/V4')
      .then(datos=>datos.json())
      .then(datos=>{
          for (var gru = 0; gru < datos.mostradores[grupo].grupos.length; gru++) {  
            for (var pie = 0; pie < datos.mostradores[grupo].grupos[gru].piezas.length; pie++) {
              for (var g = 0; g < guardados.length;g++) {
                if (datos.mostradores[grupo].grupos[gru].piezas[pie].id==guardados[g].favId) {
                  document.getElementById(guardados[g].favId).src="img/rojo.png";
                }
              }
                                  
            }     
          }
      })
    })   
    
}





var VentanaDetallegrupo = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      grupodetalle =
        datos.mostradores[grupo].grupos[detalleGrupo].piezas[this.value]
          .detallesUrl;
      console.log(grupodetalle);
      window.open(grupodetalle, "_self");
    });
};
var agregaFav=function(){	   
  var fid=this.value.toString();  
  var x=document.getElementById(fid);
  var atributo = x.getAttribute('src'); 
  console.log(fid); 
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
    data.append("id",id);                  
    fetch('http://localhost/pw218309server/eliminar.php',{
      method:'post',
      body:data
    })        
  }
}

var buscaDetalleGrupos = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";  
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      document.getElementById("VentanaGrupoMonedas").innerHTML = "";
      grupos = datos.mostradores[grupo].grupos[detalleGrupo].piezas;      
      var foto = "";
      for (let i = 0; i < grupos.length; i++) {
        document.getElementById("VentanaGrupoMonedas").innerHTML += `
                  <article class="abajoIzquierda info">                  
                      <img src="${
                        datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .imagenFondoUrl
                      }" class="imgFoto">
                      

                      <div class="txtNombre">${
                        datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .titulo
                      }</div>
                     
                      <button class="btnGrupos btnMostrar btnMostradores" value="${i}">Detalle</button>
                      <button class="btnFavoritos favBtn" value="${datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .id}"><img id="${datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .id}" src="img/blanco.png"/></button> 
                  </article>
  
              `;              
      }


      for (let i = 0; i < btnGrupos.length; i++) {
        btnGrupos[i].addEventListener("click", VentanaDetallegrupo);
      }
      for (let i = 0; i < btnFavoritos.length; i++) {        
        btnFavoritos[i].addEventListener("click", agregaFav);
      }
    });
};

buscaDetalleGrupos();
