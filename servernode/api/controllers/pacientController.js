var mongoose = require("mongoose"),
  Entry = mongoose.model("Entry");
    
exports.read_entries = async (req, res) => {
  ret = await Entry.find();
  res.json(ret);
};

exports.create_entry = async (req, res) => {
  const new_entry = new Entry(req.query);
  ret = await new_entry.save();
  res.json(ret);
};

exports.read_entry = async (req, res) => {
  ret = await Entry.findById(req.params.entryId);
  res.send(ret);
};

exports.update_entry = async (req, res) => {
  ret = await Entry.findByIdAndUpdate({ _id: req.params.entryId }, req.body, {
    new: true
  });
  res.json(ret);
};

exports.delete_entry = async (req, res) => {
  await Entry.deleteOne({ _id: req.params.entryId });
  res.json({ message: "Entry deleted" });
};