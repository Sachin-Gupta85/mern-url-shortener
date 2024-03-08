const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    target: { type: String, required: true, trim: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

urlSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Url", urlSchema);
