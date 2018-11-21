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

//Constantes para imprimir en PDF
const electron=require('electron');
//Sistema de archivos
const fs=require('fs');
//Sistema operativo
const os=require('os');
//Aplicar una constante para llamado interno/remoto
//IPC = llamada a un procedimiento interno
const ipc=electron.ipcMain;
//Acceso a la terminal o linea de comandos
const shell=electron.shell;



function muestraPantallaPrincipal(){
	//creamos una pantalla vacia
	PantallaPrincipal=new BrowserWindow({width:1050,height:520});
	//Cargamos en la pantalla  el contenido de nuestra pagina
	PantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'),
		protocol: 'file',
		slashes: true
	}));
	//mostramos la pantalla
	PantallaPrincipal.show();
}

//Evento para PDF(declaracion)
ipc.on('print-to-pdf',function(event) {
	const pdfPath=path.join(os.tmpdir(),'print.pdf')
	const win=BrowserWindow.fromWebContents(event.sender)
	win.webContents.printToPDF({},function(error,data){
		if (error)throw error
			fs.writeFile(pdfPath,data,function(error){
				if (error) {
					throw error
				}
				shell.openExternal('file://'+pdfPath)
			})
	})
});

app.on('ready',muestraPantallaPrincipal);


