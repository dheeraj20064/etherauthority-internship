import { expect } from "chai"
import { network } from "hardhat"

describe("StakingContract", function () {
    let token, staking, owner, user1, ethers

    beforeEach(async function () {
        const connection = await network.connect()
        ethers = connection.ethers

        ;[owner, user1] = await ethers.getSigners()

        const Token = await ethers.getContractFactory(
            "InternRewardToken"
        )
        token = await Token.deploy(1000000)

        const Staking = await ethers.getContractFactory(
            "StakingContract"
        )
        staking = await Staking.deploy(token.target)

        await token.transfer(
            user1.address,
            ethers.parseUnits("1000", 18)
        )

        await token.approve(
            staking.target,
            ethers.parseUnits("10000", 18)
        )
        await staking.fundRewardPool(
            ethers.parseUnits("10000", 18)
        )
    })

    it("Should allow user to stake tokens", async function () {
        const amount = ethers.parseUnits("100", 18)

        await token.connect(user1).approve(
            staking.target, amount
        )
        await staking.connect(user1).stake(amount)

        const info = await staking.getStakeInfo(
            user1.address
        )
        expect(info[0]).to.equal(amount)
        expect(info[3]).to.equal(true)
    })

    it("Should not allow staking 0 tokens", async function () {
        await expect(
            staking.connect(user1).stake(0)
        ).to.be.revertedWith(
            "Amount must be greater than 0"
        )
    })

    it("Should not allow double staking", async function () {
        const amount = ethers.parseUnits("100", 18)

        await token.connect(user1).approve(
            staking.target, amount
        )
        await staking.connect(user1).stake(amount)

        await token.connect(user1).approve(
            staking.target, amount
        )
        await expect(
            staking.connect(user1).stake(amount)
        ).to.be.revertedWith("Already staking")
    })

    it("Should allow withdrawal after staking", async function () {
        const amount = ethers.parseUnits("100", 18)

        await token.connect(user1).approve(
            staking.target, amount
        )
        await staking.connect(user1).stake(amount)

        await staking.connect(user1).withdraw()

        const info = await staking.getStakeInfo(
            user1.address
        )
        expect(info[3]).to.equal(false)
    })

    it("Should not allow non-owner to set reward rate", async function () {
        await expect(
            staking.connect(user1).setRewardRate(20)
        ).to.be.revertedWith("Not owner")
    })

    it("Should allow owner to change reward rate", async function () {
        await staking.setRewardRate(20)
        expect(await staking.rewardRate()).to.equal(20)
    })
})