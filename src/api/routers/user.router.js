const router = require('express').Router();

const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/', userController.getAll);

router.use(authMiddleware.authenticate);

router.get('/profile', userController.profile);
router.put('/', userController.update);

module.exports = router;
