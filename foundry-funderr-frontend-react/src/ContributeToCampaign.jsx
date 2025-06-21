import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function ContributeToCampaign() {
    const [campaignId, setCampaignId] = useState('');
    const [amountInEth, setAmountInEth] = useState('');

    const contributeToCampaign = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const amountInWei = ethers.parseEther(amountInEth);

            await contract.contribute(campaignId, { value: amountInWei });
            alert('Contributed to campaign!');
        }
    };

    return (
        <div className="component">
            <input style={{ marginRight: '10px' }} value={campaignId} onChange={e => setCampaignId(e.target.value)} placeholder="Campaign ID" />
            <input style={{ marginRight: '10px' }} value={amountInEth} onChange={e => setAmountInEth(e.target.value)} placeholder="Amount in ETH" />
            <button onClick={contributeToCampaign}>Contribute to campaign</button>
        </div>
    );
}

export default ContributeToCampaign;