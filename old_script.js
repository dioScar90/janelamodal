const botaoAbrir = document.querySelector("#botao-abrir");
const modal = document.querySelector("#modal");
const botaoFechar = document.querySelector("#botao-fechar");

modal.addEventListener("click", ({ clientX: x, clientY: y }) => {
  const { top, bottom, left, right } = modal.getBoundingClientRect();
  // const backdropTop = position.top;
  // const backdropBottom = position.bottom;
  // const backdropLeft = position.left;
  // const backdropRight = position.right;
  const wasClickedOutsideModal = y > top || y < bottom || x > left || x < right

  if (y > top && y < bottom && x > left && x < right) {
    return;
  }

  modal.close();
});

botaoAbrir.addEventListener("click", () => {
  modal.showModal();
});

botaoFechar.addEventListener("click", () => {
  modal.close();
});
