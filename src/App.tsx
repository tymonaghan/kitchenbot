import { useState } from 'react'

import './App.css'
import { Tag } from '@chakra-ui/react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>Kitchenbot</h1>
      <Tag>This is a chakra-ui tag</Tag>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>

    </>
  )
}

export default App
