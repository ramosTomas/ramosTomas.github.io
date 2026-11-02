// A. Estado e variáveis com referência de elementos do DOM
const nodeSectionProdutos = document.querySelector('#produtos');
const nodeSectionCesto = document.querySelector('#cesto');
const nodeSectionInfo = document.querySelector('.info');

const dataStorage = [];

const buttonFiltragem = document.querySelector("#filtragem");
const buttonOrdenacao = document.querySelector("#ordenacao");
const pesquisaTexto = document.querySelector("#input");

const nodeFooter = document.querySelector('footer');
const textoFooter = document.createElement('p');
textoFooter.textContent = 'DIW - 2026';
nodeFooter.append(textoFooter);

const nodeContador = document.querySelector('#precoPorPagar');
const produtosSelecionados = JSON.parse(localStorage.getItem('produtosSelecionados')) || [];

const buttonComprar = document.querySelector(".comprar");
const checkBox = document.querySelector("#check");

// Fetch
fetch("https://deisishop.pw.deisi.ulusofona.pt/products")
    .then(response => response.json())
    .then(data => {
        dataStorage.push(...data);
        renderizarProdutos(data);
    })

// B. Funções utilitárias
function criarProduto(produto) {
    const article = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;

    const preco = document.createElement('p');
    preco.textContent = 'Custo Total: ' + produto.price + '€';

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const button = document.createElement('button');
    button.textContent = '+ Adicionar ao cesto';
    button.addEventListener("click", () => {
        produtosSelecionados.push(produto);
        guardarProduto();
    });

    article.append(titulo, imagem, preco, descricao, button);
    return article;
}

function criarDesconto(precoAPagar) {
    const infoJunta = document.createElement('div');

    const textoCompleto = document.createElement('p');
    textoCompleto.textContent = "Valor final a pagar (com eventuais descontos):";

    const textoReferencia = document.createElement('p');
    textoReferencia.textContent = "Referencia de pagamento:"

    const totalCost = document.createElement('span');
    totalCost.textContent = precoAPagar.totalCost;

    const reference = document.createElement('span');
    reference.textContent = precoAPagar.reference;

    textoCompleto.append(totalCost);
    textoReferencia.append(reference);

    infoJunta.append(textoCompleto);
    infoJunta.append(textoReferencia);

    return infoJunta;
}

function atualizaCesto() {
    nodeSectionCesto.textContent = '';
    produtosSelecionados.forEach((produto) => {
        const artigoCesto = criaProdutoCesto(produto);
        nodeSectionCesto.append(artigoCesto);
    })
    atualizacaoPreco();
}

function criaProdutoCesto(produto) {
    const article = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;

    const preco = document.createElement('p');
    preco.textContent = 'Custo Total: ' + produto.price + '€';

    const button = document.createElement('button');
    button.textContent = '- Remover do cesto';
    button.addEventListener("click", () => {
        const posicaoProduto = produtosSelecionados.findIndex(p => p.id === produto.id);
        produtosSelecionados.splice(posicaoProduto, 1);
        guardarProduto();
    })

    article.append(titulo, imagem, preco, button);
    return article;
}

function atualizacaoPreco() {
    const precoTotal = produtosSelecionados.reduce((soma, produto) => soma + Number(produto.price), 0);
    nodeContador.textContent = precoTotal + '€';
}

buttonFiltragem.addEventListener("change", () => {
    const sortType = buttonFiltragem.value;
    if (sortType !== "Todas") {
        renderizarProdutosSorted(dataStorage, sortType);
    } else {
        renderizarProdutos(dataStorage);
    }
})

buttonOrdenacao.addEventListener("change", () => {
    const sortType = buttonOrdenacao.value;
    const copiaDataStorage = [...dataStorage]; //Para não me esquecer: O sort desfaz a ordem da data, por isso faço uma copia que serve só para o sort.
    if (sortType !== "preco") {
        renderizarProdutosPreco(copiaDataStorage, sortType);
    } else {
        renderizarProdutos(copiaDataStorage);
    }
})

pesquisaTexto.addEventListener("input", () => {
    const textoEscrito = pesquisaTexto.value;
    renderizarProdutosTexto(dataStorage, textoEscrito.toLowerCase());
})

buttonComprar.addEventListener("click", () => {
    nodeSectionInfo.textContent = "";
    const produtosID = produtosSelecionados.map(produtos => produtos.id);
    fetch("https://deisishop.pw.deisi.ulusofona.pt/buy", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            products: produtosID,
            student: checkBox.checked,
            coupon: "",
            name: ""
        })
    })
    .then(responde => responde.json())
    .then(data => {
        renderizarPreco(data);
    })
})

// C. Event handlers
function renderizarProdutos(produtos) {
    nodeSectionProdutos.innerHTML = "";
    produtos.forEach(produto => {
        const novoProduto = criarProduto(produto);
        nodeSectionProdutos.append(novoProduto);
    });
}

function renderizarPreco(precoAPagar) {
    const infoAtualizada = criarDesconto(precoAPagar);
    nodeSectionInfo.append(infoAtualizada);
}

function renderizarProdutosSorted(produtos, filtro) {
    const produtosSorted = produtos.filter(produto => produto.category.includes(filtro));
    renderizarProdutos(produtosSorted);
}

function renderizarProdutosPreco(produtos, ordenacao) {
    const produtosPreco = produtos.sort((a,b) => {
        if(ordenacao === "precoAsc") {
            return b.price - a.price;
        } else {
            return a.price - b.price;
        }
    });
    renderizarProdutos(produtosPreco);
};

function renderizarProdutosTexto(produtos, texto) {
    const produtosTexto = produtos.filter(produto => produto.title.toLowerCase().includes(texto));
    renderizarProdutos(produtosTexto);
}

function guardarProduto() {
    localStorage.setItem('produtosSelecionados', JSON.stringify(produtosSelecionados));
    atualizaCesto();
}

// D. Inicialização
atualizaCesto();
