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
const pinta = document.querySelector(".pintaTudo input");

pinta.addEventListener("input", () => {
  titulo.style.color = pinta.value;
});

//----------------------------------------------------//

const titulo2 = document.querySelector(".boxEscreve h2")
const corEscrita = document.querySelector(".escreve input")
const submeter = document.querySelector("#submeter");

submeter.addEventListener("click", () => {
  titulo2.style.color = corEscrita.value;
})

//----------------------------------------------------//

const area = document.querySelector("#area");
const posicao = document.querySelector("#posicao");

area.addEventListener("mousemove", (event) => {
  posicao.textContent = `x: ${event.offsetX}, y: ${event.offsetY}`;
});

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






