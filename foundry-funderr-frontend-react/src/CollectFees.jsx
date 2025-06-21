import { ethers } from 'ethers';
import { abi, contractAddress } from './constants';

function CollectFees() {
    const collectFees = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            await contract.collectFees();
            alert('Collected fees!');
        }
    };

    return (
        <div>
            <button onClick={collectFees}>Collect fees</button>
        </div>
    );
}

export default CollectFees;