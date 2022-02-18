// 이 파일을 라우터로 사용할 것 이기에 아래 두개를 불러와준다.
const express = require('express');
const router = express.Router();

// 데이터베이스 접속을 위해 maria.js를 불러온다
const maria = require('../../maria');

// /join 으로 get 접속하면 views/sign/join.pug 를 렌더링해준다.
// join.pug 는 추후 접속한다.
router.get('/', function(req, res, next) {
    maria.query('SELECT * FROM board',function(err, results, fields){
        res.render('board/boardList',{data : results});
        console.log(results);;
    })
});

router.get('/new', function(req, res, next) {
    res.render('board/boardNew');
});

router.post('/new', function(req, res){
    maria.query('SELECT * FROM board',function(err, results, fields){
        var length = results.length;
        if(length==0 || length==null){
            var num = 1;
        }else{
            var num = results[length-1].boardNum+1;
        }
        const Title = req.body.title;
        const Writer = req.body.writer;
        const Content = req.body.content;
        maria.query('INSERT INTO board (boardNum,Title,Writer,Content,WriterDate) VALUES(?,?,?,?,now())',[num,Title,Writer,Content]);
    });
});

router.get('/show/:id',function(req,res){
    const num = req.params.id;
    maria.query('SELECT * FROM board WHERE boardNum = ?',num,function(err,results){
        console.log(results);
        res.render('board/boardShow',{data:results});
    });
});

router.get('/edit/:id',function(req,res){
    const num = req.params.id;
    maria.query('SELECT * FROM board WHERE boardNum = ?',num,function(err,results){
        console.log(results);
        res.render('board/boardEdit',{data:results});
    });
});

router.post('/update', function(req, res){
        const boardNum = req.body.boardNum;
        const Title = req.body.title;
        const Writer = req.body.writer;
        const Content = req.body.content;
        maria.query('UPDATE board SET Title = ?, Writer = ?, Content = ?, WriterDate = now() WHERE boardNum = ? ',[Title,Writer,Content,boardNum]);
});

router.post('/delete', function(req, res){
    const num = req.body.id;
    maria.query('DELETE FROM board WHERE boardNum = ?',num);
});

module.exports = router;