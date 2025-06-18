import { ethers } from "./ethers-6.7.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const balanceButton = document.getElementById("balanceButton")
const getOwnerButton = document.getElementById("getOwnerButton")
const getCampaignIdCounterButton = document.getElementById("getCampaignIdCounterButton")
const getActiveFundedCampaignWindowButton = document.getElementById("getActiveFundedCampaignWindowButton")
const contributeToCampaignButton = document.getElementById("contributeToCampaignButton")
const withdrawCampaignContributionsButton = document.getElementById("withdrawCampaignContributionsButton")
const refundCampaignContributionsButton = document.getElementById("refundCampaignContributionsButton")
const getCampaignInfoButton = document.getElementById("getCampaignInfoButton")
const getContributedCampaignsByContributorButton = document.getElementById("getContributedCampaignsByContributorButton")
const getCampaignsByOwnerButton = document.getElementById("getCampaignsByOwnerButton")
const getCampaignContributionByContributorButton = document.getElementById("getCampaignContributionByContributorButton")
const collectFeesButton = document.getElementById("collectFeesButton")

connectButton.onclick = connect
balanceButton.onclick = getBalance
getOwnerButton.onclick = getOwner
getCampaignIdCounterButton.onclick = getCampaignIdCounter
getActiveFundedCampaignWindowButton.onclick = getActiveFundedCampaignWindow
createCampaignButton.onclick = createCampaign
contributeToCampaignButton.onclick = contributeToCampaign
withdrawCampaignContributionsButton.onclick = withdrawCampaignContributions
refundCampaignContributionsButton.onclick = refundCampaignContributions
getCampaignInfoButton.onclick = getCampaignInfo
getContributedCampaignsByContributorButton.onclick = getContributedCampaignsByContributor
getCampaignsByOwnerButton.onclick = getCampaignsByOwner
getCampaignContributionByContributorButton.onclick = getCampaignContributionByContributor
collectFeesButton.onclick = collectFees

// Connection 
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }

        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })

        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

// Helpers
async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)

        try {
            const balance = await provider.getBalance(contractAddress)
            console.log(ethers.formatEther(balance))
        } catch (error) {
            console.log(error)
        }
    }
}

async function getOwner() {
    console.log("Getting owner...")

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const owner = await contract.getOwner()
            console.log(owner)
        } catch (error) {
            console.log(error)
        }
    }
}

async function getCampaignIdCounter() {
    console.log("Getting campaignIdCounter...")

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const campaignIdCounter = await contract.getCampaignIdCounter()
            console.log(campaignIdCounter)
        } catch (error) {
            console.log(error)
        }
    }
}

async function getActiveFundedCampaignWindow() {
    console.log("Getting activeFundedCampaignWindow...")

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const activeFundedCampaignWindow = await contract.getActiveFundedCampaignWindow()
            console.log(activeFundedCampaignWindow)
        } catch (error) {
            console.log(error)
        }
    }
}

// Functional
async function createCampaign() {
    const goalInEth = document.getElementById("goalInEth").value
    const durationInSeconds = document.getElementById("durationInSeconds").value
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value

    console.log(`Creating campaign with [${goalInEth} ETH, ${durationInSeconds} seconds, ${title}, ${description}]...`)

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const goalInWei = ethers.parseEther(goalInEth)
            const duration = parseInt(durationInSeconds)

            const createCampaignFee = await contract.getCreateCampaignFee()
            console.log(`Campaign creation fee: ${ethers.formatEther(createCampaignFee)} ETH`)

            const transactionResponse = await contract.createCampaign(goalInWei, duration, title, description, {
                value: createCampaignFee
            })
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Campaign created successfully!")
        } catch (error) {
            console.log("Error creating campaign:", error)
        }
    }
}

