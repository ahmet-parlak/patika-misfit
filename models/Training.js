const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: { type: Date, default: Date.now },
});

TrainingSchema.pre('findOneAndUpdate', function (next) {
  const updateData = this.getUpdate();

  if (updateData.name) {
    this.findOneAndUpdate(
      {},
      { $set: slugify(updateData.name, { lower: true, strict: true }) }
    );
  }
  next();
});

const Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;
