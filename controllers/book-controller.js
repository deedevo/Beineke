const bookModel = require('../models/book-model')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.author && !req.body.subtitle && !req.body.pages && !req.body.year && !req.body.publisher && !req.body.description) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const book = new bookModel({
        title: req.body.title,
        author: req.body.author,
        subtitle: req.body.subtitle,
        pages: req.body.pages,
        year: req.body.year,
        publisher: req.body.publisher,
        description: req.body.description,
    });

    await book.save().then(data => {
        /*res.send({
            message:"User created successfully!!",
            user:data
        });*/
        res.status(200).render('results', {mydata: "user "+ data.firstName +" created succesfully!"})
    }).catch(err => {
        /*res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });*/
        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const book = await bookModel.find();
        //res.status(200).json(user);
        res.status(200).render('results', {mydata: book})
    } catch(error) {
        res.status(404).render('results', {mydata: error.message})
        //res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const book = await bookModel.findOne({title: req.query.title}).exec(); //change params to query
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        if (book===null){
            res.status(404).render('results', {mydata: "user not found"
            })
        }else{
            res.status(200).render('results', {mydata: "user :"+ book.title +" "
                    + book.author +" "+ book.subtitle +" "+ book.pages + book.year + book.publisher + book.description
            })
        }

    } catch(error) {
        //res.status(404).json({ message: error.message});
        res.status(404).render('results', {mydata: error.message})
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {

    if (!req.body.newTitle || !req.body.newAuthor || !req.body.newSubtitle || !req.body.newPages || req.body.newYear || req.body.newPublisher || req.body.newDescription) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Data to update can not be empty!"})
        return
    }

    //const email = req.params.email;
    const query = req.body.oldTitle;

    //await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    await bookModel.findOneAndUpdate({title: query}, {title:req.body.newTitle,
        author:req.body.newAuthor,
        subtitle:req.body.newSubtitle,
        pages:req.body.newPages,
        year: req.body.newYear,
        publisher: req.body.newPublisher,
        description:req.body.newDescription
    }).then(data => {
        console.log(data)
        if (!data) {
            //res.status(404).send({message: `User not found.`});
            res.status(404).render('results', {mydata: `User not found.`})
        }else{
            //res.send({ message: "User updated successfully." })
            res.status(200).render('results', {mydata: "User updated successfully."})
        }
    }).catch(err => {
        //res.status(500).send({message: err.message});
        res.status(500).render('results', {mydata: err.message})
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {

    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    let bookTitle=req.body.title
    await bookModel.deleteOne({title: bookTitle}).then(data => {
        //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        //console.log(data)
        if (data.deletedCount===0) {
            //res.status(404).send({ message: `User not found.`});
            res.status(404).render('results', {mydata: "User not found"})

        } else {
            //res.send({message: "User deleted successfully!"});

            res.status(200).render('results', {mydata: "user "+bookTitle+" deleted succesfully!"})
        }
    }).catch(err => {
        //res.status(500).send({ message: err.message });
        res.status(500).render('results', {mydata: err.message})
    });
};