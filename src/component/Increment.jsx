import React, { useState } from 'react';
import { getProvider, setProvider } from '@coral-xyz/anchor'
import { useConnection } from '@solana/wallet-adapter-react';

function Increment() {
  const [count, setCount] = useState(0);
  const { connection } = useConnection();
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleInitialize = async () => {
    const dayt = setProvider({
      connection
    })
    const provider = getProvider()

    setProvider()
    console.log("provider", provider)
    setCount(0);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8  ">
      <div className="text-2xl font-semibold mb-4">Count: {count}</div>
      <div className="flex space-x-4">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Decrement
        </button>
        <button
          onClick={handleInitialize}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Initialize
        </button>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default Increment;
