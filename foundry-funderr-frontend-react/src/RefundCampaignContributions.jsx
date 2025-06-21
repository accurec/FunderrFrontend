import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function RefundCampaignContributions() {
    const [campaignId, setCampaignId] = useState('');

    const refundCampaignContributions = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            await contract.refundContributorContributions(campaignId);
            alert('Refunded campaign contributions!');
        }
    };

    return (
        <div className="component">
            <input style={{ marginRight: '10px' }} value={campaignId} onChange={e => setCampaignId(e.target.value)} placeholder="Campaign ID" />
            <button onClick={refundCampaignContributions}>Refund campaign contributions</button>
        </div>
    );
}

export default RefundCampaignContributions;