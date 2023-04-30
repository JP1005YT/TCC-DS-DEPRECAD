<?php
session_start();
include_once("cn.php");
$dados = json_decode(file_get_contents('php://input'), true);
$sql = "SELECT * FROM usuarios WHERE user_email = '".$dados['email']."' AND user_senha = '".$dados['senha']."'";

$comando = mysqli_query($mysqli,$sql);

$linha = mysqli_fetch_assoc($comando);

if($comando){
    $_SESSION['user_nick'] = $linha['user_nick'];
}
echo '{"nome": "'.$_SESSION['user_nick'].'"}';