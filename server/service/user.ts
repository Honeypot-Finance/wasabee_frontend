import { pg } from "@/lib/db"

export const userService = {
    async getUser  (data: {
        provider: string,
    }) {
        console.log('data.provider', data.provider)
        const res = await pg`SELECT * FROM fto_project WHERE provider = ${data.provider}`
        return res?.[0]
    }
}