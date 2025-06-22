import React, { useState, useEffect } from 'react';

function MetamaskConnector() {
    const [account, setAccount] = useState(null);

    // Function to connect to MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (err) {
                alert('Connection to MetaMask was rejected.');
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    // Listen for account changes
    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = (accounts) => {
            setAccount(accounts[0] || null);
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Get initial account if already connected
        window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
            if (accounts.length > 0) setAccount(accounts[0]);
        });

        // Cleanup listener on unmount
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    return (
        <div className="component">
            <button style={{ marginRight: '10px' }} onClick={connectWallet}>{account ? 'Connected' : 'Connect web3 account'}</button>
            {account ? <label>Current account: {account}</label> : <label>No account connected</label>}
        </div>
    );
}

export default MetamaskConnector;