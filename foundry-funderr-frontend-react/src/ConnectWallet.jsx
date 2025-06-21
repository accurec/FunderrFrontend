import { useState } from 'react';
import { ethers } from 'ethers';

function ConnectWallet({ setAccount }) {
    const [connected, setConnected] = useState(false);

    const connect = async () => {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            setAccount(address);
            setConnected(true);
        } else {
            alert('Please install MetaMask');
        }
    };

    return (
        <button style={{ marginRight: '10px' }} onClick={connect}>
            {connected ? 'Connected' : 'Connect Wallet'}
        </button>
    );
}

export default ConnectWallet;