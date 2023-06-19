let variavelDebug = false
let hashtagstonewpost = []

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
    u_infos = resposta
}

function ToNovoPost(){
    document.querySelector("#post-page").classList.toggle("ativo")
}

function ToNovaTag(){
    document.querySelector("#tag-page").classList.toggle("ativo")
}

async function LoadTags() {
    const dados = await fetch('http://localhost:3333/tags', {
        method: "POST"
    });
    const resposta = await dados.json();
    let i = 0
    resposta.tags.forEach(element => {
        i++
    });
    document.querySelector("#tagsinUsed").innerHTML = `HashTags:${i}`
    const ALLtags = resposta.tags
    WriteHashsinNewPost(resposta.tags)
    RankHashTags(ALLtags)
}

function WriteHashsinNewPost(Hashtags){
    const HereWriteHashtags = document.querySelector("#HereWriteHashtags")
    Hashtags.forEach(element =>{
        const span = document.createElement("span")
        span.innerHTML = element.display
        span.addEventListener("click",function(){
            this.classList.toggle("ativo")
        })
        HereWriteHashtags.appendChild(span)
    })
}

function RankHashTags(Tags){
    let Hashtags = Tags
    const RankDiv = document.querySelector("#morehashs")
    const QuantidadeExibida = 6
    for (let i = 0; i < QuantidadeExibida; i++) {
        const li = document.createElement("li")
        const spanDisplay = document.createElement("span")
        const spanUses = document.createElement("span")
        let MaiorUso = 0
        let MaiorUsoP = 0
        Hashtags.forEach(function(Hashtag,n){
            if(Hashtag.uses > MaiorUso){
                MaiorUso = Hashtag.uses 
                MaiorUsoP = n
            }
        })
        spanDisplay.innerHTML = `#${Hashtags[MaiorUsoP].display}`
        spanUses.innerHTML = `@${Hashtags[MaiorUsoP].uses}`
        li.setAttribute("id",Hashtags[MaiorUsoP].display)
        li.addEventListener("click",function(li){
            window.location.href = `http://localhost/TCC-DS/pages/social?tag=${this.id}`
        })
        li.appendChild(spanDisplay)
        li.appendChild(spanUses)
        RankDiv.appendChild(li)
        Hashtags.splice(MaiorUsoP, 1);
        console.log(MaiorUso)
    }
}

function NovaTag(){
    let newtag = document.querySelector("#newtag")
    let obj = {
        "tag" : newtag.value
    }
    QueryNovaTag(obj)
    newtag.value = ""
}

async function QueryNovaTag(tag){
    const dados = await fetch('http://localhost:3333/newtag',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(tag)
    });
    resposta = await dados.json()
    LoadTags()
}

function NovoPost(){
    
}

LoadTags()
Query_Alguem_Logado()
