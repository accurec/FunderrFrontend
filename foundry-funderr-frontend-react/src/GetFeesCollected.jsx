import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetFeesCollected() {
    const [feesCollected, setFeesCollected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getFeesCollected = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const feesCollected = await contract.getFeesCollected();
                const feesCollectedInEth = ethers.formatEther(feesCollected);

                setFeesCollected(feesCollectedInEth);
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
                onClick={getFeesCollected}
                disabled={loading}
                style={{ marginRight: '10px' }}
            >
                {loading ? 'Loading...' : 'Get fees collected'}
            </button>

            {feesCollected && (
                <label>Fees collected: {feesCollected} ETH</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetFeesCollected; 