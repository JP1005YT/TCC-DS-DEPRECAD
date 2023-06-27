let variavelDebug = false
let hashtagstonewpost = []
let comparetag

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

let Hashtags
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
    Hashtags = resposta.tags
    WriteHashsinNewPost()
    RankHashTags()
}

function WriteHashsinNewPost(FilterContent) {
    let HashtagsHere
    if(FilterContent === undefined){
        HashtagsHere = { ...Hashtags }
    }else{
        HashtagsHere = { ...FilterContent}
    }
    const HereWriteHashtags = document.querySelector("#HereWriteHashtags");
    
    let Apagar = HereWriteHashtags.querySelectorAll('*:not(.ativo)');

    Apagar.forEach(elemento => {
      elemento.remove();
    });

    for (let key in HashtagsHere) {
      
      console.log(HashtagsHere[key])
      const element = HashtagsHere[key];
      const span = document.createElement("span");
      span.innerHTML = element.display;
      
      span.addEventListener("click", function() {
        comparetag = this.innerHTML;
        
        if (this.classList.value === "ativo") {
          hashtagstonewpost.forEach(function(hashtag, n) {
            if (hashtag == comparetag) {
              let indice = hashtagstonewpost.indexOf(comparetag);
              
              while (indice >= 0) {
                hashtagstonewpost.splice(indice, 1);
                indice = hashtagstonewpost.indexOf(comparetag);
              }
            }
          });
        } else {
          hashtagstonewpost.push(comparetag);
        }
        this.classList.toggle("ativo");
      });
      
      HereWriteHashtags.appendChild(span);
    }
}

document.querySelector("#filterTags").addEventListener("keyup", () => {
    let InputFilter = document.querySelector("#filterTags").value.toLowerCase();
  
    let filteredHashtags = Hashtags.filter(item =>
      item.display.toLowerCase().includes(InputFilter)
    );
  
    WriteHashsinNewPost(filteredHashtags);
});

function RankHashTags() {
    let HashtagsHere2 = { ...Hashtags };
    const RankDiv = document.querySelector("#morehashs");
    const QuantidadeExibida = 6;
    
    for (let i = 0; i < QuantidadeExibida; i++) {
      const li = document.createElement("li");
      const spanDisplay = document.createElement("span");
      const spanUses = document.createElement("span");
      let MaiorUso = 0;
      let MaiorUsoP = 0;
      
      for (let key in HashtagsHere2) {
        const Hashtag = HashtagsHere2[key];
        
        if (Hashtag.uses > MaiorUso) {
          MaiorUso = Hashtag.uses;
          MaiorUsoP = key;
        }
      }
      
      spanDisplay.innerHTML = `#${HashtagsHere2[MaiorUsoP].display}`;
      spanUses.innerHTML = `@${HashtagsHere2[MaiorUsoP].uses}`;
      li.setAttribute("id", HashtagsHere2[MaiorUsoP].display);
      
      li.addEventListener("click", function() {
        window.location.href = `http://localhost/TCC-DS/pages/social?tag=${this.id}`;
      });
      
      li.appendChild(spanDisplay);
      li.appendChild(spanUses);
      RankDiv.appendChild(li);
      delete HashtagsHere2[MaiorUsoP];
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
    let Post = {
      
    }
}

LoadTags()
Query_Alguem_Logado()
