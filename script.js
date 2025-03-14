const parentButton = document.querySelectorAll("[data-cod]");
const radioButton = document.querySelector("[type='radio']");

radioButton.addEventListener('click', informaRetirada);

parentButton.forEach((div) => {
  const dados = {};
  ativaAdd(div);
  plusOrMinus(div);
});

function ativaAdd(div) {
  const button = div.querySelector('[data-button="add"]');
  button.addEventListener("click", () => {
    div.classList.add("ativo");
  });
}

function plusOrMinus(div) {
  const dados = {};
  const inputQtd = div.querySelector(".btn-number input");
  const buttonPlus = div.querySelector(".btn-number .plus");
  const buttonMinus = div.querySelector(".btn-number .minus");

  buttonPlus.addEventListener("click", () => {
    inputQtd.value++;
    recebeDados(div, dados);
  });

  buttonMinus.addEventListener("click", () => {
    if (inputQtd.value < 1) {
      div.classList.remove("ativo");
      inputQtd.value++;
    }

    inputQtd.value--;
    recebeDados(div, dados)
    
  });
}

function recebeDados(div, dados) {
  const inputQtd = div.querySelector(".btn-number input");
  const nomeProduto = div.querySelector("h3").innerText;
  const precoProduto = +div.querySelector(".preco").innerText.replace(",", ".");
  const areaProdutos = document.querySelector(".produtos-selecionados");
  const button = div.querySelector('[data-button="add"]');

  const info = div.dataset.cod;
  const elementoExistente = document.querySelector(`div[data-id="${info}"]`);

  dados.nome = nomeProduto;
  dados.preco = precoProduto;
  dados.qtd = +inputQtd.value;

  let total = (dados.preco * dados.qtd).toFixed(2);

  if (!elementoExistente && div.classList.contains("ativo")) {
    const novoElemento = document.createElement("div");
    novoElemento.setAttribute("data-id", `${info}`);
    if(isNaN(Number(info))){
    novoElemento.innerText = `Porção ${dados.nome} - Pacote c/ ${dados.qtd} Kg(s) - R$${total}`;
    } else {
    novoElemento.innerText = `Espeto ${dados.nome} - x${dados.qtd} pacote(s) - R$${total}`;
    }
    areaProdutos.appendChild(novoElemento);
  } else if(elementoExistente) {
    removeProduto(div, dados);
    if(isNaN(Number(info))){
      console.log(true)
      elementoExistente.innerText = `Porção ${dados.nome} - Pacote c/ ${dados.qtd} Kg(s) - R$${total}`;
      } else {
        elementoExistente.innerText = `Espeto ${dados.nome} - x${dados.qtd} pacote(s) - R$${total}`;
      }
  }
  console.log(Number(info));
}

function removeProduto(div, dados) {
  const info = div.dataset.cod;
  const elementoExistente = document.querySelector(`div[data-id="${info}"]`);
  if (elementoExistente) {
    if (dados.qtd <= 0) {
      elementoExistente.remove();
    }
  }
}

function informaRetirada(event) {
  const infoRetirada = document.querySelector('.informa-retirada');
  if(event.target === this){
    infoRetirada.classList.add('ativo');
  }
  
}
