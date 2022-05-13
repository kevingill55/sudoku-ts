import React, { useState } from 'react';
import { instantiate } from './generate';

const board = instantiate();

const Board = () => {

  const [selected, setSelected] = useState<string | null>(null);
  if (!board) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className='board'>
      {
        board.map((row: number[], rowIndex: number) => (
          <div key={`row-${rowIndex}`} className='row'>
            {
              row.map((square: number, colIndex: number) => (
                <div
                  className='square'
                  id={selected === (String(rowIndex) + String(colIndex)) ? 'selected' : 'not-selected'}
                  onClick={() => setSelected(String(rowIndex) + String(colIndex))}
                  key={square}
                >
                  {square}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}; 

export default Board;
