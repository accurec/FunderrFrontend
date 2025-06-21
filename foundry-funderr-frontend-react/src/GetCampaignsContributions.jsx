import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetCampaignsContributions() {
    const [campaignsContributions, setCampaignsContributions] = useState([]);

    const getCampaignsContributions = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const contributorId = await signer.getAddress()

            const campaigns = await contract.getContributedCampaignsByContributor(contributorId);
            setCampaignsContributions(campaigns)
            alert('Retrieved campaign contributions!');
        }
    };

    return (
        <div className="component">
            <button onClick={getCampaignsContributions}>Get my campaigns contributions</button>
            <label>Campaign IDs: {campaignsContributions.join(', ')}</label>
        </div>
    );
}

export default GetCampaignsContributions;