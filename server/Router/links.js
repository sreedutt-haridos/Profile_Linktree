const router = require("express").Router();
const Link = require("../Models/Link");

// GET user's links
router.get("/:uname", async (req, res) => {
    try {
        const userLink = await Link.findOne({ username: req.params.uname });
        res.status(200).json(userLink);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE or UPDATE user's links
router.put("/", async (req, res) => {
    try {
        const existLink = await Link.findOne({ username: req.body.username });
        
        console.log(req.body.username, req.body.links);
        
        if (!existLink) {
            try {
                const newLink = new Link({
                    username: req.body.username,
                    links: req.body.links,
                });

                const user = await newLink.save();
                console.log(user);
                res.status(200).json(user);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            if (req.body.links.length) {
                existLink.links = req.body.links;
                const user = await existLink.save();
                res.status(200).json(user);
            } else {
                res.status(200).json(existLink);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE user's links
router.delete("/:uname", async (req, res) => {
    try {
        const deletedLink = await Link.findOneAndDelete({ username: req.params.uname });
        if (deletedLink) {
            res.status(200).json({ message: "Link deleted successfully" });
        } else {
            res.status(404).json({ message: "Link not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
