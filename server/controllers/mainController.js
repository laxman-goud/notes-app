//  get home page
exports.homePage = async (req, res) => {
    const locals = {
        title: 'NodeNote - Your Personal Cloud-Based Notes App',
        description: 'Free NodeJs Notes App'
    }
    res.render('index', {
        ...locals,
        layout: 'layouts/front-page',
        path: '/'
    })
}

//  get about page
exports.about = async (req, res) => {
    const locals = {
        title: 'About - NodeNote',
        description: 'Free NodeJs Notes App'
    }
    res.render('about', {
        locals,
        path: '/about'
    })
}

//  get features page
exports.features = async (req, res) => {
    const locals = {
        title: 'Features - NodeNote',
        description: 'Free NodeJs Notes App'
    }
    res.render('features', {
        locals,
        path: '/features'
    })
}

//  get faqs page
exports.faqs = async (req, res) => {
    const locals = {
        title: 'FAQs - NodeNote',
        description: 'Free NodeJs Notes App'
    }
    res.render('faqs', {
        locals,
        path: '/faqs'
    })
}
