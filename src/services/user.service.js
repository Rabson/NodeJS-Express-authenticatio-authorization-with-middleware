const { UserRepository } = require('../repository');
const { jwt } = require('../utils');
const { ApiError } = require('../helpers');
const httpStatus = require('http-status');
const config = require('../config');

class UserService {
    static async create(payload = {}) {
        try {
            const { name, email, password, bio } = payload;

            const userDoc = await UserRepository.create(new UserRepository({
                name, email, password, bio,
            }));

            const data = { name, email, _id: userDoc._id, };

            const token = await jwt.generateToken(data, config.jwt)

            data.token = token;

            return { data, statusCode: httpStatus.CREATED };
        } catch (error) {
            if (error.code === 11000) throw new ApiError({ status: httpStatus.CONFLICT, message: "Email already Exist" })
            throw error
        }
    }

    static async authenticate(payload = {}) {
        const { password, email, } = payload;

        const userDoc = await UserRepository.findOne({ email });

        if (!userDoc) throw new ApiError({ status: httpStatus.NOT_FOUND, message: "Email not found" })

        if (!await userDoc.comparePassword(password)) throw new ApiError({ status: httpStatus.NOT_FOUND, message: "Incorrect password" })

        const data = { name: userDoc.name, email, _id: userDoc._id, };

        const token = await jwt.generateToken(data, config.jwt)

        data.token = token;

        return { data };
    }

    static async getAll() {
        return {
            data: await UserRepository.get({}, { name: 1, bio: 1, email: 1 }),
        }
    }

    static async update(payload = {}, { userId } = {}) {
        const { name, bio } = payload;

        const userDoc = await UserRepository.findById(userId);

        if (name) userDoc.name = name;
        if (bio) userDoc.bio = bio;

        await userDoc.save()

        return {};
    }

    static async profile(payload = {}, { userId } = {}) {

        const userDoc = await UserRepository.getById(userId,
            { name: 1, bio: 1, email: 1 }
        );

        if (!userDoc) new ApiError({ status: httpStatus.FORBIDDEN, message: httpStatus[403] })

        return { data: userDoc };
    }
}

module.exports = UserService;