// declaração de variáveis
const nodeSectionProdutos = document.querySelector('#produtos');
const nodeSectionCesto = document.querySelector('#cesto');


// B. Funções utilitárias
function criarProduto(produto) {
    const article = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const descricao = document.createElement('p');
    const preco = document.createElement('p');

    article.append(titulo,imagem,descricao,preco);
    return article;
}

// B. Event handlers
function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const novoProduto = criarProduto(produto);
        nodeSectionProdutos.append(novoProduto);
    });
}

// D. Inicialização
renderizarProdutos(produtos);
