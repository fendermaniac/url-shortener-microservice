import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UrlSchema = new Schema({
  original_url: {
    type: String
  }
  // ,
  // short_url: {
  //   type: Number,
  //   required: "URL Shortcut required"
  // }
});