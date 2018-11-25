var indice=localStorage.getItem("indice")
	

	const {BrowserWindow}=require('electron').remote
	const app=require('electron').app
	const path=require('path')
	const url=require('url')
	let PantallaMonedas;

	var btnMostradores=document.getElementsByClassName('btnMostrar');


	var VentanaMonedas = function(){

		
		localStorage.setItem("mostrador",this.value)

		PantallaMonedas=new BrowserWindow({width:700,height:600});
		PantallaMonedas.loadURL(url.format({

			pathname: path.join(__dirname,'VentanaMonedas.html'),
			protocol: 'file',
			slashes: true
		}))

		PantallaMonedas.show();



	}




var buscaDetalleComics = function(){

	var url="http://museobillete.azurewebsites.net/api/Expo/";
	console.log(url+indice);
	fetch(url+indice)
	.then(datos=>datos.json())
	.then(datos=>{

		mostradores=datos.mostradores;
		var resultado="";
		for(let i=0;i<mostradores.length;i++){
			resultado += `
				<br>
				Mostrador ${i+1}
				<span class="linea"> ------------------------------ </span>
				<button class="btnMostrar btnMostradores" value="${i}">Mostrar</button> 
				<br><br>
				<hr>

			`

		}
		resultado +="</ol>"
		document.getElementById('Mostradores').innerHTML = resultado

		for(let i=0;i<btnMostradores.length;i++){

				btnMostradores[i].addEventListener('click',VentanaMonedas);


		 }

	})


}


buscaDetalleComics();