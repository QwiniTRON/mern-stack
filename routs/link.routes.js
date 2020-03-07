const { Router } = require("express");
const router = Router();
const Link = require("../models/Link");
const authM = require("../middleware/auth.middleware");
const config = require("config");
const shortId=  require("shortid");

router.post( "/generate", authM, async (req, res) => {
    try {
        const baseUrl = config.get("baseUrl");
        const {from} = req.body;
        const code = shortId.generate();

        const findedLink = await Link.findOne( {from} );

        if(findedLink){
            return res.json( {link: findedLink} );
        }

        const to = baseUrl + "/t/" + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json( {link} );


    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' + e})
    }
} );

router.get( "/", authM, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId});
        res.json(links);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
} );

router.get( "/:id", authM, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' +  e.message})
    }
} );

module.exports = router;




