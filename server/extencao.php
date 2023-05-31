<?php
 session_start();
 $arquivos = scandir("./../resources/profile_photos/");
 foreach($arquivos as $arquivo){
    if($arquivo != "." && $arquivo != ".."){
        $partes = explode(".",$arquivo);
        if($partes[0] === $_SESSION['user']['user_id']){
            echo json_encode($partes[1]);
            return;
        }
    }
 }
 echo "null";
return;