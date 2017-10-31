let listaGrupos = document.querySelector(".grupos");
listaGrupos = listaGrupos.getElementsByTagName("ul")[0];

function criarGrupo(grupo) {
    let nomeGrupo = grupo.nomeGrupo;
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute("class", "linkAmigo");
    let span = document.createElement('span');
    let imagem = document.createElement("img");
    imagem.src = "icone-amigos.png";
    let nome = document.createTextNode(nomeGrupo);

    a.appendChild(imagem);
    a.appendChild(span);
    span.appendChild(nome);
    li.appendChild(a);
    listaGrupos.appendChild(li);

    li.addEventListener("click", function () {
        verMensagens(grupo);
    });
};

let listaMensagens = document.querySelector(".lista-mensagens");

function verMensagens(grupo) {
    let nomeGrupo = grupo.nomeGrupo;
    let id = grupo.idGrupo;

    listaMensagens.innerHTML = "";

    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (xhttp2.readyState == 4) {
            let obj_parsed = JSON.parse(xhttp2.responseText);
            for (let i = 0; i < obj_parsed.length; i++) {
                let msg = obj_parsed[i].message;
                let usuario = obj_parsed[i].usuario;
                console.log(msg);
                console.log(usuario);

                let mensagem = document.createElement("div");
                let tituloMensagem = document.createElement("span");
                let conteudo = document.createElement("span");
                let textoMensagem = document.createTextNode(msg);
                let textoUsuario = document.createTextNode(usuario);

                conteudo.appendChild(textoMensagem);
                tituloMensagem.appendChild(textoUsuario);
                console.log(conteudo)
                tituloMensagem.classList.add("titulo-mensagem");
                mensagem.appendChild(tituloMensagem);
                conteudo.classList.add("conteudo");
                mensagem.appendChild(conteudo);
                mensagem.classList.add("mensagem");
                listaMensagens.appendChild(mensagem);
            }
        }
    }
    xhttp2.open('GET', 'http://rest.learncode.academy/api/Anderson/' + id, true);
    xhttp2.send();
};


let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    /*console.log(xhttp.readyState);*/
    if (xhttp.readyState == 4) {
        let obj_parsed = JSON.parse(xhttp.responseText);
        for (let i = 0; i < obj_parsed.length; i++) {
            criarGrupo(obj_parsed[i]);
            console.log(obj_parsed);
        }
    }
}
xhttp.open('GET', 'http://rest.learncode.academy/api/Anderson/groups', true);
xhttp.send();
