import * as z from 'zod'

export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  password: z.string().min(6, {
    message: 'Password is too short',
  }),
  username: z.string().min(1, {
    message: 'Username is required',
  }),
})
