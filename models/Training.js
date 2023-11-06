const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

TrainingSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

TrainingSchema.pre('findOneAndUpdate', function (next) {
  const updateData = this.getUpdate();

  if (updateData.name) {
    this.findOneAndUpdate(
      {},
      {
        $set: { slug: slugify(updateData.name, { lower: true, strict: true }) },
      }
    );
  }
  next();
});

const Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;
