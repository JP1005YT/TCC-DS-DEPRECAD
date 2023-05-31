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
    $sql = "SELECT * FROM usuarios WHERE user_email = '".$dados['email']."'";

    $comando = mysqli_query($mysqli,$sql);

    $linha = mysqli_fetch_assoc($comando);

    $salto_pass = $salto . $dados['senha'];

    if(password_verify($salto_pass,$linha['user_senha'])){

        $_SESSION['user'] = $linha;
        echo '{
            "id": "'.$_SESSION['user']['user_id'].'",
            "nome": "'.$_SESSION['user']['user_name'].'",
            "nick": "'.$_SESSION['user']['user_nick'].'",
            "email": "'.$_SESSION['user']['user_email'].'",
            "sexo": "'.$_SESSION['user']['user_sexo'].'",
            "dtnasc": "'.$_SESSION['user']['user_dtnasc'].'",
            "dtendereco": "'.$_SESSION['user']['user_endereco'].'"
        }';
    }
}

echo '{"nome": "'.$_SESSION['user']['user_id'].'"}';
