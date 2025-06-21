import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetAmountContributedToCampaign() {
    const [campaignId, setCampaignId] = useState('')
    const [campaignContributedAmount, setCampaignContributedAmount] = useState(0);

    const getAmountContributedToCampaign = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const contributorId = await signer.getAddress()

            const contributed = await contract.getCampaignContributionByContributor(campaignId, contributorId);
            setCampaignContributedAmount(ethers.formatEther(contributed))
            alert('Retrieved campaign contributions!');
        }
    };

    return (
        <div className="component">
            <input value={campaignId} onChange={e => setCampaignId(e.target.value)} placeholder="Campaign ID" />
            <button onClick={getAmountContributedToCampaign}>Get amount I contributed to a campaign</button>
            <label>Contributed: {campaignContributedAmount} ETH</label>
        </div>
    );
}

export default GetAmountContributedToCampaign;