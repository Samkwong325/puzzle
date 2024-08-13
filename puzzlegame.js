document.addEventListener('DOMContentLoaded', () => {
  const puzzlePieces = document.querySelectorAll('.puzzle-piece');
  let currentDraggedElement;

  puzzlePieces.forEach((piece, index) => {
    piece.style.gridColumn = (index % 3) + 1;
    piece.style.gridRow = Math.floor(index / 3) + 1;

    piece.addEventListener('dragstart', dragStartHandler);
    piece.addEventListener('dragover', dragOverHandler);
    piece.addEventListener('drop', dropHandler);
  });

  function dragStartHandler(e) {
    currentDraggedElement = e.target;
    e.dataTransfer.setData('text/plain', null);
    e.target.classList.add('dragging');
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e) {
    e.preventDefault();
    const container = document.querySelector('.puzzle-container');
    container.insertBefore(currentDraggedElement, e.target);
    currentDraggedElement.classList.remove('dragging');
    currentDraggedElement.classList.add('dropped');
  }
});
