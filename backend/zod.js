import { z } from 'zod';

const zodSignin = z
    .object({
        email: z.string().email('invalid email format'),
        password: z
            .string()
            .min(8, 'password must be at least 8 characters long')
            .max(128, 'password must be at most 128 characters long'),
    })
    .strict();

const zodSignup = zodSignin
    .extend({
        name: z
            .string()
            .min(1, 'name must be at least 1 character long')
            .max(100, 'name must be at most 100 characters long'),
    })
    .strict();

const zodWorkspace = z
    .object({
        name: z
            .string()
            .min(1, 'name must be at least 1 character long')
            .max(100, 'name must be at most 100 characters long'),
        description: z
            .string()
            .max(1000, 'description must be at most 1000 characters long')
            .optional(),
    })
    .strict();

const zodTestimonial = z
    .object({
        type: z.enum(['text', 'image', 'video']),
        content: z
            .string()
            .min(1, 'content must be at least 1 character long')
            .max(1000, 'content must be at most 1000 characters long'),
        rating: z.enum(['1', '2', '3', '4', '5']),
    })
    .strict();

export { zodSignin, zodSignup, zodWorkspace, zodTestimonial };
