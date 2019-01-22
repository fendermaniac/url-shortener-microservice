import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import shortid from 'shortid';

export const UrlSchema = new Schema({
  short_url: {
    'type': String,
    'default': shortid.generate
  },
  original_url: String,
});