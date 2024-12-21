'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const size = 5; // смена размера поля
    const board = Array.from({ length: size }, () => new Array(size).fill(''));
  
    const table = document.querySelector('#noughts-and-crosses');
    const movingInfo = document.querySelector('#moving-info');
  
    let movingNumber = 0;
    let players = generatePlayerNames(4);


    createGamingBoard();
    
    function generatePlayerNames(numPlayers) {
      const maxPlayers = 2;
      const playerNames = ['X', 'O', '🐻', '🐥'];
      return playerNames.slice(0, Math.min(numPlayers, maxPlayers));
    }
  
    function updateMovingInfo() {
      const currentPlayer = players[movingNumber % players.length];
      movingInfo.textContent = `Ход номер ${movingNumber + 1}. Сейчас ходит ${currentPlayer}.`;
    }
  
    function createGamingBoard() {
      board.forEach((row, rowIndex) => {
        const tableRow = table.insertRow();
        row.forEach((_, colIndex) => {
          const cell = tableRow.insertCell();
          cell.addEventListener('click', () => movingTheHand(rowIndex, colIndex));
        });
      });
    }
   
  
    function movingTheHand(row, col) {
      if (board[row][col] === '') {
        const currentPlayer = players[movingNumber % players.length];
  
        board[row][col] = currentPlayer;
        renderBoard();
        updateMovingInfo(currentPlayer);
  
        if (checkWinner(currentPlayer, row, col)) {
          movingInfo.textContent = `На ходу ${movingNumber + 1} победил ${currentPlayer}.`;
          document.querySelector('.stop').style.pointerEvents = 'none';
        } else if (board.flat().every((cell) => cell !== '')) {
          movingInfo.textContent = `На ходу ${movingNumber + 1} ничья.`;
          document.querySelector('.stop').style.pointerEvents = 'none';
        }
  
        movingNumber++;
      }
    }
  
    function renderBoard() {
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          table.rows[rowIndex].cells[colIndex].textContent = cell;
        });
      });
    }
  
    function checkWinner(player, row, col) {
      const rowCount = board.length;
      const colCount = board[0].length;
      const M = 3; 
  
      function isSamePlayer(r, c) {
        return board[r][c] === player;
      }
  
      function checkDirection(dx, dy) {
        let count = 1;
        let r, c;
  
        r = row + dx;
        c = col + dy;
        while (r >= 0 && r < rowCount && c >= 0 && c < colCount && isSamePlayer(r, c)) {
          count++;
          r += dx;
          c += dy;
        }
  
        r = row - dx;
        c = col - dy;
        while (r >= 0 && r < rowCount && c >= 0 && c < colCount && isSamePlayer(r, c)) {
          count++;
          r -= dx;
          c -= dy;
        }
  
        return count >= M;
      }

      if (checkDirection(1, 0)) {
        return true;
      }

      if (checkDirection(0, 1)) {
        return true;
      }
  
      if (checkDirection(1, 1)) {
        return true;
      }

      if (checkDirection(1, -1)) {
        return true;
      }
  
      return false;
    }
  });