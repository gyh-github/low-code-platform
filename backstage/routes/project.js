var express = require('express');
var router = express.Router();
const controller = require('./../controllers/projectController');

/*获取所有 */
router.get('/all', controller.all);
/*获取热门项目数据 */
router.get('/popular', controller.popular);
/*获取私有项目数据带分页 */
router.post('/privatePage', controller.privatePage);
/*新增 */
router.post('/add', controller.add);
/*修改 */
router.post('/edit', controller.edit);
/*删除 */
router.post('/del', controller.del);
/*详情 */
router.post('/infoById', controller.infoById);
module.exports = router;
