const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: null, },
    bio: { type: String, default: null, },
    email: {
        type: String,
        unique: [true, 'Email ID already used'],
        required: [true, 'Email is required'],
        lowerCase: true,
        trim: true,
        validate: {
            validator: async (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),
            message: 'Invalid email ID'
        }
    },
    password: {
        type: String, required: [true, 'Password is required'],
    },
}, { timestamps: true });

UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await bcrypt.hash(this.get('password'), 10);
        this.set('password', hashed);
    }
    done();
});

UserSchema.methods.comparePassword = function (plaintext) {
    return bcrypt.compare(plaintext, this.password);
};

const UserModel = mongoose.model('User', UserSchema);

class UserQuery extends UserModel {
    static updateById(id, options = {}, options1 = {}) {
        return this.findByIdAndUpdate(id, options, options1).lean();
    }

    static get(condition = {}, options1 = {}, options2 = {}) {
        return this.find(condition, options1, options2).lean();
    }

    static getById(id, options1 = {}, options2 = {}) {
        return this.findById(id, options1, options2).lean();
    }
}

module.exports = UserQuery;
