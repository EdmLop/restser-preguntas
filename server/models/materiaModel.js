const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

/* let rolesValidos = {
    values: ['ADMIN_ROLE', 'SUPER_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}
 */

let materiaSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre de la materia es requerido'] },
    descripcion: { type: String, required: false },
    // usuario: { type: Schema.ObjectId, ref: 'Usuario', requiered: true }
});

materiaSchema.methods.toJSON = function() {
    let materia = this;
    let materiaObject = materia.toObject();
    // delete categoriaObject.password;
    return materiaObject;
}

materiaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Materia', materiaSchema);