const Router = require('express');
const router = new Router();

const roleMiddleware = require('../middleware/roleMiddleware');
const ctgController = require('../controllers/ctgController.js');

router.get('/', ctgController.getAll);
router.get('/:id', ctgController.getOne);
router.post('/create', roleMiddleware("ADMIN"), ctgController.create);
router.put('/update', roleMiddleware("ADMIN"), ctgController.update);
router.delete('/delete/:id', roleMiddleware("ADMIN"), ctgController.delete);


module.exports = router;
