const passaAqui = document.querySelector(".toca-aqui h2");
const textoOriginal = passaAqui.textContent;

passaAqui.addEventListener("mouseover", () => {
  passaAqui.textContent = "Estás a passar por aqui :)";
});

passaAqui.addEventListener("mouseout", () => {
  passaAqui.textContent = textoOriginal;
});

//----------------------------------------------------//

const titulo = document.querySelector(".pintaTudo h2");
const pinta = document.querySelectorAll(".pintaTudo button")

pinta.forEach(button => {
  button.onclick = () => {
    const cor = button.dataset.color;
    titulo.style.color = cor;
  }
})

//----------------------------------------------------//

const escrito = document.querySelector(".escreve input")
const cores = ["red", "green", "blue", "orange"]

escrito.addEventListener("input", () => {
  let corAtual = escrito.value.length % cores.length;
  if(escrito.value.length === 0) {
    escrito.style.backgroundColor = "";
  } else {
    escrito.style.backgroundColor = cores[corAtual];
  }
})

//----------------------------------------------------//

const escritoIngles = document.querySelector(".escreveIngles input");
const corTotal = document.querySelector(".corSeccao");
const submeter = document.querySelector(".escreveIngles button")

submeter.addEventListener("click", () => {
  if(escritoIngles.value.length === "") {
    corTotal.style.backgroundColor = 'beige';
  } else {
    corTotal.style.backgroundColor = escritoIngles.value;
  }
});

const corEscolhida = document.querySelector("#opcoesCores")

corEscolhida.addEventListener("change", function() {
  corTotal.style.backgroundColor = this.value;
})

//----------------------------------------------------//

let contador = 0;
const valorAtual = document.querySelector(".boxContador h2")
const contar = document.querySelector("#button1");
const repor = document.querySelector("#button2");

contar.addEventListener("click", () => {
  contador++;
  valorAtual.textContent = contador;
});

repor.addEventListener("dblclick", () => {
  contador = 0;
  valorAtual.textContent = contador;
});

//----------------------------------------------------//

const organizacaoEscolhida = document.querySelector("#opcoesOrganizacao")
const organizacao = document.querySelector(".bolas");

organizacaoEscolhida.addEventListener("change", function() {
  organizacao.style.flexDirection = this.value;
})






