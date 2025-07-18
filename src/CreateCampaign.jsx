import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';
import { listenForTransactionMine } from './util'

function CreateCampaign() {
    const [goal, setGoal] = useState('');
    const [duration, setDuration] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createCampaign = async () => {
        setLoading(true);
        setError(null);

        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const goalInWei = ethers.parseEther(goal);
                const durationInt = parseInt(duration);
                const fee = await contract.getCreateCampaignFee();

                const txResponse = await contract.createCampaign(goalInWei, durationInt, title, description, { value: fee });
                await listenForTransactionMine(txResponse, provider)
            }
            catch (error) {
                setError("Failed to create campaign.");
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
            <input style={{ marginRight: '10px' }} value={goal} onChange={e => setGoal(e.target.value)} placeholder="Goal in ETH" />
            <input style={{ marginRight: '10px' }} value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration in seconds" />
            <input style={{ marginRight: '10px' }} value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input style={{ marginRight: '10px' }} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            <button disabled={loading} onClick={createCampaign}>{loading ? 'Creating...' : 'Create campaign'}</button>
            {error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default CreateCampaign;