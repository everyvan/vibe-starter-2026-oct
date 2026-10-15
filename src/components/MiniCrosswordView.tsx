import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, RotateCcw, HelpCircle, Trophy } from 'lucide-react';
import { MINI_CROSSWORD_DATA } from '../data/newsData';

interface MiniCrosswordViewProps {
  onBack: () => void;
}

export const MiniCrosswordView: React.FC<MiniCrosswordViewProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array(5).fill('').map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 0]);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [checkedCells, setCheckedCells] = useState<boolean[][]>(() =>
    Array(5).fill(false).map(() => Array(5).fill(false))
  );

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Check completion
  useEffect(() => {
    let allCorrect = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (grid[r][c].toUpperCase() !== MINI_CROSSWORD_DATA.grid[r][c]) {
          allCorrect = false;
          break;
        }
      }
    }
    if (allCorrect && !isCompleted) {
      setIsCompleted(true);
    }
  }, [grid, isCompleted]);

  const handleCellClick = (r: number, c: number) => {
    if (selectedCell[0] === r && selectedCell[1] === c) {
      setDirection(direction === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell([r, c]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, r: number, c: number) => {
    if (e.key === 'Backspace') {
      const newGrid = [...grid.map((row) => [...row])];
      newGrid[r][c] = '';
      setGrid(newGrid);

      // Move back
      if (direction === 'across' && c > 0) {
        setSelectedCell([r, c - 1]);
      } else if (direction === 'down' && r > 0) {
        setSelectedCell([r - 1, c]);
      }
    } else if (e.key === 'ArrowRight' && c < 4) {
      setSelectedCell([r, c + 1]);
    } else if (e.key === 'ArrowLeft' && c > 0) {
      setSelectedCell([r, c - 1]);
    } else if (e.key === 'ArrowDown' && r < 4) {
      setSelectedCell([r + 1, c]);
    } else if (e.key === 'ArrowUp' && r > 0) {
      setSelectedCell([r - 1, c]);
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      const newGrid = [...grid.map((row) => [...row])];
      newGrid[r][c] = e.key.toUpperCase();
      setGrid(newGrid);

      // Move forward
      if (direction === 'across' && c < 4) {
        setSelectedCell([r, c + 1]);
      } else if (direction === 'down' && r < 4) {
        setSelectedCell([r + 1, c]);
      }
    }
  };

  const handleCheck = () => {
    const checks = Array(5).fill(false).map(() => Array(5).fill(false));
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (grid[r][c] && grid[r][c].toUpperCase() === MINI_CROSSWORD_DATA.grid[r][c]) {
          checks[r][c] = true;
        }
      }
    }
    setCheckedCells(checks);
  };

  const handleReveal = () => {
    setGrid(MINI_CROSSWORD_DATA.grid.map((row) => [...row]));
    setIsCompleted(true);
  };

  const handleReset = () => {
    setGrid(Array(5).fill('').map(() => Array(5).fill('')));
    setCheckedCells(Array(5).fill(false).map(() => Array(5).fill(false)));
    setIsCompleted(false);
    setTimerSeconds(0);
    setSelectedCell([0, 0]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Find active clue
  const activeAcrossClue = MINI_CROSSWORD_DATA.across.find((item) => item.row === selectedCell[0]);
  const activeDownClue = MINI_CROSSWORD_DATA.down.find((item) => item.col === selectedCell[1]);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top back button */}
      <div className="border-b border-[#e2e2e2] pb-3 mb-6 font-sans text-xs text-gray-600 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 hover:text-black font-medium transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Front Page</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800 uppercase tracking-wider">Games</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-950">The Mini Crossword</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-sm font-semibold bg-gray-100 px-3 py-1 rounded">
          <Clock className="w-4 h-4 text-gray-600" />
          <span>{formatTime(timerSeconds)}</span>
        </div>
      </div>

      <header className="text-center mb-6">
        <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#567b95]">New York Times Games</span>
        <h1 className="font-nyt-serif text-3xl sm:text-4xl font-bold text-black mt-1">The Mini Crossword</h1>
        <p className="text-xs font-sans text-gray-500 mt-1">Wednesday, October 15, 2025 · Edited by Will Shortz & Joel Fagliano</p>
      </header>

      {/* Active Clue Bar */}
      <div className="bg-[#f7f7f7] border border-gray-300 p-3 rounded-xs mb-6 text-center">
        <div className="text-xs font-sans font-bold uppercase tracking-wider text-gray-500">
          {direction === 'across' ? 'Across Clue' : 'Down Clue'}
        </div>
        <div className="font-nyt-serif text-base sm:text-lg font-bold text-gray-900 mt-0.5">
          {direction === 'across' ? (
            <span>{activeAcrossClue?.num}A. {activeAcrossClue?.clue}</span>
          ) : (
            <span>{activeDownClue?.num}D. {activeDownClue?.clue}</span>
          )}
        </div>
      </div>

      {/* Crossword Layout: Grid + Clues */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left: 5x5 Grid */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="inline-block border-2 border-black bg-black p-0.5 shadow-md">
            {grid.map((row, r) => (
              <div key={r} className="flex">
                {row.map((val, c) => {
                  const isSelected = selectedCell[0] === r && selectedCell[1] === c;
                  const isInActiveWord =
                    direction === 'across' ? selectedCell[0] === r : selectedCell[1] === c;
                  const isCorrectChecked = checkedCells[r][c];

                  // Clue numbers
                  let clueNum = null;
                  if (r === 0 && c === 0) clueNum = 1;
                  else if (r === 0 && c === 1) clueNum = 2;
                  else if (r === 0 && c === 2) clueNum = 3;
                  else if (r === 0 && c === 3) clueNum = 4;
                  else if (r === 0 && c === 4) clueNum = 5;
                  else if (r === 1 && c === 0) clueNum = 6;
                  else if (r === 2 && c === 0) clueNum = 7;
                  else if (r === 3 && c === 0) clueNum = 8;
                  else if (r === 4 && c === 0) clueNum = 9;

                  return (
                    <div
                      key={c}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 border border-black flex items-center justify-center font-sans font-bold text-xl sm:text-2xl cursor-pointer select-none transition-colors ${
                        isSelected
                          ? 'bg-[#ffda00] text-black'
                          : isInActiveWord
                          ? 'bg-[#a7d8ff]/50 text-black'
                          : 'bg-white text-black'
                      } ${isCorrectChecked ? 'ring-2 ring-emerald-500' : ''}`}
                    >
                      {clueNum && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-sans font-semibold text-gray-700 leading-none">
                          {clueNum}
                        </span>
                      )}
                      <input
                        type="text"
                        maxLength={1}
                        value={val}
                        onKeyDown={(e) => handleKeyDown(e, r, c)}
                        onChange={() => {}}
                        className="w-full h-full text-center bg-transparent focus:outline-none uppercase font-bold cursor-pointer"
                        autoFocus={isSelected}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-5 text-xs font-sans font-semibold">
            <button
              onClick={handleCheck}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded transition-colors"
            >
              Check Answers
            </button>
            <button
              onClick={handleReveal}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded transition-colors"
            >
              Reveal Puzzle
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {isCompleted && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-300 rounded text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold text-sm">
                <Trophy className="w-4 h-4 text-emerald-600" />
                <span>Congratulations! Puzzle Solved in {formatTime(timerSeconds)}!</span>
              </div>
              <p className="text-xs text-emerald-700">You completed today's New York Times Mini Crossword.</p>
            </div>
          )}
        </div>

        {/* Right: Clues lists */}
        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Across */}
          <div className="space-y-3">
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-black border-b-2 border-black pb-1">
              Across
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              {MINI_CROSSWORD_DATA.across.map((item) => (
                <li
                  key={item.num}
                  onClick={() => {
                    setSelectedCell([item.row, item.col]);
                    setDirection('across');
                  }}
                  className={`cursor-pointer p-1 rounded transition-colors ${
                    direction === 'across' && selectedCell[0] === item.row
                      ? 'bg-amber-100 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="font-bold mr-1">{item.num}</span>
                  <span className="text-gray-800">{item.clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Down */}
          <div className="space-y-3">
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-black border-b-2 border-black pb-1">
              Down
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              {MINI_CROSSWORD_DATA.down.map((item) => (
                <li
                  key={item.num}
                  onClick={() => {
                    setSelectedCell([item.row, item.col]);
                    setDirection('down');
                  }}
                  className={`cursor-pointer p-1 rounded transition-colors ${
                    direction === 'down' && selectedCell[1] === item.col
                      ? 'bg-amber-100 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="font-bold mr-1">{item.num}</span>
                  <span className="text-gray-800">{item.clue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
