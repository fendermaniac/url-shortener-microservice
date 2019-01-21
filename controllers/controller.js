import mongoose from 'mongoose';
import { UrlSchema } from '../models/model';
import urlExists from 'url-exists';

const Url = mongoose.model('Url', UrlSchema);

export const addShortcut = (req,res) => {
  let newUrl = new Url(req.body);
  newUrl.save().then( () => res.json(newUrl) );
};

export const getUrls = (req,res) => {
  Url
  .find({}, (err, url) => {
    if (err) {
      res.send(err);
    }
    res.json(url);
  })
  .select({ "original_url": 1, "short_url": 1, "_id": 0});
};

export const getUrlWithId = (req,res) => {
  Url.findOne({short_url: req.params.short_url}, (err, url) => {
    if (err) {
      res.send(err);
    }
    res.redirect(url.original_url);
  }); 
};