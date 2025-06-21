import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetMaxCampaignDescriptionLength() {
    const [campaignMaxDescriptionLength, setMaxDescriptionLength] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMaxCampaignDescriptionLength = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const campaignMaxDescriptionLength = await contract.getMaxDescriptionLength();

                setMaxDescriptionLength(campaignMaxDescriptionLength);
            } catch (error) {
                setError("Failed to get max campaign description length.");
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
                onClick={getMaxCampaignDescriptionLength}
                disabled={loading}
                style={{ marginRight: '10px' }}
            >
                {loading ? 'Loading...' : 'Get max campaign description length'}
            </button>

            {campaignMaxDescriptionLength && (
                <label>Max campaign description length: {campaignMaxDescriptionLength} bytes</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetMaxCampaignDescriptionLength; 