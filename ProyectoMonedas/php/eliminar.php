<?php  
header("Access-Control-Allow-Origin: *");
$favId=$_POST["id"];
$servidor="localhost";
$usuario ="root";
$password="";
$basedatos="favoritos";
$conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
$eliminar=mysqli_query($conexion,"delete from items where favId='$favId'");
?>