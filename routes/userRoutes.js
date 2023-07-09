const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const userController = require('../controllers/userController.js');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/getUser', userController.getUser);
router.get('/getUsers', userController.getUsers);
router.post('/updateUser', roleMiddleware("ADMIN"), userController.updateUser);
router.post('/banUser', roleMiddleware("ADMIN"), userController.banUser);

module.exports = router;
