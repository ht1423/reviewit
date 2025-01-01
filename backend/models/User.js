import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 100,
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
