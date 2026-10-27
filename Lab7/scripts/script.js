// A. Estado e variáveis com referência de elementos do DOM
const nodeSectionProdutos = document.querySelector('#produtos');
const nodeSectionCesto = document.querySelector('#cesto');

const produtosSelecionados = JSON.parse(localStorage.getItem('produtosSelecionados')) || [];

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

    article.append(titulo,imagem,preco,descricao, button);
    return article;
}

function atualizaCesto() {
    nodeSectionCesto.textContent = '';
    produtosSelecionados.forEach((produto) => {
        const artigoCesto = criaProdutoCesto(produto);
        nodeSectionCesto.append(artigoCesto);
    })
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

// C. Event handlers
function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const novoProduto = criarProduto(produto);
        nodeSectionProdutos.append(novoProduto);
    });
}

function guardarProduto() {
  localStorage.setItem('produtosSelecionados', JSON.stringify(produtosSelecionados));
  atualizaCesto();
}

// D. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
