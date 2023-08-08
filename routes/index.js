const Router = require('express');
const router = new Router();
const userRouter = require('./userRoutes');
const itemRouter = require('./itemRoutes');
const profileRouter = require('./profileRoutes');
const ctgRouter = require('./ctgRoutes');
const userController = require('../controllers/userController.js');

router.use('/user', userRouter);
router.use('/item', itemRouter);
router.use('/profile', profileRouter);
router.use('/ctg', ctgRouter);

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/auth', userController.check);
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activate);


module.exports = router;
