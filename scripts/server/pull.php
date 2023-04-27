<?php
include_once("cn.php");
$dados = json_decode(file_get_contents('php://input'), true);
$sql = "INSERT INTO usuarios (user_name,user_nick,user_email,user_senha,user_dtnasc,user_sexo,user_endereco) 
VALUES ('".$dados['nome']."','".$dados['user']."','".$dados['email']."','".$dados['senha']."','".$dados['data']."','".$dados['sexo']."','".$dados['endereco']."')";
echo($sql);
$comando = mysqli_query($mysqli,$sql);