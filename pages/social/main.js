function volta(){
    window.location.href = `../../`;
}

async function Query_Alguem_Logado(json){
    const dados = await fetch('http://localhost:3333/check',{
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "token": localStorage.getItem("token")
        }
    });
    resposta = await dados.json();
    console.log(resposta)
    u_infos = resposta
}
Query_Alguem_Logado()

function ToNovoPost(){
    document.querySelector("#post-page").classList.toggle("ativo")
}

function NovoPost(){

}