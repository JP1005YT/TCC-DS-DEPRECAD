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
    switch (e) {
        case "src":
            
            break;
    
        default:
            break;
    }
}
function troca_main_screen(local){
    let body = document.querySelector('.any')
    let pagina_principal = document.querySelector('.home_screen')
    let pagina_login = document.querySelector('.login_screen')
    let pagina_perfil = document.querySelector('.profile_screen')
    body.classList.toggle('login')
    pagina_principal.style.display = 'none'
    pagina_login.classList.value = 'login_screen'
    pagina_perfil.classList.value = 'profile_screen'
    switch (local) {
        case 1:
            if(u_infos){
                pagina_perfil.classList.toggle('ativo')
            }else{
                pagina_login.classList.toggle('ativo')
            }
            break;
        default:
            pagina_principal.style.display = 'flex'
            break;
    }
}
let loginoucadastro = 0
function troca_cor_log(){
    let kapa = document.getElementById('display').querySelectorAll('h2')
    let sign_s = document.getElementById('sign')
    let login_s = document.getElementById('login')
    sign_s.classList.toggle('ativo')
    login_s.classList.toggle('ativo')
    kapa[0].classList.toggle('ativo')
    kapa[1].classList.toggle('ativo')
}
function Checa_Senha(key){
    let senha_s = document.getElementById('senha_s')
    let senhac_s = document.getElementById('senhac_s')
    switch (key) {
        case 0:
            if(senha_s.value.length < 8){
                senha_s.value = ""
                senha_s.focus()
                alert('Atenção sua senha deve conter mais que 8 caracteres')
            }
        break;
        case 1:
            if(senha_s.value != senhac_s.value){
                senhac_s.focus()
                senhac_s.value = ""
                alert('Senha Não Batem')
            }
        break;
    }
    
}
async function ConstruirProfile(){
    let user_profile= document.querySelector("#screen_username")
    user_profile.innerHTML = u_infos['nome']
    nome_arquivo =  u_infos.id
    const dados = await fetch('./scripts/server/extencao.php',{
        method: "POST",
    });
    resposta = await dados.json()
    if(resposta){
        document.getElementById('img_profile').setAttribute('src',`./resources/profile_photos/${u_infos.id}.${resposta}?cache=${Math.random() * 10}`)
    }else{
        document.getElementById('img_profile').setAttribute('src',`./resources/profile_photos/default.png`)
    }
}
function MudarImagem(){
    document.querySelector('#troca_imagem_screen').classList.toggle('ativo') 
}
// Funções de Back-End
// Ex: Processamento de dados e encaminhamento para o banco

function Processar_Cadastro(){
    let nome_s = document.getElementById('nome_s').value
    let user_s = document.getElementById('user_s').value
    let email_s = document.getElementById('email_s').value
    let senha_s = document.getElementById('senha_s').value
    let senhac_s = document.getElementById('senhac_s').value
    let date_s = document.getElementById('date_s').value
    let sexo_s = document.querySelectorAll('input[type="radio"][name="opc"]')
    let endereco_s = document.getElementById('cep').value
    let sexo_val = ""
    sexo_s.forEach(radio => {
        if (radio.checked) {
            sexo_val = radio.value;
        }
    });
    if(nome_s && user_s && email_s && senha_s && senhac_s && date_s && sexo_val && endereco_s) {
        let JSON = {
            "nome" : nome_s,
            "user" : user_s,
            "email" : email_s,
            "senha" : senha_s,
            "data" : date_s,
            "sexo" : sexo_val,
            "endereco" : endereco_s
        }
        Query_Cadastrar(JSON);

        document.querySelectorAll("input").forEach(element => {
            element.value = ""
        })

        troca_main_screen()
      } else {  
        alert('Preencha TODOS os campos')
      }
      
}
function Processar_Login(){
    let email_l = document.getElementById('email_l').value
    let senha_l = document.getElementById('senha_l').value
    if(email_l && senha_l){
        let JSON = {
            "email" : email_l,
            "senha" : senha_l
        }
        Query_Logar(JSON)
    }
    document.getElementById('email_l').value = ""
    document.getElementById('senha_l').value = ""
}
async function Query_Cadastrar(json){
    const dados = await fetch('./scripts/server/sign.php',{
        method: "POST",
        body: JSON.stringify(json)
    });
    resposta = await dados.json();
    if(resposta.nome){
        u_name = resposta.nome
    }
    // arummar
}
async function Query_Logar(json){
    const dados = await fetch('./scripts/server/login.php',{
        method: "POST",
        body: JSON.stringify(json)
    });
    resposta = await dados.json();
    if(resposta.nome === "ERRO"){
        alert('Senha ou Email Incorretos')

    }else{
        u_infos = resposta
        alert(`Bem-Vindo:${resposta.nome}`)
        troca_main_screen()
    }
}
async function Query_Alguem_Logado(json){
    const dados = await fetch('./scripts/server/check_user.php',{
        method: "POST",
        body: JSON.stringify(json)
    });
    resposta = await dados.json();
    if(resposta.nome === "ERRO"){
    }else{
        u_infos = resposta
        alert(`Bem-Vindo:${resposta.nome}`)
        ConstruirProfile()
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
async function Sair(){
    const dados = await fetch('./scripts/server/sair.php',{
        method: "POST",
    });
}
//Funções da API de CEP
function limpa_formulário_cep(){
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

//Guarda Imagem
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

    const dados = await fetch('./scripts/server/guardarimagem.php', {
        method: "POST",
        body: formData
    });

    const resposta = await dados.json();
    console.log(resposta);
    if(resposta){
        let img = document.querySelector('#img_profile')
        img.setAttribute('src',`./resources/profile_photos/${nome_arquivo}.${resposta}?cache=${Math.random() * 10}`)
    }
}