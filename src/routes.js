const express = require('express'); // import module express

const router = express.Router(); 
router.get('/', function (req, res) {
    res.render("trangchu");
});

// export router
module.exports = router;