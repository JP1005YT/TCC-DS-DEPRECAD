// Variaveis Globais
let u_infos

// Funções de Front-End
// ex:Troca de cores e paginas e objetos
function l(e){
    console.log(e)
}
function troca_menu(){
    let menu = document.querySelector('#menu')
    let leftside = document.querySelector('.leftside')
    menu.classList.toggle('ativo')
    leftside.classList.toggle('ativo')
}
function Troca_Pagina(e){
    if(u_infos && e == "acess"){
        window.location.href = `pages/profile/`
    }else{
        window.location.href = `pages/${e}/`
    }
}
// Funções de Back-End
// Ex: Processamento de dados e encaminhamento para o banco

async function Query_Alguem_Logado(json){
    const dados = await fetch('./server/check_user.php',{
        method: "POST",
        body: JSON.stringify(json)
    });
    resposta = await dados.json();
    if(resposta.nome === "ERRO"){
    }else{
        u_infos = resposta
        alert(`Bem-Vindo:${resposta.nome}`)
    }
}
async function Sair(){
    const dados = await fetch('./server/sair.php',{
        method: "POST",
    });
}