import z from "zod";
import { GenericError } from "../../../error";
import { ApiPostHandler } from "../../type";
import { RootApiTrackerSchema } from "../../schema";
import { getIpAddress } from "../utils/detect/getIpAddress";




const userInput = z.object({
    data: z.record(z.any()),
    id: z.string()
})
const userInputSchema = RootApiTrackerSchema.merge(z.object({ data: userInput }))
export type UserPostInput = z.infer<typeof userInputSchema>

export const userPost: ApiPostHandler<UserPostInput> = async (req, options) => {
    if (!req.body.userId) {
        req.body.userId = getIpAddress(req) as string
    }
    const body = userInputSchema.safeParse(req.body)
    const adapter = options.adapter
    if (body.success) {
        try {
            adapter.connect && await adapter.connect()
            const data = await adapter.tracker.updateUser(body.data.data, body.data.userId)
            adapter.disconnect && await adapter.disconnect()
            return {
                message: 'User updated',
                code: 200,
                data
            }
        } catch {
            throw new GenericError('Error updating user', { path: "/user" })
        }
    }
    throw new GenericError('Invalid request body', { path: "/user" })
}