import { Key } from "./components/Key"

function App() {
  return (
    <>
    {[...Array(26)].map((_, i) => (
      <Key value={'A'+i}></Key>
    ))}
    </>
  )
}

export default App
