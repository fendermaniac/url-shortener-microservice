import mongoose from 'mongoose';
import { UrlSchema } from '../models/model';
import urlExists from 'url-exists';

const Url = mongoose.model('Url', UrlSchema);

export const addShortcut = (req,res) => {
  let urlToShorten = req.body.url;
  let shortcut;
  Url.find().exec((err, results) => {
    shortcut = results.length.toString();
  });


    let newUrl = new Url({
      original_url: urlToShorten,
      short_url: shortcut
    });
      newUrl.save((err, url) => {
        if (err) {
          res.send(err);
        }
        res.json({url});
      }); 
};

export const getUrls = (req,res) => {
  Url
  .find({}, (err, url) => {
    if (err) {
      res.send(err);
    }
    res.json(url);
  })
  .select({ "original_url": 1, "_id": 0});
};

export const getUrlWithId = (req,res) => {
  Url.findOne({_id: req.params.short_url}, (err, url) => {
    if (err) {
      res.send(err);
    }
    res.json(url);
  }); 
};