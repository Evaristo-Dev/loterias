const form = document.querySelector('#draw-form');
const quantityInput = document.querySelector('#quantity');
const limitInput = document.querySelector('#limit');
const numbersContainer = document.querySelector('#numbers');
const message = document.querySelector('#message');
const resultCount = document.querySelector('#result-count');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const quantity = Number(quantityInput.value);
  const limit = Number(limitInput.value);

  quantityInput.setCustomValidity('');
  limitInput.setCustomValidity('');

  if (!form.reportValidity()) {
    return;
  }

  if (quantity > limit) {
    quantityInput.setCustomValidity('A quantidade de dezenas não pode ser maior que o limite do sorteio.');
    quantityInput.reportValidity();
    return;
  }

  const drawnNumbers = drawNumbers(quantity, limit);
  numbersContainer.replaceChildren(
    ...drawnNumbers.map((number, index) => {
      const tile = document.createElement('span');
      tile.className = 'number-tile';
      tile.textContent = String(number).padStart(String(limit).length, '0');
      tile.style.animationDelay = `${index * 45}ms`;
      return tile;
    }),
  );

  message.classList.remove('error');
  message.textContent = 'Sorteio concluído! Boa sorte.';
  resultCount.textContent = `${quantity} ${quantity === 1 ? 'dezena' : 'dezenas'}`;
});

function drawNumbers(quantity, limit) {
  const availableNumbers = Array.from({ length: limit }, (_, index) => index + 1);

  for (let index = 0; index < quantity; index += 1) {
    const randomIndex = index + Math.floor(Math.random() * (limit - index));
    [availableNumbers[index], availableNumbers[randomIndex]] = [
      availableNumbers[randomIndex],
      availableNumbers[index],
    ];
  }

  return availableNumbers.slice(0, quantity).sort((first, second) => first - second);
}
