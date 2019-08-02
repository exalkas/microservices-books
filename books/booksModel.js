const mongoose = require('mongoose');

mongoose.model("Book", {
   title: {
       type: String,
       require: true
   },
   author: {
       type: String,
       require: true
   },
   numOfPages: {
       type: Number,
       require: false
   },
   publisher: {
       type: String,
       require: false
   }
});

module.exports = Book = mongoose.model('Book');