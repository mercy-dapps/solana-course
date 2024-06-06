import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`pubKey: ${keypair.publicKey.toBase58()}`);
console.log(`secretKey: ${keypair.secretKey}`);
console.log(`✅ Finished!`);