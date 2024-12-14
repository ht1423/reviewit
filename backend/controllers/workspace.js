import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import zodWorkspace from '../zod/workspace.js';
import crypto from 'crypto';

const createWorkspace = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.userId;

    try {
        const check = zodWorkspace.safeParse(req.body);

        if (!check.success) {
            return res.status(400).json({
                error: check.error.format(),
            });
        }

        const slug = name.toLowerCase().replace(/\s+/g, '-');

        const publicURL = `${slug}-${crypto.randomBytes(5).toString('hex')}`;

        const embedCode = `<iframe src="${publicURL}" width="600" height="400" frameborder="0"></iframe>`;

        const workspace = await Workspace.create({
            userId,
            name,
            description,
            publicURL,
            embedCode,
        });

        await User.findByIdAndUpdate(userId, {
            $push: {
                workspaces: workspace._id,
            },
        });

        return res.status(201).json({
            msg: 'workspace created successfully',
            workspace,
        });
    } catch (err) {
        console.error('workspace error', err);

        return res.status(500).json({
            msg: 'create server error. please try again later',
        });
    }
};

const getWorkspace = async (req, res) => {
    const publicURL = req.params.publicURL;

    try {
        const workspace = await Workspace.findOne({ publicURL });

        if (!workspace) {
            return res.status(404).json({
                msg: 'Workspace not found',
            });
        }

        return res.json({
            workspace,
        });
    } catch (err) {
        console.error('get workspace error', err);

        return res.status(500).json({
            msg: 'Server error. please try again later',
        });
    }
};

export { createWorkspace, getWorkspace };
