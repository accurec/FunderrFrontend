import { useState } from 'react'
import './App.css'
import ConnectWallet from './ConnectWallet'
import CreateCampaign from './CreateCampaign'
import GetCampaignInfo from './GetCampaignInfo'
import ContributeToCampaign from './ContributeToCampaign'
import WithdrawCampaignContributions from './WithdrawCampaignContributions'
import RefundCampaignContributions from './RefundCampaignContributions'
import CollectFees from './CollectFees'

function App() {
  const [account, setAccount] = useState(null)

  return (
    <>
      <h1>Funderr dApp</h1>
      <div>
        <ConnectWallet setAccount={setAccount} />
        {account && <p>Connected account: {account}</p>}
      </div>
      <CreateCampaign />
      <ContributeToCampaign />
      <WithdrawCampaignContributions />
      <RefundCampaignContributions />
      <CollectFees />
      <GetCampaignInfo />
    </>
  )
}

export default App