async function contributeToCampaign() {
    const campaignId = document.getElementById("campaignId").value
    const amountInEth = document.getElementById("amountInEth").value

    console.log(`Contributing to campaign [${campaignId}] for [${amountInEth} ETH]...`)

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const amountInWei = ethers.parseEther(amountInEth)
            const campaign = parseInt(campaignId)

            const transactionResponse = await contract.contribute(campaign, {
                value: amountInWei
            })
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Contributed to campaign successfully!")
        } catch (error) {
            console.log("Error contributing to campaign:", error)
        }
    }
}

async function withdrawCampaignContributions() {
    const campaignWithdrawId = document.getElementById("campaignWithdrawId").value

    console.log(`Withdrawing contributions from campaign [${campaignWithdrawId}]...`)

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const campaignId = parseInt(campaignWithdrawId)

            const transactionResponse = await contract.withdrawCampaignContributions(campaignId)
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Withdrawn from campaign successfully!")
        } catch (error) {
            console.log("Error withdrawing from campaign:", error)
        }
    }
}

async function refundCampaignContributions() {
    const campaignRefundId = document.getElementById("campaignRefundId").value

    console.log(`Refunding contributions from campaign [${campaignRefundId}]...`)

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const campaignId = parseInt(campaignRefundId)

            const transactionResponse = await contract.refundContributorContributions(campaignId)
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Refunded contributions from campaign successfully!")
        } catch (error) {
            console.log("Error refunding contributions from campaign:", error)
        }
    }
}

async function getCampaignInfo() {
    const campaignInfoId = document.getElementById("campaignInfoId").value
    console.log(`Getting campaign [${campaignInfoId}] info...`)

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const campaign = await contract.getCampaign(campaignInfoId)

            document.getElementById("labelCampaignId").textContent = campaign[0]
            document.getElementById("labelCampaignOwner").textContent = campaign[1]
            document.getElementById("labelCampaignGoal").textContent = `${ethers.formatEther(campaign[2])} ETH`
            document.getElementById("labelCampaignDeadline").textContent = new Date(Number(campaign[3]) * 1000).toLocaleString()
            document.getElementById("labelCampaignTotalContributed").textContent = `${ethers.formatEther(campaign[4])} ETH`
            document.getElementById("labelCampaignFundsWithdrawn").textContent = campaign[5]
            document.getElementById("labelCampaignTitle").textContent = campaign[6]
            document.getElementById("labelCampaignDescription").textContent = campaign[7]
        } catch (error) {
            console.log(error)
        }
    }
}

async function getContributedCampaignsByContributor() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        const contributorId = await signer.getAddress()
        console.log(`Getting contributor [${contributorId}] campaign contribution IDs...`)

        try {
            const campaigns = await contract.getContributedCampaignsByContributor(contributorId)

            document.getElementById("labelContributedCampaignIds").textContent = campaigns
        } catch (error) {
            console.log(error)
        }
    }
}

async function getCampaignsByOwner() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        const ownerId = await signer.getAddress()
        console.log(`Getting owner [${ownerId}] created campaign IDs...`)

        try {
            const campaigns = await contract.getCampaignsByOwner(ownerId)

            document.getElementById("labelCreatedCampaignIds").textContent = campaigns
        } catch (error) {
            console.log(error)
        }
    }
}

async function getCampaignContributionByContributor() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        const campaignId = parseInt(document.getElementById("campaignContributedByContributorId").value)
        const contributorId = await signer.getAddress()
        console.log(`Getting contributor [${contributorId}] contribution amount to campaign [${campaignId}]...`)

        try {
            const contributed = await contract.getCampaignContributionByContributor(campaignId, contributorId)

            document.getElementById("labelContributedToCampaign").textContent = `${ethers.formatEther(contributed)} ETH`
        } catch (error) {
            console.log(error)
        }
    }
}

async function collectFees() {
    console.log(`Collecting fees...`)

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const transactionResponse = await contract.collectFees()
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Collected fees successfully!")
        } catch (error) {
            console.log("Error collecting fees:", error)
        }
    }
}

// Internal helpers
function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)

    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations.`)
            resolve()
        })
    })
}