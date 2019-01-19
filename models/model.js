import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UrlSchema = new Schema({
  original_url: String,
  short_url: String
}, {timestamps: true});