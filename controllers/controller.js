import mongoose from 'mongoose';
import { UrlSchema } from '../models/model';
import dns from 'dns';

const Url = mongoose.model('Url', UrlSchema);

export const addShortcut = (req,res) => {
  let domain = req.body.url;
  dns.lookup(domain, (err) => {
    if (err) {
      res.json({"error": "invalid URL!"})
    }
    let newUrl = new Url(req.body);
      newUrl.save((err, url) => {
        if (err) {
          res.send(err);
        }
        res.json(url);
      }); 
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