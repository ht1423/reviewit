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

        const publicIdentifier = crypto.randomBytes(16).toString('hex');

        const publicURL = `http://localhost:3001/api/workspace/get/${publicIdentifier}`;

        const embedCode = `<iframe src="${publicURL}" width="600" height="400" frameborder="0"></iframe>`;

        const workspace = await Workspace.create({
            userId,
            name,
            description,
            publicIdentifier,
            embedCode,
        });

        await User.findByIdAndUpdate(userId, {
            $push: {
                workspaces: workspace._id,
            },
        });

        return res.status(201).json({
            msg: 'Workspace created successfully',
            publicURL,
        });
    } catch (err) {
        console.error('create workspace error', err);

        return res.status(500).json({
            msg: 'Server error. please try again later',
        });
    }
};

const getWorkspace = async (req, res) => {
    const publicIdentifier = req.params.publicIdentifier;

    try {
        const workspace = await Workspace.findOne({ publicIdentifier });

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
            msg: 'server error. please try again later',
        });
    }
};

export { createWorkspace, getWorkspace };
