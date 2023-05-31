//Guarda Imagem
let u_infos
function volta(){
    window.location.href = `../../`;
}
async function Query_Alguem_Logado(json){
    const dados = await fetch('../../server/check_user.php',{
        method: "POST",
        body: JSON.stringify(json)
    });
    resposta = await dados.json();
    if(resposta.nome === "ERRO"){
    }else{
        u_infos = resposta
    }
}

let element = document.getElementById('file')
element.addEventListener("change", Query_Image);

let nome_arquivo
const allowedExtensions = ['jpg', 'png', 'gif'];

async function Query_Image(event) {
    const arquivo = event.target.files[0];
    const formData = new FormData();

    const fileExtension = arquivo.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        alert('Extensão de arquivo não permitida');
        return;
    }

    formData.append('arquivo', arquivo);
    formData.append('nome_arquivo', nome_arquivo);

    const dados = await fetch('../../server/guardarimagem.php', {
        method: "POST",
        body: formData
    });

    const resposta = await dados.json();
    console.log(resposta);
    if(resposta){
        let img = document.querySelector('#img_profile')
        img.setAttribute('src',`../../resources/profile_photos/${nome_arquivo}.${resposta}?cache=${Math.random() * 10}`)
    }
}
function MudarImagem(){
    document.querySelector('#troca_imagem_screen').classList.toggle('ativo') 
}
async function ConstruirProfile(){
    esperar = await Query_Alguem_Logado()
    let user_profile= document.querySelector("#screen_username")
    user_profile.innerHTML = u_infos['nome']
    nome_arquivo =  u_infos.id
    const dados = await fetch('../../server/extencao.php',{
        method: "POST",
    });
    resposta = await dados.json()
    if(resposta){
        document.getElementById('img_profile').setAttribute('src',`../../resources/profile_photos/${u_infos.id}.${resposta}?cache=${Math.random() * 10}`)
    }else{
        document.getElementById('img_profile').setAttribute('src',`../../resources/profile_photos/default.png`)
    }
}
async function enviarArquivo() {
    const arquivo = document.querySelector('input[type="file"]').files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
  
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
    
  }

ConstruirProfile()