exports.bienvenido =function(req,res){
    console.log('Cliente conectado.');
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("                                  BIENVENIDO/A!!!");
};