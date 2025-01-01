import Testimonial from '../models/Testimonial.js';
import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import { zodTestimonial } from '../zod.js';

const createTestimonial = async (req, res) => {
    const { type, content, rating } = req.body;
    const userId = req.user.userId;
    const workspaceId = req.params.workspaceId;

    try {
        const check = zodTestimonial.safeParse(req.body);

        if (!check.success) {
            return res.status(400).json({
                error: check.error.format(),
            });
        }

        const testimonial = await Testimonial.create({
            userId,
            workspaceId,
            type,
            content,
            rating,
        });

        await User.findByIdAndUpdate(userId, {
            $push: {
                testimonials: testimonial._id,
            },
        });

        await Workspace.findByIdAndUpdate(workspaceId, {
            $push: {
                testimonials: testimonial._id,
            },
        });

        return res.status(201).json({
            msg: 'Testimonial created successfully',
            testimonial,
        });
    } catch (err) {
        console.error('create testimonial error', err);

        return res.status(500).json({
            msg: 'Server error. please try again later',
        });
    }
};

export default createTestimonial;
