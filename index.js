var mysql     =    require('mysql');
var express   =    require("express");
var app       =    express();
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'Ikr21031994',
    database : 'php',
    debug    :  false
});

app.get("/*/:id",function(req,res){-
  pool.getConnection(function(err,connection){
      if (err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
      }
      var resource = req.path.split("/")[1];
      var id = req.path.split("/")[2];
      console.log(resource+ ":" + id +' connected as id ' + connection.threadId);
      connection.query("SELECT * FROM `"+resource+"` WHERE `"+resource+"_id`="+req.params.id,function(err,rows){
          connection.release();
          if(!err) {
              res.json(rows);
          }
      });
      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
      });
  });
});

app.get("*", function(req, res){
    res.json({"code" : 100, "status" : "Invalid resource"});
});


app.listen(3000);
