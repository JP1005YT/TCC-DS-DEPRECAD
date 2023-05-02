<?php
session_start();
include_once("cn.php");
$dados = json_decode(file_get_contents('php://input'), true);

if(isset($_SESSION['user'])){
    echo '{
        "nome": "'.$_SESSION['user']['user_name'].'",
        "nick": "'.$_SESSION['user']['user_nick'].'",
        "email": "'.$_SESSION['user']['user_email'].'",
        "sexo": "'.$_SESSION['user']['user_sexo'].'",
        "dtnasc": "'.$_SESSION['user']['user_dtnasc'].'",
        "dtendereco": "'.$_SESSION['user']['user_endereco'].'"
    }';
}else{
    echo '{
        "nome": "ERRO"}';
};