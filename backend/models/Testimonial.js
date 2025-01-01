import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true,
        },

        type: {
            type: String,
            enum: ['text', 'image', 'video'],
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 1000,
        },

        rating: {
            type: String,
            enum: ['1', '2', '3', '4', '5'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Testimonial', TestimonialSchema);
