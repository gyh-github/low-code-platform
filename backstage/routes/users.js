var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController');

/*获取所有用户信息 */
router.get('/all', userController.getUsersAll);
/*新增用户信息 */
router.post('/add', userController.addUser);
// 登陆
router.post('/login', userController.login);
module.exports = router;
