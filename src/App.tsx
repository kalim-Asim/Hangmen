import { Key } from "./components/Key"

function App() {
  return (
    <div className="flex justify-center items-end h-screen bg-black p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 26 }, (_, i) => (
          <Key key={i} value={String.fromCharCode(65 + i)} />
        ))}
      </div>
    </div>
  )
}

export default App
