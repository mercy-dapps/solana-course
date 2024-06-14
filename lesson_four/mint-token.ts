import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";

async function mint_token() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
  const user = getKeypairFromEnvironment("SECRET_KEY");

  const tokenMintAccount = new PublicKey(
    "4tTokXdqwmTXQvBECkWXyHAXy6zP1nN5jimSDdvMQFZg"
  );

  const recipientAssociatedTokenAccount = new PublicKey(
    "FjTKperUTN3BB2tN5ggeJ87TzbHxiBTpZ1Z58oKnUvRZ"
  );

  const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const link = getExplorerLink("transaction", transactionSignature, "devnet");

  console.log(`✅ Success! Mint Token Transaction: ${link}`);
}

mint_token();
