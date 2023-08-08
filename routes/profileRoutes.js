const Router = require('express');
const router = new Router();

const profileController = require('../controllers/profileController.js');

router.get('/getProfile', profileController.getProfile); 
router.post('/updateProfile', profileController.updateProfile);
router.get('/getComments', profileController.getComments);
router.post('/addComment', profileController.addComment);
router.post('/deleteComment', profileController.deleteComment);

module.exports = router;
