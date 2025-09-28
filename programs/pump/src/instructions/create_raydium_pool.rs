use anchor_lang::{prelude::*, solana_program::program::invoke_signed};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

use crate::state::{LiquidityPool, LiquidityPoolAccount, LiquidityProvider};
use raydium_contract_instructions::amm_instruction;

pub fn create_raydium_pool(
    ctx: Context<CreateRaydiumPool>,
    nonce: u8,
    init_pc_amount: u64,
    init_coin_amount: u64,
) -> Result<()> {
    
    // Implementation for creating Raydium pool
    // If you want to Interact with CPI, then plz contact to me.

    Ok(())
}

#[derive(Accounts)]
pub struct CreateRaydiumPool<'info> {
    #[account(
        mut,
        seeds = [LiquidityPool::POOL_SEED_PREFIX.as_bytes(), coin_mint.key().as_ref()],
        bump = pool.bump
    )]
    pub pool: Box<Account<'info, LiquidityPool>>,

    /// CHECK
    #[account(
        mut,
        seeds = [b"global"],
        bump,
    )]
    pub global_account: AccountInfo<'info>,
    
    #[account(mut)]
    pub coin_mint: Box<Account<'info, Mint>>,
    
    /// CHECK: Safe - CPI accounts
    #[account(mut)]
    pub payer: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
