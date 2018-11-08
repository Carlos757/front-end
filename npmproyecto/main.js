//cargar la applicacion de electron
const app=require('electron').app;
//Crear ventanas del sistema operativo
const BrowserWindow=require('electron').BrowserWindow;
//Ruta del sistema de archivos del sistema operativo
const path=require('path');
const url=require('url');
//otra forma de declarar una constante
//pantalla principal
//'const' es lo mismo que 'let'
let PantallaPrincipal;

function muestraPantallaPrincipal(){
	//creamos una pantalla vacia
	PantallaPrincipal=new BrowserWindow({width:380,height:420});
	//Cargamos en la pantalla  el contenido de nuestra pagina
	PantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'),
		protocol: 'file',
		slashes: true
	}));
	//mostramos la pantalla
	PantallaPrincipal.show();
}

app.on('ready',muestraPantallaPrincipal);


