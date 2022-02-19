import * as nearAPI from "near-api-js"

export default function useContract(account, contractDetails) {
    const { Contract } = nearAPI

    const contract = new Contract(account, "antariksh_v.testnet", contractDetails)

    return { contract }
}
