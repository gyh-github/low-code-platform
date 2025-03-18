const service = require('./../services/projectService');

//获取所有项目
const all = async (req, res) => {
    try {
        const resService = await service.all();
        res.send({
            code: 'T0000',
            msg: '查询成功！',
            data: resService
        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '查询失败!' });
    }
}
//根据id获取数据
const infoById = async (req, res) => {
    try {
        const { id } = req.query;
        const resService = await service.infoById(id);
        res.send({
            code: 'T0000',
            msg: '查询成功！',
            data: resService?.[0]
        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '查询失败!' });
    }
}
//新增
const add = async (req, res) => {
    try {
        const params = req.body;
        await service.add(Object.values(params));
        res.status(200).json({
            code: 'T0000',
            msg: '新增成功！',
            data: true

        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '添加失败!' });
    }
};
//修改
const edit = async (req, res) => {
    try {
        const params = req.body;
        await service.edit(params);
        res.status(200).json({
            code: 'T0000',
            msg: '修改成功！',
            data: true

        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '修改失败!' });
    }
};
//删除
const del = async (req, res) => {
    try {
        const params = req.body;
        await service.del(params);
        res.status(200).json({
            code: 'T0000',
            msg: '删除成功！',
            data: true

        });
    } catch (error) {
        res.status(500).json({ code: 'T0001', msg: '修改失败!' });
    }
};

module.exports = {
    all, add, edit, infoById, del
};