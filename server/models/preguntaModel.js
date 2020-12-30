const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

/* let rolesValidos = {
    values: ['ADMIN_ROLE', 'SUPER_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}
 */

let preguntaSchema = new Schema({
    pregunta: { type: String, unique: true, required: [true, 'La pregunta es requerida'] },
    respuesta1: { type: String, required: true, required: [true, 'La pregunta 1 es requerida'] },
    respuesta2: { type: String, required: true, required: [true, 'La pregunta 2 es requerida'] },
    respuesta3: { type: String, required: false },
    respuesta4: { type: String, required: false },
    imagen: { type: String, required: false },
    tema: { type: Schema.ObjectId, ref: 'Tema', requiered: true }
});

preguntaSchema.methods.toJSON = function() {
    let pregunta = this;
    let preguntaObject = pregunta.toObject();
    // delete categoriaObject.password;
    return preguntaObject;
}

//materiaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Pregunta', preguntaSchema);