import { useState } from 'react'
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';
import { listenForTransactionMine } from './util'

function CollectFees() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const collectFees = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const txResponse = await contract.collectFees();
                await listenForTransactionMine(txResponse, provider)
            }
            catch (error) {
                setError("Failed to withdraw collected fees.");
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
            <button disabled={loading} onClick={collectFees}>{loading ? 'Withdrawing...' : 'Withdraw collected fees'}</button>
            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default CollectFees;