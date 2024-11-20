const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// 配置Multer的存储引擎
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });
// 创建文件上传的路由
router.post('/file', upload.single('file'), (req, res) => {
    res.send({
        code: 'T0001',
        msg: '文件上传成功',
        data: 'http://' + req.rawHeaders[1] + '/uploads/' + req.file.filename
    });
});


module.exports = router;