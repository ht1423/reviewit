import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxLength: 100,
            minLength: 1,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 128,
        },

        workspaces: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Workspace',
            },
        ],

        testimonials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Testimonial',
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);
