let contador = 0
const numero = document.querySelector("h2")
const passa = document.querySelector(".passa")
const pinta = document.querySelector(".pinta")

function contar() {
  contador++
  numero.textContent = contador
}

passa.addEventListener("mouseover", function () {
  passa.textContent = "Boa, passaste por aqui!"
})

passa.addEventListener("mouseout", function () {
  passa.textContent = "Passa por aqui!"
})
