import { pg } from "@/lib/db"

export const ftoService = {
    createFtoProject: async (data: {
        pair: string,
        account: string,
        chain_id: number
    }) => {
       await pg`INSERT INTO fto_project ${pg(data)}`
    },
    getFtoProjectsByAccount: async ({
        account,
        chain_id
    }: {
        account: string
        chain_id: number
    }) => {
        return pg`SELECT * FROM fto_project WHERE account = ${account} and chain_id = ${chain_id} order by id desc`
    }
}  