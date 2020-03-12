import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const authSchema = new Schema({
    name: String,
    email: String,
    password: String
});

authSchema.methods.encryptPassword = async (password) => {
	
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

authSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default  model('AuthSchema', authSchema)