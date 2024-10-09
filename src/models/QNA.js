// qna { q: a }
// userid
// created
// updated
// pdf upload
// isActive

// get/:id, getall private only admin access
// put only user access
// admin can delete

// QNA model

const { Schema, model } = require("mongoose");

const qnaSchema = new Schema({
  qna: {
    type: Array,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  pdfPath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before each save
qnaSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model("QNA", qnaSchema);
