export function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining transaction ${transactionResponse.hash}...`)

    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, async (transactionReceipt) => {
            const confirmations = await transactionReceipt.confirmations();
            console.log(`Mining transaction completed with ${confirmations} confirmations.`)
            resolve()
        })
    })
}