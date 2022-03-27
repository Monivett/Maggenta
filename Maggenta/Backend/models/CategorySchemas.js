const mongoose = require('mongoose');

const CategorySchemas = new mongoose.Schema({

    Category: [
        {
            type: String,
            required: true
        }
    ]
});

const Categories = mongoose.model("Categoria", CategorySchemas);
module.exports = Categories;