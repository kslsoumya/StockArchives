const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let stockSchema = new Schema({

  date: {
    type: Date,
    default: ''
  },
  symbol: {
    type: String,
    default: ''
  },
  open: {
    type: Number,
    default: ''
  },
  close :{
    type: Number,
    default: ''
  },
  low :{
    type: Number,
    default: ''
  },
  high : {
    type: Number,
    default: ''
  }
})
    
  mongoose.model('Stocks',stockSchema,'stocks');