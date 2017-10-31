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

function novoGrupo(nomeGrupo, idGrupo) {
    let xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function () {
        if (xhttp3.readyState == 4) {
            console.log(xhttp3.status);
            console.log(xhttp3.responseText);
            console.log(xhttp3.statusText);
        }
    }
    xhttp3.open("POST", "http://rest.learncode.academy/api/Anderson/groups", true);
    xhttp3.setRequestHeader("Content-Type", "application/json");
    let grupo = {
        "nomeGrupo": nomeGrupo,
        "idGrupo": idGrupo
    };
    let body = JSON.stringify(grupo);
    xhttp3.send(body);
}
let criarGroups = document.querySelector(".botao-criar-grupo");
criarGroups.addEventListener("click", function () {

    let criar = document.querySelector(".form-submit");
    let nomeGrupoInput = document.querySelector("#nomeGrupo");
    let idGrupoInput = document.querySelector("#idGrupo");
    criar.addEventListener("click", function () {
        event.preventDefault();
        novoGrupo(nomeGrupoInput.value, idGrupoInput.value);
    });
});
