<?php
$arquivo = $_FILES['arquivo'];

$pasta_destino = "./../resources/profile_photos/";
$nome_arquivo = $_POST['nome_arquivo'];
$extencoes = ['jpg', 'png', 'gif'];
$extensao = pathinfo($arquivo['name'], PATHINFO_EXTENSION);
$caminho_completo = $pasta_destino . $nome_arquivo . '.' . $extensao;

foreach($extencoes as $file){
    $caminho_complete = $pasta_destino . $nome_arquivo . '.' . $file;
    if (file_exists($caminho_complete)) {
        unlink($caminho_complete);
    }
  
}

if (move_uploaded_file($arquivo['tmp_name'], $caminho_completo)) {
  echo json_encode($extensao);
} else {
  echo "EEEEEEEEE";
}