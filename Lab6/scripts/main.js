// declaração de variáveis
const nodeInputNumero = document.querySelector('#numero');
const nodeInputSubmit = document.querySelector('#submit');
const nodeUlColecao = document.querySelector('#colecao ul');
const nodeUlRepetidos = document.querySelector('#repetidos ul');
const formColecao = document.querySelector('form');
const totalCromos = document.querySelector('#colecao span');
const totalRepetidos = document.querySelector('#repetidos span');

const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
const cromosRepetidos = JSON.parse(localStorage.getItem('cromosRepetidos')) || [];

// B. event handlers
function guardarStorage() {
  localStorage.setItem('colecao', JSON.stringify(colecao));
  localStorage.setItem('cromosRepetidos', JSON.stringify(cromosRepetidos));
}

function guardaCarta() {
  const numero = nodeInputNumero.value;
  if (verificaExistencia(colecao, numero)) {
    cromosRepetidos.push(numero);
  } else {
    colecao.push(numero);
  }
  colecao.sort((a, b) => a - b);
  cromosRepetidos.sort((a, b) => a - b);
  guardarStorage();
  atualizaLista(colecao, cromosRepetidos, nodeUlColecao, nodeUlRepetidos);
}

function atualizaLista(colecao, cromosRepetidos, nodeUlColecao, nodeUlRepetidos) {
  nodeUlColecao.textContent = "";
  nodeUlRepetidos.textContent = "";

  colecao.forEach((elemento) => {
    const li = document.createElement("li");
    li.textContent = elemento;
    nodeUlColecao.append(li);
  });

  cromosRepetidos.forEach((elemento) => {
    const li = document.createElement("li");
    li.innerHTML = `${elemento} <button data-numero="${elemento}">Eliminar</button>`;
    nodeUlRepetidos.append(li);
  });

  const eliminarReps = document.querySelectorAll('#repetidos button');
  eliminarReps.forEach((botao) => {
    botao.onclick = () => {
      const numero = Number(botao.dataset.numero);
      const index = cromosRepetidos.indexOf(numero);
      cromosRepetidos.splice(index, 1);
      guardarStorage();
      atualizaLista(colecao, cromosRepetidos, nodeUlColecao, nodeUlRepetidos);
    };
  });

  totalCromos.textContent = colecao.length;
  totalRepetidos.textContent = cromosRepetidos.length;
}

function verificaExistencia(lista, numero) {
  return lista.includes(numero);
}

// C. event listeners
formColecao.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
}

atualizaLista(colecao, cromosRepetidos, nodeUlColecao, nodeUlRepetidos);

