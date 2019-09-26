const express = require('express');
const router = express.Router();
// const addPage = require('../views/addPage')
const { Page } = require("../models");
const { addPage } = require("../views");
const { wikiPage } = require("../views")
const { main } = require('../views');

console.log(Page)

router.get('/', async (req, res, next) => {
    const allPages = await Page.findAll();
    console.log(allPages)

    res.send(main(allPages))
    
});

router.get('/add', (req, res, next) => {
    res.send(addPage())
});

router.get('/:slug', async (req, res, next) => {
    try {
    const page = await Page.findOne({
        where: {
            slug: req.params.slug
        }
    });
    res.send(wikiPage(page))
    } catch(error) {
        next(error)
    }
    
});

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title,
        content: req.body.content
      });
    
      
      try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
        console.log(page)
      } catch (error) { next(error) }

});






module.exports = router