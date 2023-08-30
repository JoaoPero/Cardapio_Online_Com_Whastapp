$(document).ready(function () {
  cardapio.eventos.init();
});

var cardapio = {};
var MEU_CARRINHO = [];

cardapio.eventos = {
  init: () => {
    cardapio.metodos.obterItensCardapio();
    // console.log("iniciou");
  },
};

cardapio.metodos = {
  //obtem a lista de itens do cardapio
  obterItensCardapio: (categoria = "burgers", vermais = false) => {
    let filtro = MENU[categoria];

    //se for vermais, ele não limpa os itens anteriores da tela
    if (!vermais) {
      $("#itensCardapio").html("");
      $("#btnVerMais").removeClass("hidden");
    }

    $.each(filtro, (i, e) => {
      // console.log("jQuery -> " + filtro[i].name);
      let temp = cardapio.templates.itensCardapio
        .replace(/\${img}/g, e.img)
        .replace(/\${preco}/g, e.price.toFixed(2).replace(".", ","))
        .replace(/\${nome}/g, e.name)
        .replace(/\${id}/g, e.id);

      // botão ver mais foi clicado (12 itens)
      if (vermais && i >= 8 && i < 12) {
        $("#itensCardapio").append(temp);
      }

      // paginação inicial (8 itens)
      if (!vermais && i < 8) {
        $("#itensCardapio").append(temp);
      }
    });

    // remove o ativo
    $(".container-menu a").removeClass("active");

    // seta o menu para ativo
    $("#" + categoria).addClass("active");
  },

  //clique no botão vermais
  verMais: () => {
    let ativo = $(".container-menu a.active").attr("id"); //burguers;

    cardapio.metodos.obterItensCardapio(ativo, true);

    $("#btnVerMais").addClass("hidden");
  },
  //diminuir a quantidade de item no cardapio
  diminuirQuantidade: (id) => {
    let qtdeAtual = parseInt($("#qtde-" + id).text());

    if (qtdeAtual > 0) {
      $("#qtde-" + id).text(qtdeAtual - 1);
    }
  },
  //aumentar a quantidade de item no cardapio
  aumentarQuantidade: (id) => {
    let qtdeAtual = parseInt($("#qtde-" + id).text());

    $("#qtde-" + id).text(qtdeAtual + 1);
  },
  //adicionar ao carrinho o item do cardápio
  adicionarAoCarrinho: (id) => {
    let qtdeAtual = parseInt($("#qtde-" + id).text());
    if (qtdeAtual > 0) {
      //obter a categoria ativa
      var categoria = $(".container-menu a.active").attr("id");

      //obter a lista de itens
      let filtro = MENU[categoria];

      //obter o item
      //"item" - é um objeto retornado do método $.grep
      let item = $.grep(filtro, (e, i) => {
        return e.id == id;
      });
      if (item.length > 0) {
        //validar se já existe esse item no carrinho
        let existe = $.grep(MEU_CARRINHO, (elem, index) => {
          return elem.id == id;
        });

        //caso já exista o item no carrinho, só altera a quantidade
        if (existe.length > 0) {
          let objIndex = MEU_CARRINHO.findIndex((obj) => obj.id == id);
          MEU_CARRINHO[objIndex].qtde = MEU_CARRINHO[objIndex].qtde + qtdeAtual;

          //caso não exista o item no carrinho, adiciona ele
        } else {
          item[0].qtde = qtdeAtual;
          MEU_CARRINHO.push(item[0]);
        }
      }
    }
    $("#qtde-" + id).text(0);
    console.log(MEU_CARRINHO);
  },
};

cardapio.templates = {
  itensCardapio: `
  <div class="col-3 mb-5">
  <div class="card card-item" id="\${id}">
    <div class="img-produto">
      <img src="\${img}" />
    </div>
    <p class="title-produto text-center mt-4">
      <b>\${nome}</b>
    </p>
    <p class="price-produto text-center">
      <b>R$\${preco}</b>
    </p>
    <div class="add-carrinho text-center">
      <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
      <span class="btn-numero-itens" id="qtde-\${id}">0</span>
      <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
      <span class="btn btn-add" onclick="cardapio.metodos.adicionarAoCarrinho('\${id}')"><i class="fas fa-shopping-bag"></i></span>
    </div>
  </div>
</div>
  `,

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
          <b>R$${preco}</b>
        </p>
        <div class="add-carrinho text-center">
          <span class="btn-menos" ><i class="fas fa-minus"></i></span>
          <span class="btn-numero-itens">0</span>
          <span class="btn-mais"><i class="fas fa-plus"></i></span>
          <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
        </div>
      </div>
    `;
  },
};
