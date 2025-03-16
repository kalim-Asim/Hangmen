import { useState } from "react";
import { Key } from "./components/Key";

const Word = "PUSH";

function App() {
  const [disabledKeys, setDisabledKeys] = useState(Array(26).fill(false));
  const [inputs, setInputs] = useState(Array(4).fill("")); // Four input boxes

  const handleKeyPress = (letter: string) => {
    const index = letter.charCodeAt(0) - 65;
    setDisabledKeys((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    // Auto-fill first empty input box
    setInputs((prev) => {
      const newInputs = [...prev];
      const emptyIndex = newInputs.findIndex((val) => val === "");
      if (emptyIndex !== -1) {
        newInputs[emptyIndex] = letter;
      }
      return newInputs;
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black p-4">
      {/* Four Input Boxes */}
      <div className="flex gap-2 mb-4">
        {inputs.map((val, i) => (
          <input
            key={i}
            type="text"
            value={val}
            onChange={(e) => handleInputChange(i, e.target.value.toUpperCase())}
            className="w-16 h-16 text-2xl text-center uppercase border border-gray-300 rounded-lg bg-white outline-none"
            maxLength={1}
          />
        ))}
      </div>

      {/* Keyboard */}
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 26 }, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <Key
              key={i}
              value={letter}
              disable={disabledKeys[i]}
              onClick={() => handleKeyPress(letter)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
