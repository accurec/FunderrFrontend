import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';
import { listenForTransactionMine } from './util'

function RefundCampaignContributions() {
    const [campaignId, setCampaignId] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refundCampaignContributions = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const txResponse = await contract.refundContributorContributions(campaignId);
                await listenForTransactionMine(txResponse, provider)
            }
            catch (error) {
                setError("Failed to refund contributions.");
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
            <button disabled={loading} onClick={refundCampaignContributions}>{loading ? 'Refunding...' : 'Refund campaign contributions'}</button>
            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default RefundCampaignContributions;