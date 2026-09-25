import { ethers } from 'ethers';

interface Bounty {
  id: string;
  title: string;
  fundingAmount: string;
}

interface FundingParams {
  amount: string;
}

export class AgentClient {
  constructor(
    private wallet: ethers.Wallet,
    private usdcContract: string
  ) {}

  async createBounty(params: Omit<Bounty, 'id'>): Promise<Bounty> {
    // Implementation: API call to create bounty
    return { ...params, id: 'test-bounty-123' } as Bounty;
  }

  async fundBounty(bountyId: string, { amount }: FundingParams): Promise<void> {
    const tx = await this.wallet.sendTransaction({
      to: this.usdcContract,
      value: '0',
      data: this.encodeUSDCTransfer(amount),
    });n    await tx.wait();
  }

  async topUpBounty(bountyId: string, { amount }: FundingParams): Promise<void> {
    await this.fundBounty(bountyId, { amount });
  }

  private encodeUSDCTransfer(amount: string): string {
    // USDC transfer ABI encoding
    return '0x...';
  }
}
