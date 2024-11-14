var express = require('express');
var router = express.Router();
const fs = require('node:fs');
const { exec } = require('child_process');

router.post('/dataProcessing', function (req, res) {
    const body = req.body;
    fs.writeFile('../front/src/generate-data.json', JSON.stringify(body), (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send(JSON.stringify({ code: 'T0001' }));
            console.log('success!!!')
        }
    })
});

router.get('/generate', (req, res) => {
    const child = exec('npm run build:generate', {
        cwd: '../front'
    });
    console.log(req, res, child)
    child.stdout.on('data', (data) => {
        console.log(`stdout:${data}`)
    });
    child.stderr.on('data', (data) => {
        console.log(`stderr;${data}`)
    });
    child.on('close', (code) => {
        console.log(`子进程退出，退出码${code}`)
    })

});


module.exports = router;
