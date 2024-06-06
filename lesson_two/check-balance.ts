import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

// a validation check for valid address
if (!PublicKey.isOnCurve(suppliedPublicKey)) {
  throw new Error("Provide a valid public key!");
}

const load_from_network = async () => {
  // devnet
  // const connection = new Connection(clusterApiUrl("devnet"));

  // mainnet
  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  // const address = new PublicKey("HetwJBCzZYGhKGTs3sz81g32xKxvaxS9RMDQGeVg87hz");

  const address = new PublicKey(suppliedPublicKey);
  const balance = await connection.getBalance(address);
  const balanceInSol = balance / LAMPORTS_PER_SOL;

  console.log(
    `💰 Finished! The balance of the account at ${address} is ${balance} lamports`
  );

  console.log(
    `💰 Finished! The balance of the account at ${address} is ${balanceInSol} SOL`
  );
};

load_from_network()
  .then(() => {
    console.log("DONE");
  })
  .catch(() => {
    console.error;
  });
