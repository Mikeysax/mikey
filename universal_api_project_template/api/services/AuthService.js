import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import app from '../../server';
import models from '../models';

module.exports = {
	generateUserToken: (user) => {
		let issueDate = moment().utc().format();
		let token = jwt.sign({
			id: user.id,
			issued: issueDate
		  },
			app.secret, {
			expiresIn: "7d"
		});
		return token;
	},
	// getUser: (token) => {
	// 	let tokenObj = jwt.verify(token, app.secret);
	//   return models.User.findOne({ where: { id: tokenObj.id }});
	// },
	generateConfirmationToken: (email) => {
		const seed = crypto.randomBytes(20);
    return {
			confirmation_token: crypto.createHash('sha1').update(seed + email).digest('hex'),
			confirmation_created_at: Date.now()
		};
	}
}
