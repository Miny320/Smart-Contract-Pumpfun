import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateRaydiumPoolArgs {
  nonce: number
  initPcAmount: BN
  initCoinAmount: BN
}

export interface CreateRaydiumPoolAccounts {
  pool: PublicKey
  globalAccount: PublicKey
  coinMint: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
  tokenProgram: PublicKey
  associatedTokenProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("nonce"),
  borsh.u64("initPcAmount"),
  borsh.u64("initCoinAmount"),
])

export function createRaydiumPool(
  args: CreateRaydiumPoolArgs,
  accounts: CreateRaydiumPoolAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.pool, isSigner: false, isWritable: true },
    { pubkey: accounts.globalAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.coinMint, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.associatedTokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([160, 160, 26, 237, 46, 98, 91, 97])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      nonce: args.nonce,
      initPcAmount: args.initPcAmount,
      initCoinAmount: args.initCoinAmount,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
