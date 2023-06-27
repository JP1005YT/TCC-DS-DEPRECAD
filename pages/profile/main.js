//Guarda Imagem
let u_infos
function volta(){
    window.location.href = `../../`;
}
async function Query_Alguem_Logado(json){
    const dados = await fetch('http://localhost:3333/check',{
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            teste: "true",
            "token": localStorage.getItem("token")
        }
    });
    resposta = await dados.json();
    console.log(resposta)
    u_infos = resposta
}

let element = document.getElementById('file')
element.addEventListener("change", Query_Image);

let nome_arquivo
const allowedExtensions = ['jpg', 'png', 'gif'];

async function Query_Image(event) {
    const arquivo = event.target.files[0];
    const formData = new FormData();
    formData.append('image', arquivo);
    formData.append('id', u_infos.id);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3333/upimage');
    xhr.onload = function () {
        if (xhr.status === 200) {
        console.log('Arquivo enviado com sucesso!');
        } else {
        console.error('Ocorreu um erro ao enviar o arquivo.');
        }
    };
    xhr.send(formData);
}
function MudarImagem(){
    document.querySelector('#troca_imagem_screen').classList.toggle('ativo') 
}
async function Sair(){
    const dados = await fetch('http://localhost:3333/sair',{
        method: "POST",
        headers: {
            "token": localStorage.getItem("token")
        }
    });
    if(dados){
        localStorage.removeItem("token")
    }
    volta()
}
async function ConstruirProfile(){
    esperar = await Query_Alguem_Logado()
    let user_profile= document.querySelector("#screen_username")
    user_profile.innerHTML = u_infos['nome']
    // nome_arquivo =  u_infos.id
    // const dados = await fetch('../../server/extencao.php',{
    //     method: "POST",
    // });
    // resposta = await dados.json()
    // if(resposta){
    //     document.getElementById('img_profile').setAttribute('src',`../../resources/profile_photos/${u_infos.id}.${resposta}?cache=${Math.random() * 10}`)
    // }else{
    //     document.getElementById('img_profile').setAttribute('src',`../../resources/profile_photos/default.png`)
    // }
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