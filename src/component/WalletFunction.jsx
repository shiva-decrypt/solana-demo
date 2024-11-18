import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import { createTransaction } from '../blockchain/utils';
import { PublicKey } from '@solana/web3.js';

function WalletFunction() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const sendSol = async () => {
        setError('');
        setSuccess('');
        if (!wallet.publicKey) {
            setError('Wallet not connected!');
            return;
        }
        if (!address || !amount) {
            setError('Please provide a valid recipient address and amount.');
            return;
        }

        try {
            setLoading(true);
            const { transaction, latestBlockhash } = await createTransaction({
                publicKey: wallet.publicKey,
                destination: new PublicKey(address),
                amount: parseFloat(amount),
                connection,
            });

            const signature = await wallet.sendTransaction(transaction, connection);
            await connection.confirmTransaction(
                { signature, ...latestBlockhash },
                'confirmed'
            );
            setSuccess(`Transaction successful! Signature: ${signature}`);
        } catch (err) {
            setError(`Transaction failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 ">
            <h1 className="text-2xl font-bold mb-4">Wallet Function</h1>
            <div className="w-full max-w-md space-y-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                    <p className="text-gray-700">
                        <strong>Wallet Address:</strong>{' '}
                        {wallet.publicKey?.toString() || 'Not connected'}
                    </p>
                </div>
                <input
                    type="text"
                    placeholder="Recipient Address"
                    className="w-full p-2 border rounded-md"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount (SOL)"
                    className="w-full p-2 border rounded-md"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    onClick={sendSol}
                    disabled={loading}
                    className={`w-full p-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Sending...' : 'Send SOL'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
            </div>
        </div>
    );
}

export default WalletFunction;
