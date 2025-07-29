import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: Number,
  class: String,
  addedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}

});

export default mongoose.model('Student', studentSchema);
