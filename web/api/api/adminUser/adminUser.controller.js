var adminUser = require('../models/adminUser.model')
var adminAccessToken = require('../models/adminAccessToken.model.js')
var env = require('../../config/environment')
var jwt = require('jsonwebtoken')
var auth = require('../../auth/auth.service')
const bcrypt = require('bcryptjs')
const multer  = require('multer')

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, env.admin_user_image_path);
	},
	filename: function (req, file, callback) {
		let extArray = file.mimetype.split('/')
      	let extension = extArray[extArray.length - 1]
		callback(null, file.fieldname + '-' + Date.now().toString() + '.' + extension)
	}
});
var upload = multer({ storage : storage})

exports.create = async (req, res) => {
	try {
		await upload.single('user_pic')(req, res, async function (err) {
			if (req.body.isError) {
				res.status(200).json({
					success: 0,
					message: req.body.message
				})
			} else {
				var image = '';	
				if (req.file) {
					image = req.file.filename
				}
				
				adminUser.findOne({
					where: {
						email: req.body.email
					}
				})
				.then(adminUserDataResponse => {
					if (adminUserDataResponse && Object.keys(adminUserDataResponse).length > 0) {
						res.status(200).json({ success: 0, message: 'Email id already exists please enter another email id!'})
					} else {
						bcrypt.hash(req.body.password, 10, async (err, hash) => {
							if (!err) {
								adminUser.create({
									first_name: req.body.first_name,
									last_name: req.body.last_name,
									email: req.body.email,
									mobile: req.body.mobile,
									password: hash,
									gender: req.body.gender,
									image: image
								}).then(adminUser => {
									res.status(200).json({ success: 1, data: adminUser, message: 'success!' })
								})
							} else {
								res.status(200).json({ success: 0, message: "Something went wrong!" })
							}
						})
					}
				}).catch(function(err) {
					res.status(200).json({ success: 0, message: err })
				});
			}	
		})		
	} catch (err) {
		res.status(200).json({ success: 0, message: err.message })
  	}
}

exports.index = async (req, res) => {
	var sessionData = await jwt.verify(req.headers.accesstoken, env.ACCESS_TOKEN_SECRET);
	var user_id = sessionData.user_id

	try {
	  	adminUser.findAll({
			attributes: [
				'id',
				'first_name',
				'last_name',
				'email',
				'mobile',
				'gender',
				'image',
				'status'
			]
		})
		.then(async response => {
			res.status(200).json({ success: 1, message: 'Results', data: response })
		})
	} catch (error) {
	  res.status(200).json({ success: 0, message: 'error!' })
	}
}

exports.getById = async (req, res) => {
	try {
		var sessionData = await jwt.verify(req.headers.accesstoken, env.ACCESS_TOKEN_SECRET);
		var user_id = sessionData.user_id
		
		var whereClause = {
			id: req.body.id,
		}
  
		adminUser.findOne({
		  	attributes: [
				'id',
				'first_name',
				'last_name',
				'email',
				'mobile',
				'gender',
				'image',
				'status'
		  	],
		  	where: whereClause,
		})
		.then(async user => {
			user = (user)?user.toJSON():{}
		  	res.status(200).json({ success: 1, message: 'user details found!', data: user})
		})
	} catch (error) {
		res.status(200).json({ success: 0, message: 'error!' })
	}
}

exports.update = async (req, res) => {
	try {
		await upload.single('user_pic')(req, res, async function (err) {
			if (req.body.isError) {
				res.status(200).json({
					success: 0,
					message: req.body.message
				})
			} else {
				var updateData = {}
				if (req.file) {
					updateData['image'] = req.file.filename
				}

				updateData['first_name'] = req.body.first_name
				updateData['last_name'] = req.body.last_name
				updateData['email'] = req.body.email
				updateData['mobile'] = req.body.mobile
				updateData['gender'] = req.body.gender

				adminUser.update(updateData, {
					returning: true,
					where: {
					  id: req.body.id
					}
				}).then(function () {
					adminUser.findOne(
						{ where: { id: req.body.id } }
					).then(data => {
						if (data) {
							res.status(200).json({ success: 1, data: data, message: 'Admin user successfully updated' })
						} else {
							res.status(200).json({ success: 0, message: 'No Results Found' })
						}
					})
				})
			}
		})
	} catch (error) {
	  	res.status(200).json({ success: 0, message: 'Error while updating user.' })
	}
}

