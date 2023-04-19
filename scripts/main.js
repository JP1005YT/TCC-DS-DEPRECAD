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
    let pagina_principal = document.querySelector('.pagina_principal')
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