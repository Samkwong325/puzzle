// puzzle-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const PuzzleGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [piecePositions, setPiecePositions] = useState([]);
    const [currentDraggedElement, setCurrentDraggedElement] = useState(null);

    useEffect(() => {
      // Initialize the puzzle piece positions
      const initialPositions = Array(4).fill().map((_, index) => ({
        gridColumn: (index % 2) + 1,
        gridRow: Math.floor(index / 2) + 1,
      }));
      setPiecePositions(initialPositions);
    }, []);

    const dragStartHandler = (e, index) => {
      setCurrentDraggedElement(index);
      e.dataTransfer.setData('text/plain', null);
      e.target.classList.add('dragging');
    };

    const dragOverHandler = (e) => {
      e.preventDefault();
    };

    const dropHandler = (e, index) => {
      e.preventDefault();
      const newPositions = [...piecePositions];
      [newPositions[currentDraggedElement], newPositions[index]] = [newPositions[index], newPositions[currentDraggedElement]];
      setPiecePositions(newPositions);
      e.currentTarget.classList.remove('dragging');
      e.currentTarget.classList.add('dropped');
    };

    return React.createElement(
      'div',
      { className: 'puzzle-game' },
      React.createElement('h2', null, 'Puzzle Game'),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: 'game-board' },
        piecePositions.map((piece, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `puzzle-piece`,
              style: {
                gridColumn: piece.gridColumn,
                gridRow: piece.gridRow,
              },
              onDragStart: (e) => dragStartHandler(e, index),
              onDragOver: dragOverHandler,
              onDrop: (e) => dropHandler(e, index),
              draggable: true,
            },
            React.createElement('img', { src: `${assetsUrl}/puzzle-piece.png`, alt: 'Puzzle Piece' })
          )
        )
      )
    );
  };

  return () => React.createElement(PuzzleGame, { assetsUrl: assetsUrl });
};

console.log('Puzzle Game script loaded');
