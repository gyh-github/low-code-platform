var express = require('express');
var router = express.Router();
const fs = require('node:fs');
const { exec } = require('child_process');

router.post('/dataProcessing', function (req, res) {
    const body = req.body;
    console.log(body, 'vvvvvvv');
    res.send(JSON.stringify({ code: '1231' }));
    fs.writeFile('../front/src/generate-data.json', JSON.stringify(body), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('success!!!')
        }
    })
});

router.get('/generate', (req, res) => {
    const child = exec('npm run build:generate', {
        cwd: '../front'
    });
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
