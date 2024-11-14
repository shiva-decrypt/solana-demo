import { LAMPORTS_PER_SOL, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";


export async function createTransaction({
    publicKey,
    destination,
    amount,
    connection,
  }) {
    // Get the latest blockhash to use in our transaction
    const latestBlockhash = await connection.getLatestBlockhash();
  
    // Create instructions to send, in this case a simple transfer
    const instructions = [
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: destination,
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    ];
  
    // Create a new TransactionMessage with version and compile it to legacy
    const messageLegacy = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions,
    }).compileToLegacyMessage();
  
    // Create a new VersionedTransaction which supports legacy and v0
    const transaction = new VersionedTransaction(messageLegacy);
  
    return {
      transaction,
      latestBlockhash,
    };
  }
  