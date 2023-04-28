// Variaveis Globais
let u_name,u_img

// Funções de Front-End 
// ex:Troca de cores e paginas e objetos

function l(a){
    console.log(`${a}`)
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
function troca_main_screen(){
    let pagina_principal = document.querySelector('.home_screen')
    let body = document.querySelector('.any')
    let menu_box = document.querySelector('.login_screen')
    console.log(pagina_principal)
    body.classList.toggle('login')
    menu_box.classList.toggle('ativo')
    if(pagina_principal.style.display == 'none'){
        pagina_principal.style.display = 'flex'
    }else{
        pagina_principal.style.display =  'none'
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
    let endereco_s = document.getElementById('endereco_s').value
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
        Pull(JSON,"Cadastrar");
        nome_s = user_s = email_s = senha_s = sexo_val = senhac_s = date_s = endereco_s = ''
        troca_main_screen()
      } else {  
        alert('Preencha TODOS os campos')
      }
      
}
async function Pull(json,opc){
    const dados = await fetch('./scripts/server/pull.php',{
        method: "POST",
        body: JSON.stringify(json)
    });
    resposta = await dados.json();
    if(resposta.nome){
        u_name = resposta.nome
    }
}