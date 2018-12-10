<?php  
header("Access-Control-Allow-Origin: *");
$favId=$_POST["favId"];
$servidor="localhost";
$usuario ="root";
$password="";
$basedatos="favoritos";
print("si lo imprime");
$conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
$consultaIf=mysqli_query($conexion,"select favId from items where favId='$favId'");
if (mysqli_num_rows($consultaIf)==0) {	
	$consulta=mysqli_query($conexion,"insert into items values('$favId')");
}

?>