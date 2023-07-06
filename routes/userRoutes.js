const Router = require('express');
const router = new Router();

const userController = require('../controllers/userController.js');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/check', userController.check);
router.get('/logout', userController.logout);
router.get('/getUser', userController.getUser);
router.get('/getUsers', userController.getUsers);
router.get('/getUsersByRole', userController.getUsersByRole);
router.get('/getUsersByStatus', userController.getUsersByStatus);

module.exports = router;
