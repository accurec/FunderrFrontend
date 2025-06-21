import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function WithdrawCampaignContributions() {
    const [campaignId, setCampaignId] = useState('');

    const withdrawCampaignContributions = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            await contract.withdrawCampaignContributions(campaignId);
            alert('Withdrawn campaign contributions!');
        }
    };

    return (
        <div className="component">
            <input value={campaignId} onChange={e => setCampaignId(e.target.value)} placeholder="Campaign ID" />
            <button onClick={withdrawCampaignContributions}>Withdraw campaign contributions</button>
        </div>
    );
}

export default WithdrawCampaignContributions;