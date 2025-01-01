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
            trim: true,
            minLength: 1,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxLength: 1000,
        },

        testimonials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Testimonial',
            },
        ],

        publicIdentifier: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        embedCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Workspace', WorkspaceSchema);
