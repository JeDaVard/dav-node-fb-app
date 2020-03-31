const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
   googleId: String,
   surveys: [{ type: Schema.Types.ObjectId, default: null }],
   credits: {
      type: Number,
      default: 0
   }
});

mongoose.model('users', userSchema);