exports.remove = async (req, res) => {
	try {
		adminUser.destroy({ 
			where: { id: req.body.id }
		}).then(function () {
			res.status(200).json({
			  	success: 1,
			  	message: 'Admin user removed successfully.'
			})
		})
	} catch (error) {
		res.status(200).json({
			success: 0,
			message: 'Error while removing user.'
		})
	}
}

exports.login = async (req, res) => {
	var whereClause = {
	  email: req.body.email,
	}
  
	try {
		adminUser.findOne({
			attributes: [ 'id', 'first_name', 'last_name', 'email', 'mobile', 'password', 'gender', 'image', 'status' ],
			where: whereClause
		}).then(async userData => {
			if (userData) {
				bcrypt.compare(req.body.password, userData.password, async (err, response) => {
					if (err) {
						res.status(200).json({ success: 0, message: 'Something went wrong!' })
					}
					if (response) {
						if (userData.status == 'Inactive') {
							return res.status(200).json({ success: 0, message: 'Your are not authorised for login. Please contact your system administrator.' })
						} else {
							var token = await auth.signTokenWithType(userData.id);
							userData = userData.toJSON();
							userData.accesstoken = token;
							
							adminAccessToken.findOrCreate({
								where: {
									id: userData.id
								},
								defaults: {
									user_id: userData.id,
									accesstoken: token
								}
							}).then(async (accesstoken, created) => {
								delete userData.password
								
								if (created) {
									res.status(200).json({ success: 1, data: userData, message: 'success!' })
								} else {
									adminAccessToken
									.update(
										{
											accesstoken: token
										},
										{
											returning: true,
											where: {
												user_id: userData.id
											}
										}
									)
									.then(resUserData => {
										res.status(200).json({ success: 1, data: userData, message: 'success!' })
									})
								}
							}).catch(function(err) {
								res.status(200).json({ success: 0, message: err })
							});
						}
					} else {
						res.status(200).json({ success: 0, message: 'email or password is not correct, please try again.' })
					}
				})
			} else {
				res.status(200).json({ success: 0, message: 'email or password is not correct, please try again.' })
			}
		})
	} catch (error) {
	  res.status(200).json({ success: 0, message: 'error!' })
	}
}

exports.logout = async (req, res) => {
	try {
	  	var sessionData = await jwt.verify(req.headers.accesstoken, env.ACCESS_TOKEN_SECRET);
	  	var user_id = sessionData.user_id
	  	adminAccessToken.destroy({
			where: {
				user_id: user_id
			}
		})
		.then(function () {
		  	res.status(200).json({ success: 1, message: 'Logout successfully' })
		}).catch(function(err) {
			res.status(200).json({ success: 0, message: err })
		});
	} catch (error) {
		res.status(200).json({ success: 0, message: 'error!' })
	}
}
exports.ChangePassword = async (req, res) => {
	try {
		bcrypt.hash(req.body.password, 10, async (err, hash) => {	
        var updateData = {}

				updateData['password'] = hash
				
				adminUser.update(updateData, {
					returning: true,
					where: {
					  id: req.body.id
					}
				}).then(function () {
					adminUser.findOne(
						{ where: { id: req.body.id } }
					).then(data => {
						if (data) {
							res.status(200).json({ success: 1, data: data, message: 'Admin user successfully updated' })
						} else {
							res.status(200).json({ success: 0, message: 'No Results Found' })
						}
					})
				})
        })
	
	} catch (error) {
	  	res.status(200).json({ success: 0, message: 'Error while updating user.' })
	}
}


