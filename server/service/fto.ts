import { pg } from "@/lib/db"

export const ftoService = {
    createFtoProject: async (data: {
        pair: string,
        account: string
    }) => {
       await pg`INSERT INTO fto_project ${pg(data)}`
    },
    getFtoProjectsByAccount: async (account: string) => {
        return pg`SELECT * FROM fto_project WHERE account = ${account} order by id desc`
    }
}  