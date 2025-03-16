import { useState } from "react";
import { Key } from "./components/Key";

const Word = ["P", "U", "S", "H"]; // Store word as an array for easier checking

function App() {
  const [disabledKeys, setDisabledKeys] = useState(Array(26).fill(false));
  const [inputs, setInputs] = useState(["P", "U", "S", "H"]); 
  const [hiddenInputs, setHiddenInputs] = useState([true, true, true, true]); // Track visibility

  const handleKeyPress = (letter: string) => {
    const index = letter.charCodeAt(0) - 65;

    setDisabledKeys((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    // Reveal input box if the letter is in the word
    const wordIndex = Word.indexOf(letter);
    if (wordIndex !== -1) {
      setHiddenInputs((prev) => {
        const newHidden = [...prev];
        newHidden[wordIndex] = false;
        return newHidden;
      });
    }
  };

  return (
    <div className="min-w-[320px] min-h-[600px] flex flex-col justify-center items-center h-screen bg-black p-4">
      {/* Four Input Boxes */}
      <div className="flex gap-2 mb-32">
        {inputs.map((val, i) => (
          <input
            key={i}
            type={hiddenInputs[i] ? "password" : "text"} // Toggle visibility
            value={val}
            className="w-32 h-32 text-9xl text-center border-b-4 border-gray-500 rounded-lg bg-black text-white outline-none"
            maxLength={1}
            readOnly
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
