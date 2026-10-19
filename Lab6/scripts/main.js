// declaração de variáveis
const nodeInputNumero = document.querySelector('#numero');
const nodeInputSubmit = document.querySelector('#submit');
const nodeUlColecao = document.querySelector('ul');
const nodeUlRepetidos = document.querySelector('#repetidos ul');
const formColecao = document.querySelector('form');
const totalCromos = document.querySelector('span');
const totalRepetidos = document.querySelector('#repetidos span');
const colecao = [];
const cromosRepetidos = [];

// B. event handlers
function guardaCarta() {
  let existe = false;
  if (verificaExistencia(colecao, nodeInputNumero)) {
    cromosRepetidos.push(nodeInputNumero.value);
    existe = true;
  } else {
    colecao.push(nodeInputNumero.value);
  }
  colecao.sort(function(a,b) {
    return a-b;
  });
  cromosRepetidos.sort(function(a,b) {
    return a-b;
  });
  atualizaLista(colecao, cromosRepetidos, nodeUlColecao, nodeUlRepetidos);
  if (existe) {
    totalRepetidos.textContent = cromosRepetidos.length;
  } else {
    totalCromos.textContent = colecao.length;
  }
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
      const index = cromosRepetidos.indexOf(botao);
      cromosRepetidos.splice(index, 1);
      atualizaLista(colecao, cromosRepetidos, nodeUlColecao, nodeUlRepetidos);
      totalRepetidos.textContent = cromosRepetidos.length;
    }
  })
}

function verificaExistencia(colecao, nodeInputNumero) {
  return colecao.includes(nodeInputNumero.value);
}

// C. event listeners
formColecao.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
}

