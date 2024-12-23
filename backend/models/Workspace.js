import mongoose from 'mongoose';

const WorkspaceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        name: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 100,
            trim: true,
        },

        description: {
            type: String,
            minLength: 1,
            maxLength: 1000,
            trim: true,
        },

        testimonials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Testimonial',
            },
        ],

        publicURL: {
            type: String,
            required: true,
            unique: true,
        },

        embedCode: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Workspace', WorkspaceSchema);
