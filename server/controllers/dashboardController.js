const Note = require('../models/Notes');
const mongoose = require('mongoose');

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res) => {
    const perPage = 12;
    const page = parseInt(req.query.page) || 1;

    const locals = {
        title: 'Dashboard',
        description: 'Free NodeJs Notes App'
    };

    try {
        const notes = await Note.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            { $sort: { updatedAt: -1 } },
            {
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 60] }
                }
            }
        ])
            .skip(perPage * (page - 1))
            .limit(perPage);

        const count = await Note.countDocuments({ user: req.user.id });

        res.render('dashboard/index', {
            userName: req.user.firstName,
            ...locals,
            notes,
            layout: 'layouts/dashboard',
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Dashboard Load Failed',
            errorMessage: 'We encountered a problem while loading your dashboard. Please try again later.'
        });
    }
};

/**
 * GET
 * View specific note
 */
exports.dashboardViewNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
            .where({ user: req.user.id })
            .lean();

        if (note) {
            res.render('dashboard/view-note', {
                noteID: req.params.id,
                note,
                layout: 'layouts/dashboard'
            });
        } else {
            res.status(404).render('error', {
                errorTitle: 'Note Not Found',
                errorMessage: 'The note you are looking for does not exist.'
            });
        }
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Error Fetching Note',
            errorMessage: 'There was a problem retrieving the note.'
        });
    }
};

/**
 * PUT /
 * Update specific note
 */
exports.dashboardUpdateNote = async (req, res) => {
    try {
        await Note.findByIdAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,
                body: req.body.body,
                updatedAt: Date.now()
            }
        ).where({ user: req.user.id });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Update Failed',
            errorMessage: 'We couldn’t update the note. Please try again later.'
        });
    }
};

/**
 * DELETE /
 * Delete a note
 */
exports.dashboardDeleteNote = async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Deletion Failed',
            errorMessage: 'We were unable to delete the note.'
        });
    }
};

/**
 * GET /
 * Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
    try {
        res.render('dashboard/add', {
            layout: 'layouts/dashboard'
        });
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Error',
            errorMessage: 'Failed to load the note creation page.'
        });
    }
};

/**
 * POST /
 * Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Note.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Note Creation Failed',
            errorMessage: 'We couldn’t save your note. Please try again.'
        });
    }
};

/**
 * GET /
 * Search Page
 */
exports.dashboardSearch = async (req, res) => {
    try {
        res.render('dashboard/search', {
            layout: 'layouts/search'
        });
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Search Page Error',
            errorMessage: 'Could not load the search page.'
        });
    }
};

/**
 * POST /
 * Search Notes
 */
exports.dashboardSearchSubmit = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

        const searchResults = await Note.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChars, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChars, 'i') } }
            ]
        }).where({ user: req.user.id });

        res.render('dashboard/search', {
            searchResults,
            layout: 'layouts/dashboard'
        });
    } catch (error) {
        res.status(500).render('error', {
            errorTitle: 'Search Failed',
            errorMessage: 'We encountered an issue while performing your search. Please try again later.'
        });
    }
};
