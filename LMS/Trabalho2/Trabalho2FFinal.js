let mensageiro = document.querySelector(".layout");

let modalLogin = document.querySelector(".modal-login");
let botaoEntrarSair = document.querySelector(".botao");

let usuario = "anderson";

function carregarMensageiro() {
    mensageiro.style.display = "block";
}

function esconderMensageiro() {
    mensageiro.style.display = "none";
}

let campoUsuario = document.querySelector(".id-usuario");

function alterarBotaoEntrarSair() {
    if (String(botaoEntrarSair.innerHTML).trim() == "Entrar") {
        botaoEntrarSair.innerHTML = "Sair";
    } else {
        botaoEntrarSair.innerHTML = "Entrar";
    }
}

function login() {
    if (campoUsuario.value == usuario) {
        localStorage.idUsuario = campoUsuario.value;
        fecharModal();
        alterarBotaoEntrarSair();
        carregarMensageiro();
        campoUsuario.value = "";

    } else {
        campoUsuario.style.border = "solid 2px red";
    }
}

let botaoEnviar = document.querySelector(".botao-enviar-dados");
botaoEnviar.addEventListener("click", function (e) {
    e.preventDefault();
    login();
});

function logout() {
    localStorage.idUsuario = "null";
    alterarBotaoEntrarSair();
    esconderMensageiro();
}

function abrirModal() {
    if (String(botaoEntrarSair.innerHTML).trim() == "Sair") {
        logout();
    }
    modalLogin.style.display = "block";
};

function fecharModal() {
    modalLogin.style.display = "none";
};

botaoEntrarSair.addEventListener("click", function () {
    abrirModal();
})

if (localStorage.idUsuario == "anderson") {
    carregarMensageiro();
    alterarBotaoEntrarSair();
    fecharModal();
    requisicao();
}


function requisicao() {
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


    let submit = document.querySelector('input[type="submit"]');
    let nomeGrupo = document.querySelector('input[name="nomeg"]');
    let idGrupo = document.querySelector('input[name="idg"]');

    submit.addEventListener("click", function (e) {
        e.preventDefault();
        let nome = nomeGrupo.value;
        let id = idGrupo.value;
        let body = {
            "nomeGrupo": nome,
            "idGrupo": id
        };

        console.dir(body);
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                enviarGrupo();
            }
        }
        xhttp.open('POST', 'http://rest.learncode.academy/api/Anderson/groups', true);
        xhttp.setRequestHeader('content-type', 'application/json');
        xhttp.send(JSON.stringify(body));
        nomeGrupo.value = "";
        idGrupo.value = "";
    });
    let ul = document.querySelector('.container .grupos ul');

    function inserirGrupos(nomeGrupo, idGrupo) {
        let li = document.createElement('li');
        let texto = document.createTextNode(nomeGrupo + idGrupo);

        li.appendChild(texto);
        ul.appendChild(li);
    }

    function enviarGrupo() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                let json = xhttp.responseText;
                let parsed_json = JSON.parse(json);
                ul.innerHTML = '';
                parsed_json.forEach(function (e) {
                    enviarGrupo(e.nomeGrupo, e.idGrupo);
                });
            }
        }
        xhttp.open('GET', 'http://rest.learncode.academy/api/Anderson/groups', true);
        xhttp.send();
    }
    enviarGrupo();

}
