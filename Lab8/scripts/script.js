// A. Estado e variáveis com referência de elementos do DOM
const nodeSectionProdutos = document.querySelector('#produtos');
const nodeSectionCesto = document.querySelector('#cesto');

const dataStorage = [];

const buttonFiltragem = document.querySelector("#filtragem");
const buttonOrdenacao = document.querySelector("#ordenacao");
const pesquisaTexto = document.querySelector("input");

const nodeFooter = document.querySelector('footer');
const textoFooter = document.createElement('p');
textoFooter.textContent = 'DIW - 2026';
nodeFooter.append(textoFooter);

const nodeContador = document.createElement('p');
const produtosSelecionados = JSON.parse(localStorage.getItem('produtosSelecionados')) || [];

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

function atualizaCesto() {
    nodeSectionCesto.textContent = '';
    produtosSelecionados.forEach((produto) => {
        const artigoCesto = criaProdutoCesto(produto);
        nodeSectionCesto.append(artigoCesto);
    })

    const precoTotal = produtosSelecionados.reduce((soma, produto) => soma + Number(produto.price), 0);
    nodeContador.textContent = 'Custo Total: ' + precoTotal + '€';
    nodeSectionCesto.append(nodeContador);
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

// C. Event handlers
function renderizarProdutos(produtos) {
    nodeSectionProdutos.innerHTML = "";
    produtos.forEach(produto => {
        const novoProduto = criarProduto(produto);
        nodeSectionProdutos.append(novoProduto);
    });
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
