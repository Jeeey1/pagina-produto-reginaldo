const parentButton = document.querySelectorAll("[data-cod]");
const radioButtons = document.querySelectorAll("[type='radio']");

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

function plusOrMinus(div){
  const dados = {};
  const inputQtd = div.querySelector('.btn-number input');
  const buttonPlus = div.querySelector('.btn-number .plus');
  const buttonMinus = div.querySelector('.btn-number .minus')

  buttonPlus.addEventListener('click', () => {
    inputQtd.value++;
    recebeDados(div, dados);
  })

  buttonMinus.addEventListener('click', () => {
    inputQtd.value--;
    recebeDados(div, dados);

    if (inputQtd.value <= 0){
      inputQtd.value = 0;
      div.classList.remove('ativo');
    }
  })
}


function recebeDados(div, dados){
  const inputQtd = div.querySelector('.btn-number input');
  const nomeProduto = div.querySelector('h1').innerText;
  const precoProduto = +div.querySelector('.preco').innerText.replace(',', '.');
  const areaProdutos = document.querySelector(".produtos-selecionados");

  const info = div.dataset.cod;
  const elementoExistente = document.querySelector(`div[data-id="${info}"]`);

  dados.nome = nomeProduto;
  dados.preco = precoProduto;
  dados.qtd = +inputQtd.value;

  let total = (dados.preco * dados.qtd).toFixed(2);

  if (!elementoExistente && div.classList.contains('ativo')){
    const novoElemento = document.createElement('div');
    areaProdutos.appendChild(novoElemento);
    novoElemento.innerText = `${dados.nome} - x${dados.qtd} pacote(s) - R$${total}`;
    novoElemento.setAttribute('data-id', `${info}`);
  } else {
    removeProduto(div, dados);
    elementoExistente.innerText = `${dados.nome} - x${dados.qtd} pacote(s) - R$${total}`;
  }
}

function removeProduto(div, dados){
  const info = div.dataset.cod;
  const elementoExistente = document.querySelector(`div[data-id="${info}"]`);
  if(elementoExistente){
    if (dados.qtd <= 0){
      elementoExistente.remove()
    }
  }
}

function ativaDadosEntrega(){
  const parentDados = document.querySelector('.entrega-open');

  radioButtons.forEach((button) => {
    buttonValue = button.value;
  
    button.addEventListener('click', (e) => {
      if (e.target.value === 'entrega'){
        parentDados.classList.add('ativo');
      } else if(parentDados.classList.contains('ativo')){
        parentDados.classList.remove('ativo');
      }
    })
  })
};
ativaDadosEntrega()



