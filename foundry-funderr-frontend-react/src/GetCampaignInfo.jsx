import { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function GetCampaignInfo() {
    const [campaignInfoId, setCampaignInfoId] = useState('');

    const [id, setId] = useState('');
    const [owner, setOwner] = useState('');
    const [goal, setGoal] = useState(0);
    const [deadline, setDeadline] = useState(0);
    const [totalContributed, setTotalContributed] = useState(0);
    const [fundsWithdrawn, setFundsWithdrawn] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const getCampaignInfo = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)

            const campaign = await contract.getCampaign(campaignInfoId)

            setId(campaign[0])
            setOwner(campaign[1])
            setGoal(campaign[2])
            setDeadline(campaign[3])
            setTotalContributed(campaign[4])
            setFundsWithdrawn(campaign[5])
            setTitle(campaign[6])
            setDescription(campaign[7])
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            <input value={campaignInfoId} onChange={e => setCampaignInfoId(e.target.value)} placeholder="Campaign ID" />
            <button onClick={getCampaignInfo}>Get campaign info</button>
            <label>ID: {id}</label>
            <label>Owner: {owner}</label>
            <label>Goal: {ethers.formatEther(goal)} ETH</label>
            <label>Deadline: {new Date(Number(deadline) * 1000).toLocaleString()}</label>
            <label>Total contributed: {ethers.formatEther(totalContributed)} ETH</label>
            <label>Funds withdrawn: {fundsWithdrawn ? 'Yes' : 'No'}</label>
            <label>Title: {title}</label>
            <label>Description: {description}</label>
        </div>
    );
}

export default GetCampaignInfo;