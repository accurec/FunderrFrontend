import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetCreateCampaignFee() {
    const [fee, setFee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCreateCampaignFee = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const createCampaignFee = await contract.getCreateCampaignFee();
                const feeInEth = ethers.formatEther(createCampaignFee);

                setFee(feeInEth);
            } catch (error) {
                setError("Failed to get campaign creation fee.");
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
                onClick={getCreateCampaignFee}
                disabled={loading}
                style={{ marginRight: '10px' }}
            >
                {loading ? 'Loading...' : 'Get campaign creation fee'}
            </button>

            {fee && (
                <label>Campaign creation fee: {fee} ETH</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetCreateCampaignFee; 