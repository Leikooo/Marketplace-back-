const Router = require('express');
const router = new Router();
const userRouter = require('./userRoutes');
const itemRouter = require('./itemRoutes');
const profileRouter = require('./profileRoutes');
const ctgRouter = require('./ctgRoutes');

router.use('/user', userRouter);
router.use('/item', itemRouter);
router.use('/profile', profileRouter);
router.use('/ctg', ctgRouter);

module.exports = router;
