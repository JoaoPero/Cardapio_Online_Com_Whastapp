$(document).ready(function () {
  cardapio.eventos.init();
});

var cardapio = {};

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
        .replace(/\${nome}/g, e.name);

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
};

cardapio.templates = {
  itensCardapio: `
  <div class="col-3 mb-5">
  <div class="card card-item">
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
      <span class="btn-menos"><i class="fas fa-minus"></i></span>
      <span class="btn-numero-itens">0</span>
      <span class="btn-mais"><i class="fas fa-plus"></i></span>
      <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
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
          <span class="btn-menos"><i class="fas fa-minus"></i></span>
          <span class="btn-numero-itens">0</span>
          <span class="btn-mais"><i class="fas fa-plus"></i></span>
          <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
        </div>
      </div>
    `;
  },
};
