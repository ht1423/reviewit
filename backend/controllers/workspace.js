import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import { zodWorkspace } from '../zod.js';
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

        const publicIdentifier = crypto.randomUUID()

        const publicURL = publicIdentifier

        const URL = `https://localhost:3001/api/workspace/${publicIdentifier}`

        const embedCode = `<iframe src="${URL}" width="100%" height="500px" frameborder="0"></iframe>`;

        const workspace = await Workspace.create({
            userId,
            name,
            description,
            publicURL,
            embedCode
        });

        await User.findByIdAndUpdate(userId, {
            $push: {
                workspaces: workspace._id,
            },
        });

        return res.status(201).json({
            msg: 'Workspace created successfully',
            workspace,
            publicURL,
            embedCode,
        });
    } catch (err) {
        console.error('create workspace error', err);

        return res.status(500).json({
            msg: 'Server error',
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
            msg: 'Server error',
        });
    }
};

export { createWorkspace, getWorkspace };
