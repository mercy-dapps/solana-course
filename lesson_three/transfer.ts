import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";
import {
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log("Please provide a public key to send to");
  process.exit(1);
}

const transfer_sol = async () => {
  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

  const toPubkey = new PublicKey(suppliedToPubkey);

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

  const transaction = new Transaction();

  const LAMPORTS_TO_SEND = 5000;

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });

  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);

  await airdropIfRequired(
    connection,
    senderKeypair.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL
  );

  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} sol to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);
};

transfer_sol()
  .then(() => {
    console.log("DONE");
  })
  .catch(() => {
    console.error;
  });
