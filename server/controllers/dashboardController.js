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
            {
                $sort: {
                    updatedAt: -1
                }
            },
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
        console.error(error);
        res.status(500).send('Server Error');
    }
};


/**
 * get
 * view specific note
 */

exports.dashboardViewNote = async(req, res) => {
    const note = await Note.findById(req.params.id)
    .where({ user: req.user.id }).lean();

    if(note){
        res.render('dashboard/view-note', {
            noteID: req.params.id,
            note,
            layout: 'layouts/dashboard'
        })
    }
    else{
        res.send("Something went wrong.")
    }
}

/**
 * put /
 * update specific note
 */

exports.dashboardUpdateNote = async(req, res) => {
    try {
        await Note.findByIdAndUpdate(
            {_id: req.params.id},
            {title: req.body.title, body: req.body.body, updatedAt: Date.now()}
        ).where({ user: req.user.id})

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}


/**
 * DELETE/
 * delete a note
 */
exports.dashboardDeleteNote = async(req, res) =>{
    try {
        await Note.deleteOne({_id: req.params.id}).where({user: req.user.id});
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        
    }
}

/**
 * GET /
 *  Add Notes
 */
exports.dashboardAddNote = async(req, res) =>{
    res.render('dashboard/add', {
        layout: 'layouts/dashboard'
    });
}

/**
 * POST/
 *  Add Notes
 */
exports.dashboardAddNoteSubmit = async(req, res) => {
    try {
        req.body.user = req.user.id;
        await Note.create(req.body);
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET/
 *  Search
 */
exports.dashboardSearch = async(req, res) => {
    try {
        res.render('dashboard/search', {
            layout: 'layouts/search'
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * POST/
 *  Search
 */
exports.dashboardSearchSubmit = async(req, res) => {
    try {
        
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const searchResults = await Note.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecialChars, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialChars, 'i')}}
            ]
        }).where({user: req.user.id});

        res.render('dashboard/search', {
            searchResults,
            layout: 'layouts/dashboard'
        })

    } catch (error) {
        console.log(error)
    }
}