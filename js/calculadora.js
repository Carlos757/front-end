window.onload function () {
	var colorAmarillo = function(x){
		x.style.background = "yellow";
	}

	var colorBlanco = function(x){
		x.style.background = "white";
	}
	var	numeros function(){
		var	operando1 document.getElementById('operando1');
		var	operando2 document.getElementById('operando2');
		if(operando1 == ""){
			if(operando1 == "0"){
			document.getElementById("operando1").value="";
		}
		document.getElementById("operando1").value+=this.value;
		}else{
			if(operando2 == ""){

				if(operando2 == "0"){
					document.getElementById("operando2").value="";
				
				}
				document.getElementById("operando2").value+=this.value;
			}
		}
	}
	
	var operadores = function(){
		operador = this.value
	}

	var resultadoIgual = function(){
		oper1 = document.getElementById('operando1').value
		oper2 = document.getElementById('operando2').value
		document.getElementById('resultado').value=eval(oper1+operador+oper2)
		
		// switch(){

		// }
	}
	var reinicio = function(){
		document.getElementById('operando1').value="0"
		document.getElementById('operando2').value="0"
		document.getElementById('resultado').value="0"
		operador = ""
	}

	var operando1 = document.getElementById("operando1")
	var operando1 = document.getElementById("operando2")
	var operando1 = document.getElementById("resultado")
	var uno = document.getElementById("uno")
	var dos = document.getElementById("dos")
	var tres = document.getElementById("tres")
	var cuatro = document.getElementById("cuatro")
	var cinco = document.getElementById("cinco")
	var seis = document.getElementById("seis")
	var siete = document.getElementById("siete")
	var ocho = document.getElementById("ocho")
	var nueve = document.getElementById("nueve")
	var cero = document.getElementById("cero")
	var suma = document.getElementById("suma")
	var resta = document.getElementById("resta")
	var multiplicacion = document.getElementById("multiplicacion")
	var division = document.getElementById("division")
	var igual = document.getElementById("igual")
	var reiniciar = document.getElementById("reiniciar")

	operando1.addEventListener('focus', colorAmarillo)
	operando1.addEventListener('focus', colorBlanco)
	operando2.addEventListener('focus', colorAmarillo)
	operando2.addEventListener('focus', colorBlanco)
	resultado.addEventListener('focus', colorAmarillo)
	resultado.addEventListener('focus', colorBlanco)
	reiniciar.addEventListener('focus',reinicio)

	cero.addEventListener('click',numeros)
	uno.addEventListener('click',numeros)
	dos.addEventListener('click',numeros)
	tres.addEventListener('click',numeros)
	cuatro.addEventListener('click',numeros)
	cinco.addEventListener('click',numeros)
	seis.addEventListener('click',numeros)
	siete.addEventListener('click',numeros)
	ocho.addEventListener('click',numeros)
	nueve.addEventListener('click',numeros)

	suma.addEventListener('click',operadores)
	resta.addEventListener('click',operadores)
	multiplicacion.addEventListener('click',operadores)
	division.addEventListener('click',operadores)

	igual.addEventListener('click',resultadoIgual)

}


