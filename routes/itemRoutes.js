const Router = require('express');
const router = new Router();

const itemController = require('../controllers/itemController.js');

router.get('/', itemController.getAll);
router.get('/:id', itemController.getOne);
router.post('/', itemController.create);
router.put('/', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;
