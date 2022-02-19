import * as nearAPI from "near-api-js"

export default async function useNear() {
    const { keyStores, connect, WalletConnection } = nearAPI
    const keyStore = new keyStores.BrowserLocalStorageKeyStore()

    const config = {
        networkId: "testnet",
        keyStore, // optional if not signing transactions
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
        headers: {}
    }

    const near = await connect(config)
    const wallet = new WalletConnection(near, null)

    return { near, wallet }
}
