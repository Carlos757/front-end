<?php
	header("Access-Control-Allow-Origin: *");
	$servidor="localhost";
	$usuario="root";
	$password="";
	$basedatos="favoritos";
	$conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
	$consulta="select favId from items";
	$resultado=mysqli_query($conexion,$consulta);
	$salida=array();
	if (mysqli_num_rows($resultado) > 0) {
		while ($registro=mysqli_fetch_array($resultado)) {					
					array_push($salida,$registro);
				}		
	}
	print json_encode($salida);		
?>