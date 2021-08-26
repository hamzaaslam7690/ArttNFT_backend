const router = require("express").Router();
const {
    createSeedPhrase,verifySeed
} = require("../controllers/seedPhrase")
 const protect = require("../middleware/auth");
router.get('/',createSeedPhrase)
router.post('/verifySeed',protect,verifySeed)

module.exports = router;