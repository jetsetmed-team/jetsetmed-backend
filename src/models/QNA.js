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

const qnaItemSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
}, { _id: false });

const qnaSchema = new Schema({
  qna: {
    type: [qnaItemSchema],
    required: true,
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
