const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

/* let rolesValidos = {
    values: ['ADMIN_ROLE', 'SUPER_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}
 */

let temaSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre del tema es requerido'] },
    descripcion: { type: String, required: false },
    materia: { type: Schema.ObjectId, ref: 'Materia', requiered: true }
});

temaSchema.methods.toJSON = function() {
    let tema = this;
    let temaObject = tema.toObject();
    // delete categoriaObject.password;
    return temaObject;
}

//materiaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Tema', temaSchema);