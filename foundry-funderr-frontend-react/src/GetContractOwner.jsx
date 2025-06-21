import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetContractOwner() {
    const [contractOwner, setContractOwner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getContractOwner = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const owner = await contract.getOwner();

                setContractOwner(owner);
            } catch (error) {
                setError("Failed to get contract owner.");
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
                onClick={getContractOwner}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Get contract owner'}
            </button>

            {contractOwner && (
                <label>Contract owner: {contractOwner}</label>
            )}

            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default GetContractOwner; 