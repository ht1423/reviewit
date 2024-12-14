import z from 'zod';

const zodTestimonial = z
    .object({
        type: z.enum(['text', 'image', 'video'], {
            message: 'type must be one of: text, image or video',
        }),
        content: z
            .string()
            .min(1, 'content must be at least 1 character long')
            .max(5000, 'content must not exceed 5000 characters'),
        rating: z.enum(['1', '2', '3', '4', '5'], {
            message: 'rating must be a value between 1 to 5',
        }),
    })
    .strict();

export default zodTestimonial;
