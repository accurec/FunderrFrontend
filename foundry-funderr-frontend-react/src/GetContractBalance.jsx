import { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress } from './constants';

function GetContractBalance() {
    const [contractBalance, setContractBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getContractBalance = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);

                const balance = await provider.getBalance(contractAddress);

                setContractBalance(balance);
            } catch (error) {
                setError("Failed to get contract balance.");
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
                onClick={getContractBalance}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Get contract balance'}
            </button>

            {contractBalance && (
                <label>Contract balance: {ethers.formatEther(contractBalance)} ETH</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetContractBalance; 