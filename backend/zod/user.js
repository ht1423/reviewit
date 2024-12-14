import z from 'zod';

const zodSignin = z
    .object({
        email: z.string().email('Invalid email format'),
        password: z
            .string()
            .min(8, 'password must be at least 8 characters long')
            .max(128, 'password must not exceed 128 characters'),
    })
    .strict();

const zodSignup = zodSignin
    .extend({
        name: z
            .string()
            .min(1, 'name must contain at least 1 character')
            .max(100, 'name must not exceed 100 characters'),
    })
    .strict();

export { zodSignin, zodSignup };
