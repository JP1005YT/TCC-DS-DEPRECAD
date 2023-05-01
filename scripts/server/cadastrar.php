<?php
session_start();
include_once("cn.php");
$dados = json_decode(file_get_contents('php://input'), true);

// Criptografia de senha

$senha_saltada = $salto . $dados['senha'];

$encrypt = password_hash($senha_saltada,PASSWORD_DEFAULT);

//Faz e Manda a Query do banco para o SERVER

$sql = "INSERT INTO usuarios (user_name,user_nick,user_email,user_senha,user_dtnasc,user_sexo,user_endereco)
VALUES ('".$dados['nome']."','".$dados['user']."','".$dados['email']."','".$encrypt."','".$dados['data']."','".$dados['sexo']."','".$dados['endereco']."')";

$comando = mysqli_query($mysqli,$sql);

// Retorna o END do processo

if($comando){
    $_SESSION['user'] = $dados['user'];
}

echo '{"nome": "'.$_SESSION['user'].'"}';
