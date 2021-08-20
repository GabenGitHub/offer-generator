import { NativeError } from 'mongoose';
import { PassportStatic } from 'passport';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcryptjs';
import User from '../models/user';
import IUser from '../models/IUser';

const init = (passport: PassportStatic) => {
    const authenticate = (email: string, password: string, done: Function) => {
        User.findOne({ email: email.toLowerCase() }, async (err: NativeError, user: IUser) => {
            if (!user) return done(null, false);
            if (err) throw err;

            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                throw error;
            }
        });
    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticate));
    passport.serializeUser((user: any, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
		User.findOne({ _id: id }, (err: Error, user: IUser) => {
			const userInfo = { name: user.name };
			done(err, userInfo);
		});
	});
}

export default init;