import { useState } from "react";
import { Key } from "./components/Key";

const Words = ["PUSH", "SIT", "TABLE", "TO"];

function App() {
  const initializeGame = () => {
    const str = Words[Math.floor(Math.random() * Words.length)];
    return {
      word: str.split(""),
      hiddenInputs: Array(str.length).fill(true),
      disabledKeys: Array(26).fill(false),
      tries: 0,
      rem: str.length
    };
  };

  const [gameState, setGameState] = useState(initializeGame());

  const handleKeyPress = (letter: string) => {
    const index = letter.charCodeAt(0) - 65;

    setGameState((prev) => {
      const wordIndex = prev.word.indexOf(letter);
      let newHiddenInputs = [...prev.hiddenInputs];
      let newTries = prev.tries;
      let newRem = prev.rem;

      if (wordIndex !== -1) {
        newHiddenInputs[wordIndex] = false;
        newRem--;
      } else {
        newTries++;
      }

      if (newTries === 5) {
        setTimeout(() => {
          alert("YOU LOST !!");
          refresh();
        }, 1000);
      } else if (newRem === 0) {
        setTimeout(() => {
          alert("YOU WON !!");
          refresh();
        }, 1000);
      }

      return {
        ...prev,
        disabledKeys: prev.disabledKeys.map((val, i) =>
          i === index ? true : val
        ),
        hiddenInputs: newHiddenInputs,
        tries: newTries,
        rem: newRem
      };
    });
  };

  const refresh = () => {
    setGameState(initializeGame());
  };

  return (
    <div className="min-w-[320px] min-h-[600px] flex flex-col justify-center items-center h-screen bg-black p-4">

      <div className="flex gap-10 mb-32">
        {gameState.word.map((val, i) => (
          <input
            key={i}
            type={gameState.hiddenInputs[i] ? "password" : "text"}
            value={val}
            className="w-32 h-32 text-9xl text-center border-b-4 border-gray-500 rounded-lg bg-black text-white outline-none"
            maxLength={1}
            readOnly
          />
        ))}
      </div>

      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 26 }, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <Key
              key={i}
              value={letter}
              disable={gameState.disabledKeys[i]}
              onClick={() => handleKeyPress(letter)}
            />
          );
        })}
      </div>

      
      <button
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
        onClick={refresh}
      >
        Restart
      </button>
    </div>
  );
}

export default App;
