const express = require('express')
const router = express()
const env = require('../config/environment')
var Sequelize = require('sequelize')
const Op = Sequelize.Op

const userAccessToken = require('../models/userAccessToken')
const barAccessToken = require('../models/barAccessToken')
const user = require('../models/user')
const order = require('../models/orders')

module.exports = router

const options = {
  token: {
    key: __dirname + '/../assets/AuthKey_778HQ6BCC2.p8', // optionally: fs.readFileSync('./certs/key.p8')
    keyId: env.push_ios_keyid,
    teamId: env.push_ios_teamid
  },
  production: env.push_production // true for APN production environment, false for APN sandbox environment,
}
var apn = require('apn')

async function getIosUserDeviceTokens(userID) {
  try {
    const result = await userAccessToken.findAll({
      attributes: [
        [Sequelize.literal('DISTINCT `deviceToken`'), 'deviceToken'],
        'accessToken',
        'userID',
        'deviceType'
      ],
      include: [
        {
          model: user
        }
      ],
      where: {
        userID: userID,
        deviceType: 'ios',
        deviceToken: {
          [Op.ne]: ''
        }
      },
      group: ['deviceToken']
    })
    return result
  } catch (error) {
    return error
  }
}

async function getAndroidUserDeviceTokens(userID) {
  try {
    const result = await userAccessToken.findAll({
      attributes: [
        [Sequelize.literal('DISTINCT `deviceToken`'), 'deviceToken'],
        'accessToken',
        'userID',
        'deviceType'
      ],
      include: [
        {
          model: user
        }
      ],
      where: {
        userID: userID,
        deviceType: 'android',
        deviceToken: {
          [Op.ne]: ''
        }
      },
      group: ['deviceToken']
    })
    return result
  } catch (error) {
    return error
  }
}

async function getIosBarDeviceTokens(barID) {
  try {
    const result = await barAccessToken.findAll({
      attributes: [
        [Sequelize.literal('DISTINCT `deviceToken`'), 'deviceToken'],
        'accessToken',
        'barID',
        'deviceType'
      ],
      include: [
        {
          model: bar
        }
      ],
      where: {
        barID: barID,
        deviceType: 'ios',
        deviceToken: {
          [Op.ne]: ''
        }
      },
      group: ['deviceToken']
    })
    return result
  } catch (error) {
    return error
  }
}

async function getUserDetails(userID) {
  try {
    const result = await user.findOne({
      attributes: [
        'id',
        'fullName',
        'email',
        'avatar',
        'notification'
      ],
      where: {
        id: userID,
        isDeleted: 'No',
        status: 'Active'
      }
    })
    return result
  } catch (error) {
    return error
  }
}

async function sendPushToAllDevices(registrationIds, notificationData) {
  new Promise(async (resolve, reject) => {
    try {
      var apnProvider = new apn.Provider(options)
      for (let index = 0; index < registrationIds.length; index++) {
        const element = registrationIds[index]
        var data = notificationData
        var note = new apn.Notification()
        note.expiry = Math.floor(Date.now() / 1000) + 3600 // Expires 1 hour from now.
        note.badge = element.user.badge + 1
        note.title = data.type == 'chat' ? data.name : ''
        note.body = data.message
        note.sound = 'default'
        note.aps.data = data
        note.topic = env.push_ios_BundleIDs
        note.mutableContent = true
        let result = await apnProvider.send(note, element.deviceToken)
        if (result.sent.length > 0) {
          try {
            // await user.update(
            //   {
            //     badge: element.user.badge + 1
            //   },
            //   {
            //     where: {
            //       userID: element.user.userID
            //     }
            //   }
            // )
          } catch (e) { }
        }
      }
      apnProvider.shutdown()
      resolve()
    } catch (error) {
      console.log(error)
    }
  })
}

var FCM = require('fcm-notification')
var pathFCM = __dirname + '/../assets/push_android.json'
var fcm = new FCM(pathFCM)

async function sendPushToAllAndroidDevices(registrationIds, data) {
  new Promise((resolve, reject) => {
    try {
      let dataToSend = JSON.parse(JSON.stringify(data))
      var message = {
        data: { content: JSON.stringify(dataToSend) }
      }
      var tokens = []
      registrationIds.forEach(token => {
        tokens.push(token.deviceToken)
      });

      fcm.sendToMultipleToken(message, tokens, function (
        err,
        response
      ) {
        if (err) {
          console.log('Something has gone wrong for Android!')
          console.log('err')
          reject(err)
        } else {
          console.log(response)
          resolve(response)
        }
      })
    } catch (error) {
      reject(error)
      console.log(error)
    }
  })
}