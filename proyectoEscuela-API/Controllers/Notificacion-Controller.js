exports.pruebaPrincipal = function (request , response){ 
    console.log('Hola mundo desde nodejs');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Hola Mundo");
}

exports.riverPlate = function (request , response){ 
    console.log('MAÑANA ES LA FINAL DEL MUNDO');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("VAMOS MILLONARIO!");
}