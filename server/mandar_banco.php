<?php
$target_dir = "./resources/profile_photos/"; // pasta de destino para onde o arquivo será movido
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); // caminho completo para o arquivo de destino
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); // tipo de arquivo

// Verifica se o arquivo é realmente uma imagem
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    echo "O arquivo é uma imagem - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "O arquivo não é uma imagem.";
    $uploadOk = 0;
  }
}

// Verifica se o arquivo já existe na pasta de destino
if (file_exists($target_file)) {
  echo "O arquivo já existe.";
  $uploadOk = 0;
}

// Limita o tamanho do arquivo em 5 MB
if ($_FILES["fileToUpload"]["size"] > 5000000) {
  echo "O arquivo é muito grande.";
  $uploadOk = 0;
}

// Aceita apenas alguns tipos de arquivos
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Apenas arquivos JPG, JPEG, PNG e GIF são permitidos.";
  $uploadOk = 0;
}

// Se houver algum erro, exibe a mensagem correspondente
if ($uploadOk == 0) {
  echo "O arquivo não foi enviado.";
// Se tudo estiver OK, move o arquivo para a pasta de destino
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "O arquivo ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " foi enviado com sucesso.";
  } else {
    echo "Houve um erro ao enviar o arquivo.";
  }
}
?>
