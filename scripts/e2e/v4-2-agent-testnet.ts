import { AgentClient } from '../../src/agent';
import { TESTNET_CONFIG } from '../../config/testnet';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(TESTNET_CONFIG.rpcUrl);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

async function runTest() {
  const agent = new AgentClient(wallet, TESTNET_CONFIG.usdcContract);

  // 1. Create bounty
  const bounty = await agent.createBounty({
    title: 'V4-2 Test Bounty',
    description: 'Testnet funding workflow',
    fundingAmount: TESTNET_CONFIG.minFundingAmount,
  });

  // 2. Fund bounty
  await agent.fundBounty(bounty.id, {
    amount: TESTNET_CONFIG.minFundingAmount,
  });

  // 3. Top-up bounty
  await agent.topUpBounty(bounty.id, {
    amount: TESTNET_CONFIG.topUpAmount,
  });

  console.log('✓ Test completed successfully');
}

runTest().catch(console.error);
