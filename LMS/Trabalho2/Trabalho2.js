/*let contatosMensagens = [
    {
        "usuario": "Herley",
        "mensagens": [
            {
                "usuario": "Herley",
                "texto": "Tudo bem ? "
                         },
            {
                "usuario": "Anderson",
                "texto": "Tudo sim e contigo ? !"
                         },
            {
                "usuario": "Herley",
                "texto": "Tudo bem também"
                         },
                    ]
               },
    {
        "usuario": "Jessica",
        "mensagens": [
            {
                "usuario": "Jessica",
                "texto": "Reunião hoje lá em casa"
                         },
            {
                "usuario": "Anderson",
                "texto": "Mesmo horário ? !"
                         },
            {
                "usuario": "Jessica",
                "texto": "Sim"
                         },
                    ]
               },
    {
        "usuario": "Lusca",
        "mensagens": [
            {
                "usuario": "Anderson",
                "texto": "Blz ? "
                         },
            {
                "usuario": "Lusca",
                "texto": "De boas e tu ? "
                         },
            {
                "usuario": "Anderson",
                "texto": "Idem"
                         },
                    ]
               }
         ];*/

let contatos = [];

for (let i = 0; i < contatosMensagens.length; i++) {
    contatos.push(contatosMensagens[i].usuario);
};
/*console.log(contatos);*/
let amigos = document.querySelector(".amigos");
amigos = amigos.getElementsByTagName("ul")[0];


function adicionarAmigos(contatos, amigos) {
    for (let i = 0; i < contatos.length; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute("class", "linkAmigo");
        let imagem = document.createElement("img");
        imagem.src = "icone-amigos.png";
        let nome = document.createTextNode(contatos[i]);

        a.appendChild(imagem);
        a.appendChild(nome);
        li.appendChild(a);
        amigos.appendChild(li);
    };

};
adicionarAmigos(contatos, amigos);


/*let listaAmigos = document.querySelector(".amigos");


function adicionarAmigos(nome) {
    let li = document.createElement('li');
    let text = document.createTextNode(nome);

    li.appendChild(text);
    listaAmigos.appendChild(li);
}
for (let i = 0; i < listaAmigos.length; i++) {
    adicionarAmigos();
}*/
