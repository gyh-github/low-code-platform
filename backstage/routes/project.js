var express = require('express');
var router = express.Router();
const controller = require('./../controllers/projectController');

/*获取所有 */
router.get('/all', controller.all);
/*新增 */
router.post('/add', controller.add);
/*修改 */
router.post('/edit', controller.edit);
/*删除 */
router.post('/del', controller.del);
/*详情 */
router.post('/infoById', controller.infoById);
module.exports = router;
