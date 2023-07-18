const router = require('express').Router();
let tailoringInfo_Schema = require('../models/tailoringInfo');

router.route('/addtailoringInfo').post((req, res) => {
    const { code, style, category, season, size, color, neckSize, chest, west, shoulder, length, stomach, shoulderLength, picture } = req.body;
    const tailoringInfo = new tailoringInfo_Schema({ code, style, category, season, size, color, neckSize, chest, west, shoulder, length, stomach, shoulderLength, picture });
    tailoringInfo.save()
        .then(() => res.json('Measurement Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//insert
router.route("/updatetailoringInfo/").put(async (req, res) => {
    const { code, style, category, season, size, color, neckSize, chest, west, shoulder, length, stomach, shoulderLength, picture } = req.body;

    const tailoringInfo = {
        code, style, category, season, size, color, neckSize, chest, west, shoulder, length, stomach, shoulderLength, picture
    }
    const update = await tailoringInfo_Schema.findOneAndUpdate({ code: code }, tailoringInfo).then(() => {
        res.status(200).send({ status: "Measurement Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletetailoringInfo/:code").delete(async (req, res) => {
    let code = req.params.code;
    tailoringInfo_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "Measurement Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/alltailoringInfo").get(async (req, res) => {
    tailoringInfo_Schema.find()
        .then(tailoringInfo => res.json(tailoringInfo))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;