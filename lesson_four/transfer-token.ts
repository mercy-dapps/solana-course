import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

async function transfer_token() {
  const connection = new Connection(clusterApiUrl("devnet"));
  const sender = getKeypairFromEnvironment("SECRET_KEY");

  console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
  );

  const recipient = new PublicKey(
    "Cedy49A6sp4KhsBfCw9tJ9mdsdJ7Fav2T52mpHPmp8GF"
  );

  const tokenMintAccount = new PublicKey(
    "4tTokXdqwmTXQvBECkWXyHAXy6zP1nN5jimSDdvMQFZg"
  );

  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

  console.log(`💸 Attempting to send 2 token to ${recipient.toBase58()}...`);

  const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    sender.publicKey
  );

  const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );

  const signature = await transfer(
    connection,
    sender,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    sender,
    2 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const explorerLink = getExplorerLink("transaction", signature, "devnet");

  console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
}

transfer_token();
