// A. Estado e variáveis com referência de elementos do DOM
const nodeSectionProdutos = document.querySelector('#produtos');
const nodeSectionCesto = document.querySelector('#cesto');


// B. Funções utilitárias
function criarProduto(produto) {
    const article = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const preco = document.createElement('p');
    preco.textContent = produto.price;

    article.append(titulo,imagem,descricao,preco);
    return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const novoProduto = criarProduto(produto);
        nodeSectionProdutos.append(novoProduto);
    });
}

// D. Inicialização
renderizarProdutos(produtos);
