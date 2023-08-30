$(document).ready(function () {
  cardapio.eventos.init();
  cardapio.metodos.obterItensCardapio();
});

var cardapio = {};

cardapio.eventos = {
  init: () => {
    cardapio.metodos.obterItensCardapio();
    cardapio.metodos.obterItensCardapio2();
    // console.log("iniciou");
  },
};

cardapio.metodos = {
  //obtem a lista de itens do cardapio
  obterItensCardapio: (categoria = "pizzas") => {
    let filtro = MENU[categoria];

    $("#itensCardapio").html("");
    filtro.forEach((item) => {
      // console.log("ForEach -> " + item.name);
    });

    $.each(filtro, (i, e) => {
      // console.log("jQuery -> " + filtro[i].name);
      let temp = cardapio.templates.itensCardapio
        .replace(/\${img}/g, e.img)
        .replace(/\${nome}/g, e.name)
        .replace(/\${preco}/g, e.price.toFixed(2).replace(".", ","));

      $("#itensCardapio").append(temp);
    });

    //remove o menu ativo
    $(".container-menu a").removeClass("active");
    //seta o menu para ativo
    $("#" + categoria).addClass("active");
    console.log(categoria);
  },

  //obtem a lista de itens do cardapio
  obterItensCardapio2: function () {
    let filtro = MENU["burgers"];
    let container = document.getElementById("itensCardapio");

    filtro.forEach(function (item) {
      let div = document.createElement("div");
      div.className = "col-3 mb-5";
      div.innerHTML = cardapio.templates.itensCardapio2(item.img, item.name, item.price);

      container.appendChild(div);
    });
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
