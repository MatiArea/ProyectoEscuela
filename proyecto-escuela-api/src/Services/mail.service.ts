import { Injectable } from "@nestjs/common";
const nodemailer = require ('nodemailer');

@Injectable()
export class MailService{
    transporter: any;
    constructor() {
       this.transporter = nodemailer.createTransport(
            {
                host: 'smtp.zoho.com',
                port: 465,
                secure: true,
                auth:{
                    user: 'colegioUTNgrupo2@zoho.com',
                    pass: 'Diseno-2019',
                }
            }
        );
}

enviarCorreoNotificacion(destinatario,cuerpo){
    let opciones = {
        from: 'colegioUTNgrupo2@zoho.com',
        to: destinatario,
        subject: 'Aviso importante',
        html: '<h3>Estimados alumnos: </h3>'+'<br>'+'<p>'+ cuerpo +'.</p>',
    };
    this.transporter.sendMail(opciones);
}

enviarCorreoEvaluacionCreada(destinatario,fecha,titulo,materia){
    let opciones = {
        from: 'colegioUTNgrupo2@zoho.com',
        to: destinatario,
        subject: 'Evaluacion notificada',
        html: '<h3>Estimados alumnos: </h3>'+'<br>'+'<p>El dia '+fecha+' se tomara la evacuacion: '+titulo+' correspondiente a la materia: '+materia+'.</p>',
    };
    this.transporter.sendMail(opciones);
}

enviarCorreoNotaSubida(destinatario,titulo,fecha,materia){
    let opciones = {
        from: 'colegioUTNgrupo2@zoho.com',
        to: destinatario,
        subject: 'Carga de notas',
        html: '<h3>Estimado alumno: </h3>'+'<br>'+'<p>'+'Se han subido las notas correspondientes a la evaluacion '+titulo+' del dia '+fecha+', correspondiente a la asignatura '+materia+'.</p>',
    };
    this.transporter.sendMail(opciones);
}

enviarCorreoBoletinSubido(destinatario,trimestre){
    let opciones = {
    from: 'colegioUTNgrupo2@zoho.com',
    to: destinatario,
    subject: 'Boletin Digital',
    html: '<h3>Estimado alumno: </h3>'+'<br>'+'<p>'+'Se han subido al boletin digital las notas correspondientes a las asignaturas del '+trimestre+'° trimestre.'+'</p>',
};
this.transporter.sendMail(opciones);
}

}
