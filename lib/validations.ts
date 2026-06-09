import { z } from 'zod'

export const contactMessageSchema = z.object({
  name: z.string().min(3).max(50),
  subject: z.string().min(3).max(50),
  email: z.string().email(),
  content: z.string().min(3).max(300),
})

export type ContactMessage = z.infer<typeof contactMessageSchema>

export const validateMessage = (message: ContactMessage) =>
  contactMessageSchema.safeParse(message)
