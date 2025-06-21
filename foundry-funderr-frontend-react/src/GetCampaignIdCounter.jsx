import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetCampaignIdCounter() {
    const [campaignIdCounter, setCampaignIdCounter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCampaignIdCounter = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const counter = await contract.getCampaignIdCounter();

                setCampaignIdCounter(counter);
            } catch (error) {
                setError("Failed to get campaign ID counter.");
            } finally {
                setLoading(false);
            }
        } else {
            setError("Please install MetaMask!");
            setLoading(false);
        }
    };

    return (
        <div className="component">
            <button
                onClick={getCampaignIdCounter}
                disabled={loading}
                style={{ marginRight: '10px' }}
            >
                {loading ? 'Loading...' : 'Get campaign ID counter'}
            </button>

            {campaignIdCounter && (
                <label>Campaign ID counter: {campaignIdCounter}</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetCampaignIdCounter; 