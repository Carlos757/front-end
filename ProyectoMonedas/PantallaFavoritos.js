window.onload= function(){
	const { BrowserWindow } = require("electron").remote;
	const app = require("electron").app;
	const path = require("path");
	const ur = require("url");
	let PantallaDetalleMonedas;
	let PantallaDetalleGrupos;
	
	var url = "http://museobillete.azurewebsites.net/api/Expo/";	
	var indice = localStorage.getItem("indice");
	var grupo = localStorage.getItem("mostrador");
	var vitrina=localStorage.setItem("vit",'V1');
	var btnFavoritos = document.getElementsByClassName("btnFavoritos");
	var btnMostradores = document.getElementsByClassName("btnMostradores");
	var eliminarFav=function(){		
		var fid=this.value.toString();		
		var x=document.getElementById(fid);
		var atributo = x.getAttribute('src');		
		if (atributo=='img/rojo.png') {			
			document.getElementById(fid).src="img/blanco.png";
			var id=this.value;
			const data = new FormData();
        	data.append("id",id);                  
        	fetch('http://localhost/pw218309server/eliminar.php',{
            	method:'post',
            	body:data
          	})          
		}else{
			document.getElementById(fid).src="img/rojo.png";
			var fav=this.value;              		       
          	const data = new FormData();
          	data.append('favId',fav);          
         	fetch('http://localhost/pw218309server/favoritos.php',{
            	method:'post',
            	body:data
          	})      
		}		    	
	}

	function mostrarGrupos(guardados){
		if (guardados.length==0) {
			document.getElementById("artFav").innerHTML += `
				<article id="favoritosVacio"><h1>No hay favoritos</h1></article>				
			`
		}
		fetch('http://museobillete.azurewebsites.net/api/Expo/V4')
		.then(datos=>datos.json())
		.then(datos=>{
			for (var mos = 0; mos < datos.mostradores.length; mos++) {
				for (var gru = 0; gru < datos.mostradores[mos].grupos.length; gru++) {	
					for (var pie = 0; pie < datos.mostradores[mos].grupos[gru].piezas.length; pie++) {
						for (var g = 0; g < guardados.length;g++) {
							if (datos.mostradores[mos].grupos[gru].piezas[pie].id==guardados[g].favId) {
								document.getElementById("artFav").innerHTML += `
				                  <article class="abajoIzquierda">                  
				                      <img src="${
				                        datos.mostradores[mos].grupos[gru].piezas[pie]
				                          .imagenFondoUrl
				                      }" class="imgFoto">
				                      <button class="btnFavoritos" value="${datos.mostradores[mos].grupos[gru].piezas[pie].id}"><img id="${datos.mostradores[mos].grupos[gru].piezas[pie].id}" src="img/rojo.png"/></button>
				                  </article>
				                  <article class="abajoDerecha">
				                      <div class="txtNombre">${
				                        datos.mostradores[mos].grupos[gru].piezas[pie]
				                          .titulo
				                      }</div>
				                     
				                      <button class=" btnMostrar btnMostradores" value="${pie}">Detalle</button> 
				                  </article>
				                  <hr>
				                  <br> 
				  
				              `;
							}
						}
										
					for (let p = 0; p < btnFavoritos.length; p++) { 		    			
        				btnFavoritos[p].addEventListener("click", eliminarFav);
      				}
      				for (let e = 0; e < btnMostradores.length; e++) {
				        btnMostradores[e].addEventListener("click", VentanaDetalleMonedas);       
				     }	
					}			
				}
			}
		})
	}
	var VentanaDetalleMonedas = function() {
	  var unico = "";
	  var detalle = "";
	  var detalleGrupo = "";

	  var urls = "http://museobillete.azurewebsites.net/api/Expo/";
	  fetch(urls + indice)
	    .then(datos => datos.json())
	    .then(datos => {
	      unico = datos.mostradores[grupo].grupos[this.value].unico;      

	      if (true) {
	        detalle =
	          datos.mostradores[grupo].grupos[this.value].piezas[0].detallesUrl;            
	        localStorage.setItem("detalle", detalle);
	        PantallaDetalleMonedas = new BrowserWindow({ width: 620, height: 600 });
	        PantallaDetalleMonedas.loadURL(
	          ur.format({
	            pathname: path.join(__dirname, "MonedaDetalle.html"),
	            protocol: "file",
	            slashes: true
	          })
	        );

	      } else {
	        detalleGrupo = this.value;        
	        localStorage.setItem("detalleGrupo", detalleGrupo);
	        PantallaDetalleGrupos = new BrowserWindow({ width: 700, height: 600 });
	        PantallaDetalleGrupos.loadURL(
	          ur.format({
	            pathname: path.join(__dirname, "PantallaDetalleGrupos.html"),
	            protocol: "file",
	            slashes: true
	          })
	        );        
	      }
	    });
	}

	fetch('http://localhost/pw218309server/mostrarFavoritos.php')   
	.then(dato => dato.json())
	.then(dato => {
		if (dato.length==0) {
			document.getElementById("artFav").innerHTML += `
				<article id="favoritosVacio"><h1>No hay favoritos</h1></article>				
			`
		}

	    for (var v =0; v <3; v++) {

	    	fetch(url+localStorage.getItem("vit"))
	    	.then(datos=>datos.json())
	    	.then(datos=>{
	    		
		    	for (var i =0; i<datos.mostradores.length; i++) {

		    		for (var t = 0; t <datos.mostradores[i].grupos.length; t++) {

		    			for (var r=0; r < dato.length; r++) {
		    				
		    				if (dato[r].favId==(datos.mostradores[i].grupos[t].id)) {
		    					
		    					descrip = datos.mostradores[i].grupos[t].descripcion;
							    if (descrip == null) {
							        descrip = "Grupo de Piezas";
							        }

		    					document.getElementById("artFav").innerHTML += `
								<article class="abajoIzquierda info">
									<img src="${datos.mostradores[i].grupos[t].imagenFondoUrl}" class="imgFoto">													
									<div class="txtNombre">${datos.mostradores[i].grupos[t].titulo}</div>
					          		<div class="txtNombre">${descrip}
					          		</div>
									<button class="btnMostradores" value="${t}">Detalle</button>
									<button class="btnFavoritos favBtn" value="${datos.mostradores[i].grupos[t].id}"><img id="${datos.mostradores[i].grupos[t].id}" src="img/rojo.png"/></button> 
								</article>   

				    			`;
		    				}	
		    			}
		    			for (let p = 0; p < btnFavoritos.length; p++) { 		    			
        					btnFavoritos[p].addEventListener("click", eliminarFav);
      					}		    		
		    		}
		    	}	    	
	        })
	    	if (localStorage.getItem('vit')=='V1') {
	    		localStorage.setItem('vit','V2');
	    	}else
	    		if (localStorage.getItem('vit')=='V2') {
	    			localStorage.setItem('vit','V3');
	    		}
	    }	    	   
	    mostrarGrupos(dato);			    	
	})    
}

