window.onload= function(){

	const {BrowserWindow}=require('electron').remote
	const app=require('electron').app
	const path=require('path')
	const url=require('url')
	let PantallaMostradores;

	var btnMostradores=document.getElementsByClassName('btnMostradores');
	
	var Mostradores = function(){
		//alert(this.value);
		var variable="";

		var urls="http://museobillete.azurewebsites.net/api/Expo";
		fetch(urls)
		.then(datos=>datos.json())
		.then(datos=>{
			variable=datos[this.value].id;
			console.log(variable);
			localStorage.setItem("indice",variable)
		})
		
		
		PantallaMostradores=new BrowserWindow({width:400,height:540});
		PantallaMostradores.loadURL(url.format({

			pathname: path.join(__dirname,'Mostradores.html'),
			protocol: 'file',
			slashes: true
		}))

		PantallaMostradores.show();
	}

	var MostrarVitrinas=function(){

		// personaje=document.getElementById('txtPersonaje').value;
		var url="http://museobillete.azurewebsites.net/api/Expo";
		fetch(url)
		.then(datos=>datos.json())
		.then(datos=>{

			var vitrina="";
			var foto=''
			document.getElementById('abajo').innerHTML='';
			for(let i=0;i<datos.length;i++){
				vitrina=datos[i].titulo;
				foto=datos[i].imagenFondoUrl;
				
				
 
			document.getElementById('abajo').innerHTML+=`
				<article class="abajoIzquierda contenido">
					<img src="${foto}" class="imgFoto">
				</article>
				<article class="abajoDerecha">
					<div class="txtNombre roboto">${vitrina}</div>
					<button class="btnMostradores roboto" value="${i}">Mostrador</button> 
				</article>
				<hr>
				<br> 

			`

			} //termina for
			for(let i=0;i<btnMostradores.length;i++){

				btnMostradores[i].addEventListener('click',Mostradores);


			 }
		})
	}


	MostrarVitrinas();


	// var btnBuscar=document.getElementById('btnBuscar');
	// btnBuscar.addEventListener('click',buscaPersonaje);




}



