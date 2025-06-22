import { useState } from 'react'
import './App.css'
import MetamaskConnector from './MetamaskConnector'
import CreateCampaign from './CreateCampaign'
import GetCampaignInfo from './GetCampaignInfo'
import ContributeToCampaign from './ContributeToCampaign'
import WithdrawCampaignContributions from './WithdrawCampaignContributions'
import RefundCampaignContributions from './RefundCampaignContributions'
import CollectFees from './CollectFees'
import GetCampaignsContributions from './GetCampaignsContributions'
import GetCampaignsCreated from './GetCampaignsCreated'
import GetAmountContributedToCampaign from './GetAmountContributedToCampaign'
import GetCreateCampaignFee from './GetCreateCampaignFee'
import GetMaxCampaignDescriptionLength from './GetMaxCampaignDescriptionLength'
import GetMaxCampaignTitleLength from './GetMaxCampaignTitleLength'
import GetActiveFundedCampaignWindow from './GetActiveFundedCampaignWindow'
import GetCampaignIdCounter from './GetCampaignIdCounter'
import GetContractOwner from './GetContractOwner'
import GetContractBalance from './GetContractBalance'
import GetFeesCollected from './GetFeesCollected'

function App() {
  const [account, setAccount] = useState(null)

  return (
    <>
      <h1>Funderr dApp</h1>
      <MetamaskConnector />
      <CreateCampaign />
      <ContributeToCampaign />
      <WithdrawCampaignContributions />
      <RefundCampaignContributions />
      <CollectFees />
      <GetCampaignsContributions />
      <GetCampaignsCreated />
      <GetAmountContributedToCampaign />
      <GetCampaignInfo />
      <GetCreateCampaignFee />
      <GetMaxCampaignDescriptionLength />
      <GetMaxCampaignTitleLength />
      <GetActiveFundedCampaignWindow />
      <GetCampaignIdCounter />
      <GetContractOwner />
      <GetContractBalance />
      <GetFeesCollected />
    </>
  )
}

export default App
