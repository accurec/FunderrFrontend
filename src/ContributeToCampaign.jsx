import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';
import { listenForTransactionMine } from './util'

function ContributeToCampaign() {
    const [campaignId, setCampaignId] = useState('');
    const [amountInEth, setAmountInEth] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const contributeToCampaign = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const amountInWei = ethers.parseEther(amountInEth);

                const txResponse = await contract.contribute(campaignId, { value: amountInWei });
                await listenForTransactionMine(txResponse, provider)
            }
            catch (error) {
                setError("Failed to contribute to campaign.");
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
            <input style={{ marginRight: '10px' }} value={campaignId} onChange={e => setCampaignId(e.target.value)} placeholder="Campaign ID" />
            <input style={{ marginRight: '10px' }} value={amountInEth} onChange={e => setAmountInEth(e.target.value)} placeholder="Amount in ETH" />
            <button disabled={loading} onClick={contributeToCampaign}>{loading ? 'Contributing...' : 'Contribute to campaign'}</button>
            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default ContributeToCampaign;