import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetCampaignsCreated() {
    const [campaignsContributions, setCampaignsContributions] = useState([]);

    const getCampaignsCreated = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const ownerId = await signer.getAddress()

            const campaigns = await contract.getCampaignsByOwner(ownerId);
            setCampaignsContributions(campaigns)
            alert('Retrieved campaigns that I created!');
        }
    };

    return (
        <div>
            <button onClick={getCampaignsCreated}>Get campaigns I created</button>
            <label>Campaign IDs: {campaignsContributions.join(', ')}</label>
        </div>
    );
}

export default GetCampaignsCreated;