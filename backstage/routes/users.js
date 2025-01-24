var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController');

/*获取所有用户信息 */
router.get('/all', userController.getUsersAll);
/*新增用户信息 */
router.post('/add', userController.addUser);
/*修改用户信息 */
router.post('/edit', userController.editUser);
// 登陆
router.post('/login', userController.login);
// 通过token获取登录用户信息
router.get('/getUserByToken', userController.getUserByToken);
// 通过用户id获取登录用户信息
router.get('/getUserById', userController.getUserById);
// 校验原密码有效性
router.post('/checkPassword', userController.checkPassword);
module.exports = router;
