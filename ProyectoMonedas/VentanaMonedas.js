var indice=localStorage.getItem("indice")
var grupo=localStorage.getItem("mostrador",this.value)



var buscaDetalleComics = function(){

	var url="http://museobillete.azurewebsites.net/api/Expo/";
	console.log(url+indice);
	fetch(url+indice)
	.then(datos=>datos.json())
	.then(datos=>{
		document.getElementById('VentanaMonedas').innerHTML='';
		grupos=datos.mostradores[grupo].grupos;
		var foto="";
		for(let i=0;i<grupos.length;i++){
			document.getElementById('VentanaMonedas').innerHTML+=`
				<article class="abajoIzquierda">
					<img src="${datos.mostradores[grupo].grupos[i].imagenFondoUrl}" class="imgFoto">
				</article>
				<article class="abajoDerecha">
					<div class="txtNombre">${datos.mostradores[grupo].grupos[i].titulo}</div>
					<div class="txtNombre">${datos.mostradores[grupo].grupos[i].descripcion}</div>
					<button class="btnMostradores" value="${i}">Mostrador</button> 
				</article>
				<hr>
				<br> 

			`

		}
		
		document.getElementById('VentanaMonedas').innerHTML = resultado

		for(let i=0;i<btnMostradores.length;i++){

				btnMostradores[i].addEventListener('click',VentanaMonedas);


		 }

	})


}


buscaDetalleComics();