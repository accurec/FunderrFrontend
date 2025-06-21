import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ConnectWallet from './ConnectWallet'
import CreateCampaign from './CreateCampaign'
import GetCampaignInfo from './GetCampaignInfo'

function App() {
  const [account, setAccount] = useState(null)
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <div>
        <ConnectWallet setAccount={setAccount} /> {/* Pass setAccount as prop */}
        {account && <p>Connected account: {account}</p>} {/* Use account state */}
      </div>

      <CreateCampaign />
      <GetCampaignInfo />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
