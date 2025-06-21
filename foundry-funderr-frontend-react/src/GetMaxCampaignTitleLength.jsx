import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetMaxCampaignTitleLength() {
    const [campaignMaxTitleLength, setMaxTitleLength] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMaxCampaignTitleLength = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const campaignMaxTitleLength = await contract.getMaxTitleLength();

                setMaxTitleLength(campaignMaxTitleLength);
            } catch (error) {
                setError("Failed to get max campaign title length.");
            } finally {
                setLoading(false);
            }
        } else {
            setError("Please install MetaMask!");
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={getMaxCampaignTitleLength}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Get max campaign title length'}
            </button>

            {campaignMaxTitleLength && (
                <label>Max campaign title length: {campaignMaxTitleLength} bytes</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetMaxCampaignTitleLength; 