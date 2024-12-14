import z from 'zod';

const zodWorkspace = z
    .object({
        name: z
            .string()
            .min(1, 'name must contain at least 1 character')
            .max(100, 'name must not exceed 100 characters'),
        description: z
            .string()
            .max(1000, 'description must not exceed 1000 characters'),
    })
    .strict();

export default zodWorkspace;
