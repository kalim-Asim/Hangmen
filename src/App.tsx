import { useState } from "react";
import { Key } from "./components/Key";

const Word = "PUSH"; 

function App() {
  const [disabledKeys, setDisabledKeys] = useState(Array(26).fill(false));

  const handleKeyPress = (letter: string) => {
    const index = letter.charCodeAt(0) - 65;
    setDisabledKeys((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="flex justify-center items-end h-screen bg-black p-4">
      <div className="flex flex-wrap justify-center gap-2">
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
