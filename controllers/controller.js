import mongoose from 'mongoose';
import { UrlSchema } from '../models/model';
import dns from 'dns';

const Url = mongoose.model('Url', UrlSchema);

export const addShortcut = (req,res) => {

  let newUrl = new Url(req.body);
  const rawDomain = req.body.original_url
  const cleanDomain = rawDomain.replace(/^(https?:|)\/\//, "");

  dns.lookup(cleanDomain, (err, address, family) => {
    if(address && rawDomain.includes('http')) {
      newUrl.save().then( () => res.json(newUrl) );
    } else {
    res.json({'error': "invalid URL."})
    }    
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
  .select({ "original_url": 1, "short_url": 1, "_id": 0});
};

export const getUrlWithId = (req,res) => {
  Url.findOne({short_url: req.params.shortcut}, (err, url) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect(url.original_url);
    }
  }); 
};