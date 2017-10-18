let menuSanduiche = document.querySelector(".menu-sanduiche");
let menuLateral = document.querySelector(".menu-lateral");
let itens = document.querySelector(".itens");
let acordeon = document.querySelector(".acordeon");
let menuAcordeon = document.querySelector(".menu-acordeon")

/*function abrirFechar() {
    menuSanduiche.addEventListener("click", function () {
        menuLateralclassList.toggle("ativo");

    });*/

/*function abrirMenu() {
    menuAcordeon.style.transform = "translateX(200px)"
    menuLateral.style.transform = "translateX(0px)";
};*/


function abrirMenu() {
    menuAcordeon.style.transform = "translateX(200px)"
    menuLateral.style.transform = "translateX(0px)";
};

menuSanduiche.addEventListener('click', function () {
    abrirMenu();
});

function conteudoAcordeon() {
    if (itens.style.animationName == "abrir-acordeon") {
        itens.style.animationName = "fechar-acordeon"
    } else {
        itens.style.animationName = "abrir-acordeon"
    }

}

itens.addEventListener("click", conteudoAcordeon);
