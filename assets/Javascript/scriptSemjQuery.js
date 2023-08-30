$(document).ready(function () {
  cardapio.eventos.init();
});

var cardapio = {};

cardapio.eventos = {
  init: () => {
    cardapio.metodos.obterItensCardapio2();
    // console.log("iniciou");
  },
};

cardapio.metodos = {
  obterItensCardapio2: function () {
    let menuTipos = document.querySelectorAll(".menuTipos");
    let container = document.getElementById("itensCardapio");
    let categoria = "burgers";
    let filtro = MENU[categoria];

    //chama a função que renderiza os itens com a categoria padrão
    renderItens(filtro);

    //ouvinte para categorias clicadas
    menuTipos.forEach((item) => {
      item.addEventListener("click", (event) => {
        let itemClicado = event.currentTarget.getAttribute("id");
        categoria = itemClicado;
        console.log(categoria);

        //remove a classe "active" de todos os itens
        menuTipos.forEach((menuItem) => {
          menuItem.classList.remove("active");
        });

        container.innerHTML = ""; //limpa os dados anteriores antes de renderizar
        item.classList.add("active"); //adiciona a classe "active" ao item clicado
        filtro = MENU[categoria];

        renderItens(filtro);
      });
    });

    //função para renderizar os itens na tela
    function renderItens(filtro) {
      filtro.forEach(function (item) {
        let div = document.createElement("div");
        div.className = "col-3 mb-5";
        div.innerHTML = cardapio.templates.itensCardapio2(item.img, item.name, item.price);

        container.appendChild(div);
      });
    }
  },
};

cardapio.templates = {
  itensCardapio2: function (img, nome, preco) {
    return `
      <div class="card card-item">
        <div class="img-produto">
          <img src="${img}" />
        </div>
        <p class="title-produto text-center mt-4">
          <b>${nome}</b>
        </p>
        <p class="price-produto text-center">
          <b>R$${preco.toFixed(2).replace(".", ",")}</b>
        </p>
        <div class="add-carrinho text-center">
          <span class="btn-menos"><i class="fas fa-minus"></i></span>
          <span class="btn-numero-itens">0</span>
          <span class="btn-mais"><i class="fas fa-plus"></i></span>
          <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
        </div>
      </div>
    `;
  },
};
