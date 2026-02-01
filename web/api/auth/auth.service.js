'use strict';

var env = require('../config/environment');
var jwt = require('jsonwebtoken');
//var AccessToken = require('../api/user/accessToken.model.js');
//var AdminAccessToken = require('../api/adminUser/adminAccessToken.model.js');

function signToken(id) {
    return jwt.sign({ user_id: id }, env.ACCESS_TOKEN_SECRET, {});
}

function checkAuth(req, res, next) {
    const token = req.headers.accesstoken;
    if (token == null || token == '') {
        res.status(401).send({
        status: 0,
        message: 'Session Expired, Please re-login to renew your session!'
        })
    } else {
        jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(401).send({
                    status: 0,
                    message: 'Session Expired, Please re-login to renew your session !'
                })
            } else {
                if (user.type == 'user') {
                    next()
                } else {
                    res.status(401).send({
                        status: 0,
                        message: 'Session Expired, Please re-login to renew your session  !!'
                    })
                }
            }
        })
    }
}

function signTokenWithType(id,loginType='Admin') {
    return jwt.sign({ user_id: id, type:loginType },  env.ACCESS_TOKEN_SECRET, {});
}

function checkAdminAuth(req, res, next) {
    const token = req.headers.accesstoken;
    if (token == null || token == '') {
        res.status(401).send({
        status: 0,
        message: 'Session Expired, Please re-login to renew your session!'
        })
    } else {
        jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            res.status(401).send({
            status: 0,
            message: 'Session Expired, Please re-login to renew your session!'
            })
        } else {
            next()
        }
        })
    }
}

exports.checkAuth = checkAuth;
exports.checkAdminAuth = checkAdminAuth;
exports.signToken = signToken;
exports.signTokenWithType = signTokenWithType
