const mongoose = require("mongoose");
const Note = require("../models/note");
const noteController = {
  createNote: async (req, res) => {
    try {
      const newNote = new Note({
        _idFolder: req.body._idFolder,
        _idUser: req.body._idUser,
        title: req.body.title,
        content: req.body.content,
        pin: false,
      });
      await newNote.save();
      return res.status(200).json("Add was successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  readNote: async (req, res) => {
    try {
      const note = await Note.find({ _idFolder: req.params.id });
      if (!note) {
        return res.status(500).json("Can't find this folder");
      }
      return res.status(200).json(note);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateNote: async (req, res) => {
    try {
      const note = await Note.updateOne(
        { _id: req.body._id }, //condition
        { title: req.body.title, content: req.body.content, pin: req.body.pin } //value need to update
      );
      if (!note) return res.status(401).json("Cant update your value!");
      return res.status(200).json("Updated was successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Note.findByIdAndDelete({ _id: req.params.id });
      return res.status(200).json("Deleted was successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = noteController;
