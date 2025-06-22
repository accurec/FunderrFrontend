import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetActiveFundedCampaignWindow() {
    const [activeCampaignWindow, setActiveCampaignWindow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getActiveFundedCampaignWindow = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const activeCampaignWindow = await contract.getActiveFundedCampaignWindow();

                setActiveCampaignWindow(activeCampaignWindow);
            } catch (error) {
                setError("Failed to get active funded campaign window.");
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
                onClick={getActiveFundedCampaignWindow}
                disabled={loading}
                style={{ marginRight: '10px' }}
            >
                {loading ? 'Loading...' : 'Get active funded campaign window'}
            </button>

            {activeCampaignWindow && (
                <label>Active funded campaign window: {parseInt(activeCampaignWindow) / 86400} days</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetActiveFundedCampaignWindow; 