import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import { createTransaction } from '../blockchain/utils'


function WalletFunction() {
    const wallet = useWallet()
    const [address, setaddress] = useState()
    const [amount, setamount] = useState()
    const { connection } = useConnection()
    const sendSol = async () => {
        const { transaction, latestBlockhash } = await createTransaction({
            publicKey: wallet.publicKey,
            destination: address,
            amount: amount,
            connection,
        })

        // Send transaction and await for signature
        signature = await wallet.sendTransaction(transaction, connection)

        // Send transaction and await for signature
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

        console.log(signature)
    }


    return (
        <div>
            <h1>Wallet Address: {wallet.publicKey?.toString()} </h1>
            <input type="text" placeholder='recipent address' onChange={(e) => {
                setaddress(e.target.value)
            }} />
            <input type="number" onChange={(e) => {
                setamount(e.target.value)
            }} />
            <button onClick={sendSol}>Send Sol</button>
        </div>
    )
}

export default WalletFunction