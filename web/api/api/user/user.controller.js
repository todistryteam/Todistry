var user = require("../models/user.model");
var familyTree = require("../models/familyTree.model");
var familyMember = require("../models/familyMember.model");
var subscribe = require("../models/subscribe.model");
var contactus = require("../models/contactus.model");
var userAccessToken = require("../models/userAccessToken.model.js");
var env = require("../../config/environment");
var jwt = require("jsonwebtoken");
var auth = require("../../auth/auth.service");
var MailService = require("../services/MailService");
const bcrypt = require("bcryptjs");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, env.user_image_path);
  },
  filename: function (req, file, callback) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    callback(
      null,
      file.fieldname + "-" + Date.now().toString() + "." + extension
    );
  },
});
var upload = multer({ storage: storage });
let userDetailArray = [
  "id",
  "firstName",
  "lastName",
  "mobile",
  "email",
  "gender",
  "birthdate",
  "password",
  "image",
  "location",
  "latitude",
  "longitude",
  "countryCode",
  "country",
  "state",
  "city",
  "zipcode",
  "legalName",
  "legalEmail",
  "isEmailVerify",
  "isMobileVerify",
  "isOnline",
  "status",
];

exports.signup = async (req, res) => {
  try {
    await upload.any()(req, res, async function (err) {
      if (req.body.isError) {
        res.status(200).json({
          success: 0,
          message: req.body.message,
        });
      } else {
        var image = "";
        if (req.files && req.files.length > 0) {
          for (var i = 0; i < req.files.length; i++) {
            if (req.files[i].fieldname == "image") {
              image = req.files[i].filename;
            }
          }
        }
        console.log(user);

        user
          .findOne({
            where: {
              email: req.body.email,
            },
          })
          .then((userDataResponse) => {
            if (userDataResponse && Object.keys(userDataResponse).length > 0) {
              res.status(200).json({
                success: 0,
                message: "Email address already in use",
              });
            } else {
              bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (!err) {
                  user
                    .create({
                      firstName: req.body.firstName,
                      middleName: req.body.middleName,
                      lastName: req.body.lastName,
                      mobile: req.body.mobile,
                      gender: req.body.gender,
                      email: req.body.email,
                      birthDate: req.body.birthDate,
                      legalName: req.body.legacyName,
                      legalEmail: req.body.legacyEmail,
                      password: hash,
                      image: image,
                      status: "Active",
                      //acceptance_at: req.body.acceptance_at,
                    })
                    .then(async (userData) => {
                      let treeName = Math.floor(Math.random() * 1000000000) + 1;
                      const characters =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                      let familyCode = "";
                      const charactersLength = characters.length;
                      for (let i = 0; i < 5; i++) {
                        familyCode += characters.charAt(
                          Math.floor(Math.random() * charactersLength)
                        );
                      }
                      familyCode = familyCode + "-" + treeName;
                      var treeCode = Math.floor(
                        100000 + Math.random() * 900000
                      ).toString();
                      familyTree
                        .create({
                          userId: userData.id,
                          treeName:
                            req.body.treeName || "family-tree-" + treeName,
                          slug: req.body.treeName || "family-tree-" + treeName,
                          shareDescription:
                            req.body.shareDescription ||
                            req.body.treeName ||
                            "family-tree-" + treeName,
                          familyCode: familyCode,
                          isPublished: req.body.Published || "UnPulished",
                          status: "Active",
                          isDeleted: "No",
                          treeCode: treeCode,
                        })
                        .then(async (familyTreeData) => {
                          console.log(familyTreeData);
                          const updateData = {};
                          updateData.treeId = familyTreeData.id;
                          await user.update(updateData, {
                            where: {
                              id: userData.id,
                            },
                          });

                          familyMember
                            .create({
                              firstName: req.body.firstName,
                              middleName: req.body.middleName,
                              lastName: req.body.lastName,
                              image: image,
                              treeId: familyTreeData.id,
                              userId: userData.id,
                              parentId: req.body.parentId || 0,
                              treeLevel: req.body.treeLevel || 0,
                              birthDate: req.body.birthDate,
                              gender: req.body.gender,
                              email: req.body.email, // Email from the request body
                              website: req.body.website, // Website URL from the request body
                              blog: req.body.blog, // Blog URL from the request body
                              homePhone: req.body.homePhone, // Home phone number from the request body
                              workPhone: req.body.workPhone, // Work phone number from the request body
                              mobile: req.body.mobile,
                              address: req.body.address,
                              birthPlace: req.body.birthPlace, // Birthplace from the request body
                              profession: req.body.profession, // Profession from the request body
                              company: req.body.company, // Company from the request body
                              interests: req.body.interests, // Interests from the request body
                              activities: req.body.activities, // Activities from the request body
                              bioNotes: req.body.bioNotes, // Bio notes from the request body
                            })
                            .then(async (familyMemberdata) => {
                              const updateData = {};
                              updateData.memberid = familyMemberdata.id;
                              await familyTree.update(updateData, {
                                where: {
                                  id: familyTreeData.id,
                                },
                              });

                              var token = await auth.signTokenWithType(
                                userData.id,
                                "user"
                              );
                              var userrecord = userData.toJSON();
                              userrecord.accesstoken = token;
                              userrecord.memberId = familyMemberdata.id;
                              userAccessToken
                                .findOrCreate({
                                  where: {
                                    id: userrecord.id,
                                  },
                                  defaults: {
                                    user_id: userrecord.id,
                                    accesstoken: token,
                                  },
                                })
                                .then(async (accesstoken, created) => {
                                  delete userrecord.password;

                                  if (created) {
                                    res.status(200).json({
                                      success: 1,
                                      data: userrecord,
                                      message: "success!",
                                    });
                                  } else {
                                    userAccessToken
                                      .update(
                                        {
                                          accesstoken: token,
                                        },
                                        {
                                          returning: true,
                                          where: {
                                            user_id: userrecord.id,
                                          },
                                        }
                                      )
                                      .then((resUserData) => {
                                        res.status(200).json({
                                          success: 1,
                                          data: userrecord,
                                          message: "success!",
                                        });
                                      });
                                  }
                                });
                            })
                            .catch(function (err) {
                              console.log(err);
                              res
                                .status(200)
                                .json({ success: 0, message: err });
                            });
                        })
                        .catch(function (err) {
                          console.log(err);
                          res.status(200).json({ success: 0, message: err });
                        });
                    })
                    .catch(function (err) {
                      res.status(200).json({ success: 0, message: err });
                    });
                } else {
                  res
                    .status(200)
                    .json({ success: 0, message: "Something went wrong!" });
                }
              });
            }
          })
          .catch(function (err) {
            res.status(200).json({ success: 0, message: err });
          });
      }
    });
  } catch (err) {
    res.status(200).json({ success: 0, message: err.message });
  }
};

exports.login = async (req, res) => {
  var whereClause = {
    email: req.body.email,
  };
  let login_type = "email";
  if (req.body.login_type) {
    login_type = req.body.login_type;
  }
  try {
    user
      .findOne({
        attributes: userDetailArray,
        where: whereClause,
      })
      .then(async (userData) => {
        if (userData) {
          if (login_type != "email" && login_type != "") {
            if (req.body.social_id != "") {
              var token = await auth.signTokenWithType(userData.id, "user");
              userData = userData.toJSON();
              userData.accesstoken = token;

              userAccessToken
                .findOrCreate({
                  where: {
                    id: userData.id,
                  },
                  defaults: {
                    user_id: userData.id,
                    accesstoken: token,
                  },
                })
                .then(async (accesstoken, created) => {
                  delete userData.password;

                  var updateData = {};
                  if (login_type == "facebook") {
                    updateData["facebookId"] = req.body.social_id;
                  } else {
                    updateData["googleId"] = req.body.social_id;
                  }

                  user.update(updateData, {
                    returning: true,
                    where: {
                      id: userData.id,
                    },
                  });

                  if (created) {
                    res.status(200).json({
                      success: 1,
                      data: userData,
                      message: "success!",
                    });
                  } else {
                    userAccessToken
                      .update(
                        {
                          accesstoken: token,
                        },
                        {
                          returning: true,
                          where: {
                            user_id: userData.id,
                          },
                        }
                      )
                      .then((resUserData) => {
                        res.status(200).json({
                          success: 1,
                          data: userData,
                          message: "success!",
                        });
                      });
                  }
                })
                .catch(function (err) {
                  res.status(200).json({ success: 0, message: err });
                });
            } else {
              res.status(200).json({
                success: 0,
                message: "social login fail, please try again.",
              });
            }
          } else {
            if (req.body.password != "") {
              bcrypt.compare(
                req.body.password,
                userData.password,
                async (err, response) => {
                  if (err) {
                    res
                      .status(200)
                      .json({ success: 0, message: "Something went wrong!" });
                  }
                  if (response) {
                    if (userData.status == "Inactive") {
                      return res.status(200).json({
                        success: 0,
                        message:
                          "Your are not authorised for login. Please contact your system administrator.",
                      });
                    } else {
                      var token = await auth.signTokenWithType(
                        userData.id,
                        "user"
                      );
                      userData = userData.toJSON();
                      userData.accesstoken = token;

                      userAccessToken
                        .findOrCreate({
                          where: {
                            id: userData.id,
                          },
                          defaults: {
                            user_id: userData.id,
                            accesstoken: token,
                          },
                        })
                        .then(async (accesstoken, created) => {
                          delete userData.password;

                          if (created) {
                            res.status(200).json({
                              success: 1,
                              data: userData,
                              message: "success!",
                            });
                          } else {
                            userAccessToken
                              .update(
                                {
                                  accesstoken: token,
                                },
                                {
                                  returning: true,
                                  where: {
                                    user_id: userData.id,
                                  },
                                }
                              )
                              .then((resUserData) => {
                                res.status(200).json({
                                  success: 1,
                                  data: userData,
                                  message: "success!",
                                });
                              });
                          }
                        })
                        .catch(function (err) {
                          res.status(200).json({ success: 0, message: err });
                        });
                    }
                  } else {
                    res.status(200).json({
                      success: 0,
                      message:
                        "email or password is not correct, please try again.",
                    });
                  }
                }
              );
            } else {
              res.status(200).json({
                success: 0,
                message: "password is not correct, please try again.",
              });
            }
          }
        } else {
          if (login_type != "email" && login_type != "") {
            var userCreateData = {};
            userCreateData["firstName"] = req.body.firstName;
            userCreateData["email"] = req.body.email;
            if (login_type == "facebook") {
              userCreateData["facebookId"] = req.body.social_id;
            } else {
              userCreateData["googleId"] = req.body.social_id;
            }

            user
              .create(userCreateData)
              .then(async (user) => {
                var token = await auth.signTokenWithType(user.id, "user");
                user = user.toJSON();
                user.accesstoken = token;

                userAccessToken
                  .findOrCreate({
                    where: {
                      id: user.id,
                    },
                    defaults: {
                      user_id: user.id,
                      accesstoken: token,
                    },
                  })
                  .then(async (accesstoken, created) => {
                    delete user.password;

                    if (created) {
                      res
                        .status(200)
                        .json({ success: 1, data: user, message: "success!" });
                    } else {
                      userAccessToken
                        .update(
                          {
                            accesstoken: token,
                          },
                          {
                            returning: true,
                            where: {
                              user_id: user.id,
                            },
                          }
                        )
                        .then((resUserData) => {
                          res.status(200).json({
                            success: 1,
                            data: user,
                            message: "Login Successfully!",
                          });
                        });
                    }
                  });
              })
              .catch(function (err) {
                res.status(200).json({ success: 0, message: err });
              });
          } else {
            res.status(200).json({
              success: 0,
              message: "email or password is not correct, please try again.",
            });
          }
        }
      });
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.editProfile = async (req, res) => {
  try {
    var sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    var user_id = sessionData.user_id;
    await upload.single("image")(req, res, async function (err) {
      if (req.body.isError) {
        res.status(200).json({
          success: 0,
          message: req.body.message,
        });
      } else {
        var updateData = {};
        if (req.file) {
          updateData["image"] = req.file.filename;
        }

        updateData["firstName"] = req.body.firstName;
        updateData["mobile"] = req.body.mobile;
        updateData["email"] = req.body.email;
        updateData["birthdate"] = req.body.birthdate;
        updateData["gender"] = req.body.gender;

        user
          .update(updateData, {
            returning: true,
            where: {
              id: user_id,
            },
          })
          .then(function () {
            user.findOne({ where: { id: user_id } }).then((data) => {
              if (data) {
                res.status(200).json({
                  success: 1,
                  data: data,
                  message: "User profie successfully updated",
                });
              } else {
                res
                  .status(200)
                  .json({ success: 0, message: "No Results Found" });
              }
            });
          });
      }
    });
  } catch (error) {
    res.status(200).json({ success: 0, message: "Error while updating user." });
  }
};

exports.logout = async (req, res) => {
  try {
    var sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    var user_id = sessionData.user_id;
    userAccessToken
      .destroy({
        where: {
          user_id: user_id,
        },
      })
      .then(function () {
        res.status(200).json({ success: 1, message: "Logout successfully" });
      })
      .catch(function (err) {
        res.status(200).json({ success: 0, message: err });
      });
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.getById = async (req, res) => {
  try {
    var sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    var user_id = sessionData.user_id;

    var whereClause = {
      id: user_id,
    };

    user
      .findOne({
        attributes: userDetailArray,
        where: whereClause,
      })
      .then(async (user) => {
        user = user ? user.toJSON() : {};
        res
          .status(200)
          .json({ success: 1, message: "user details found!", data: user });
      });
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.subscribe = async (req, res) => {
  try {
    var email = req.body.email;

    subscribe
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          email: email,
        },
      })
      .then(async (subscribe, created) => {
        console.log(created);
        if (created) {
          res
            .status(200)
            .json({ success: 1, message: "Thank you for subscribing!" });
        } else {
          res
            .status(200)
            .json({ success: 0, message: "You have already subscribe!" });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.subscribeList = async (req, res) => {
  try {
    var sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    var user_id = sessionData.user_id;

    subscribe
      .findAll({
        attributes: ["id", "email", "status"],
      })
      .then(async (response) => {
        res
          .status(200)
          .json({ success: 1, message: "Results", data: response });
      });
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.contactList = async (req, res) => {
  try {
    var sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    var user_id = sessionData.user_id;

    contactus
      .findAll({
        attributes: [
          "firstName",
          "lastName",
          "phone_number",
          "email",
          "message",
        ],
      })
      .then(async (response) => {
        res
          .status(200)
          .json({ success: 1, message: "Results", data: response });
      });
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.contactUs = async (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone_number = req.body.phone_number;
  var email = req.body.email;
  var message = req.body.message;
  try {
    contactus
      .create({
        firstName: firstName,
        lastName: lastName,
        phone_number: phone_number,
        email: email,
        message: message,
      })
      .then(async (contactdata) => {
        res.status(200).json({
          success: 1,
          message:
            "Thank you for contacting us, a team member will be in contact shortly",
        });
      })
      .catch(function (err) {
        res.status(200).json({ success: 0, message: err });
      });
  } catch (e) {
    res.status(200).json({
      success: 0,
      message: e.message,
    });
  }
};

// exports.resetPassword = async (req, res) => {
//   user
//     .findOne({
//       attributes: userDetailArray,
//       where: {
//         email: req.body.email,
//         isDeleted: "No",
//       },
//     })
//     .then(async (userFetchResponse) => {
//       if (userFetchResponse) {
//         try {
//           var randtoken = require("rand-token").generator();
//           var sixDigitCode = randtoken.generate(6, "0123456789");
//           var emailContent = `<tr>
// 		<td class="esd-structure es-p15t es-p20r es-p20l" align="left">
// 			<table cellpadding="0" cellspacing="0" width="100%">
// 				<tbody>
// 					<tr>
// 						<td width="560" class="esd-container-frame" align="center" valign="top">
// 							<table cellpadding="0" cellspacing="0" width="100%">
// 								<tbody>
// 									<tr>
// 										<td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;">
// 											<a target="_blank"><img src="http://143.110.190.232/assets/images/69901618385469411.png" alt="" style="display: block;margin-top:40px” width="100"></a>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td align="center" class="esd-block-text es-p15t es-p15b es-p40r es-p40l es-m-p0r es-m-p0l es-m-txt-c" esd-links-underline="none">
// 											<h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Password reset&nbsp;</h1>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td align="left" class="esd-block-text es-p10t">
// 											<p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-left:10px">Complete the following steps after verifying OTP:</p>
// 											<ol>
// 												<li style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Enter a new password.</li>
// 												<li style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Confirm your new password.</li>
// 												<li style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Click Submit.</li>
// 											</ol>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 		</td>
// 		</tr><tr>
// 		<td class="esd-structure es-p20b es-p20r es-p20l" align="left">
// 			<table cellpadding="0" cellspacing="0" width="100%">
// 				<tbody>
// 					<tr>
// 						<td width="560" class="esd-container-frame" align="center" valign="top">
// 							<table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 5px; border-collapse: separate;">
// 								<tbody>
// 									<tr>
// 										<td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px; background: #cc0000;"><p class="es-button" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #cc0000;   border-width: 10px 30px 10px 30px; display: inline-block;background: #cc0000;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif; font-weight: normal;font-style: normal; line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">OTP<br />${sixDigitCode}</a></span></td>
// 									</tr>
// 									<tr>
// 										<td align="center" class="esd-block-text es-p10t es-p10b">
// 											<p style="line-height: 150%;">If you didn't request to reset your&nbsp;password, please disregard this message or contact our customer service department.</p>
// 										</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 		</td>
// 		</tr>`;

//           let mailService = new MailService();
//           await mailService.userMail(
//             req.body.email,
//             "Password Reset Code",
//             emailContent,
//             function (response) {
//               if (response) {
//                 user
//                   .update(
//                     {
//                       resetPasswordCode: sixDigitCode,
//                     },
//                     {
//                       returning: true,
//                       where: {
//                         id: userFetchResponse.id,
//                       },
//                     }
//                   )
//                   .then(function () {
//                     res.status(200).json({
//                       success: 1,
//                       message: "Email sent successfully",
//                       data: {
//                         email: userFetchResponse.email,
//                       },
//                     });
//                   });
//               }
//             }
//           );
//         } catch (e) {
//           res.status(200).json({
//             success: 0,
//             message: e.message,
//           });
//         }
//       } else {
//         res.status(200).send({
//           success: 0,
//           message: "This email is not registered with us!",
//           data: {},
//         });
//       }
//     });
// };

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: 0,
        message: "Email is required",
      });
    }

    const userFetchResponse = await user.findOne({
      attributes: userDetailArray,
      where: {
        email: email,
        isDeleted: "No",
      },
    });

    if (!userFetchResponse) {
      return res.status(200).json({
        success: 0,
        message: "This email is not registered with us!",
        data: {},
      });
    }

    // Set static OTP
    const sixDigitCode = "123456";

    // Store OTP in the database
    await user.update(
      { resetPasswordCode: sixDigitCode },
      { where: { id: userFetchResponse.id } }
    );

    // Return OTP in response (for testing/dev only)
    return res.status(200).json({
      success: 1,
      message: "OTP generated successfully",
      data: {
        email: userFetchResponse.email,
        otp: sixDigitCode, // NOTE: Remove this in production
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: 0,
      message: e.message,
    });
  }
};

exports.verifyResetPasswordCode = (req, res) => {
  try {
    user
      .findOne({
        attributes: ["id", "email", "resetPasswordCode"],
        where: {
          email: req.body.email,
          resetPasswordCode: req.body.resetPasswordCode,
          isDeleted: "No",
        },
      })
      .then((userFetchResponse) => {
        if (userFetchResponse) {
          res.status(200).json({
            success: 1,
            message: "OTP verified successfully!",
            data: userFetchResponse,
          });
        } else {
          res.status(200).json({
            success: 0,
            message: "Please enter valid code!",
            data: {},
          });
        }
      });
  } catch (error) {
    res.status(200).send({
      success: 0,
      message: "error!",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    user
      .findOne({
        where: {
          id: req.body.id,
          resetPasswordCode: req.body.resetPasswordCode,
        },
      })
      .then(async (userData) => {
        if (userData) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (!err) {
              user
                .update(
                  {
                    password: hash,
                    resetPasswordCode: "",
                  },
                  {
                    returning: true,
                    where: {
                      id: userData.id,
                    },
                  }
                )
                .then(function () {
                  res.status(200).send({
                    success: 1,
                    message: "Your password is changed. Please login again",
                  });
                });
            } else {
              res.status(200).send({
                success: 0,
                message: "Something went wrong!",
              });
            }
          });
        } else {
          res.status(200).send({
            success: 0,
            message: "updatePassword: Failed!",
          });
        }
      });
  } catch (error) {
    res.status(200).send({
      success: 0,
      message: "error!",
    });
  }
};

exports.sendOTPForLogin = async (req, res) => {
  user
    .findOne({
      attributes: userDetailArray,
      where: {
        mobile: req.body.mobile,
        is_deleted: "No",
      },
    })
    .then(async (userFetchResponse) => {
      if (userFetchResponse) {
        try {
          var randtoken = require("rand-token").generator();
          var sixDigitCode = randtoken.generate(6, "0123456789");

          var request = require("request");
          var options = {
            method: "POST",
            url: "https://sms.orbitinfotech.com/smsapi/index",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
              key: "462CBE233D9D1C",
              campaign: 0,
              routeid: 1,
              type: "text",
              contacts: req.body.mobile,
              senderid: "",
              msg: "Soma+Login+OTP+is+%3A+" + sixDigitCode,
            },
          };

          const smsRes = await request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);

            return response.body;
          });

          console.log(smsRes);

          var emailContent = `<tr>
<td class="esd-structure es-p15t es-p20r es-p20l" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td width="560" class="esd-container-frame" align="center" valign="top">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;">
                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/69901618385469411.png" alt="" style="display: block;margin-top:40px” width="100"></a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="esd-block-text es-p15t es-p15b es-p40r es-p40l es-m-p0r es-m-p0l es-m-txt-c" esd-links-underline="none">
                                    <h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Login OTP</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</td>
</tr><tr>
<td class="esd-structure es-p20b es-p20r es-p20l" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td width="560" class="esd-container-frame" align="center" valign="top">
                    <table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 5px; border-collapse: separate;">
                        <tbody>
                            <tr>
                                <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px; background: #cc0000;"><p class="es-button" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #e8eafb;   border-width: 10px 30px 10px 30px; display: inline-block;background: #e8eafb;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif; font-weight: normal;font-style: normal; line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">OTP<br />${sixDigitCode}</a></span></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</td>
</tr>`;
          let mailService = new MailService();
          await mailService.userMail(
            userFetchResponse.email,
            "Email OTP",
            emailContent
          );
          user
            .update(
              {
                mobile_otp: sixDigitCode,
              },
              {
                returning: true,
                where: {
                  id: userFetchResponse.id,
                },
              }
            )
            .then(function () {
              res.status(200).json({
                success: 1,
                message: "OTP sent successfully",
                data: {
                  mobile: userFetchResponse.mobile,
                },
              });
            });
        } catch (e) {
          res.status(200).json({
            success: 0,
            message: e.message,
          });
        }
      } else {
        res.status(200).send({
          success: 0,
          message: "Mobile is not registered with us!",
          data: {},
        });
      }
    });
};

exports.loginOTPVerify = async (req, res) => {
  try {
    if (req.body.mobile_otp && req.body.mobile_otp != "") {
      user
        .findOne({
          attributes: userDetailArray,
          where: {
            mobile: req.body.mobile,
            mobile_otp: req.body.mobile_otp,
            is_deleted: "No",
          },
        })
        .then(async (userData) => {
          if (userData) {
            await user.update(
              { mobile_otp: "" },
              { returning: true, where: { id: userData.id } }
            );

            if (userData.status == "Inactive") {
              return res.status(200).json({
                success: 0,
                message:
                  "Your are not authorised for login. Please contact your system administrator.",
              });
            } else {
              var token = await auth.signTokenWithType(userData.id, "user");
              userData = userData.toJSON();
              userData.accesstoken = token;

              userAccessToken
                .findOrCreate({
                  where: {
                    id: userData.id,
                  },
                  defaults: {
                    user_id: userData.id,
                    accesstoken: token,
                  },
                })
                .then(async (accesstoken, created) => {
                  if (created) {
                    res.status(200).json({
                      success: 1,
                      data: userData,
                      message: "OTP verified successfully!",
                    });
                  } else {
                    userAccessToken
                      .update(
                        {
                          accesstoken: token,
                        },
                        {
                          returning: true,
                          where: {
                            user_id: userData.id,
                          },
                        }
                      )
                      .then((resUserData) => {
                        res.status(200).json({
                          success: 1,
                          data: userData,
                          message: "OTP verified successfully!",
                        });
                      });
                  }
                })
                .catch(function (err) {
                  res.status(200).json({ success: 0, message: err });
                });
            }
          } else {
            res.status(200).json({
              success: 0,
              message: "Please enter valid otp!",
              data: {},
            });
          }
        });
    } else {
      res.status(200).json({
        success: 0,
        message: "OTP is not valid!",
        data: {},
      });
    }
  } catch (error) {
    res.status(200).send({
      success: 0,
      message: "error!",
    });
  }
};

exports.emailVerifyUser = async (req, res) => {
  try {
    var updateData = {};
    updateData["status"] = "Active";

    user
      .update(updateData, {
        returning: true,
        where: {
          id: req.body.id,
        },
      })
      .then(async function () {
        user.findOne({ where: { id: req.body.id } }).then(async (data) => {
          var emailContent = `<tr>
								<td class="esd-structure es-p15t es-p20r es-p20l" align="left">
									<table cellpadding="0" cellspacing="0" width="100%">
										<tbody>
											<tr>
												<td width="560" class="esd-container-frame" align="center" valign="top">
													<table cellpadding="0" cellspacing="0" width="100%">
														<tbody>
															<tr>
																<td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;">
																	<a target="_blank"><img src="http://143.110.190.232/assets/images/96671618383886503.png" alt="" style="display: block;margin-top:40px"  width="100"></a>
																</td>
															</tr>
															<tr>
																<td align="center" class="esd-block-text es-p15t es-p15b es-m-txt-c" esd-links-underline="none">
																	<h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Thanks for joining us!</h1>
																</td>
															</tr>
															<tr>
																<td align="left" class="esd-block-text es-p10t es-p10b">
																	<p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-left: 30px;padding-right: 30px;">Hello, ${data.fisrtName}! Thanks for joining us! You are now on our mailing list. This means you'll be the first&nbsp;to hear about our fresh&nbsp;collections and offers!</p>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr><tr>
							<td class="esd-structure esdev-adapt-off es-p20" align="left">
								<table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table" style="margin-top: 20px;">
									<tbody>
										<tr>
											<td class="esdev-mso-td" valign="top">
												<table cellpadding="0" cellspacing="0" class="es-left" align="left">
													<tbody>
														<tr class="es-mobile-hidden">
															<td width="146" class="esd-container-frame" align="left">
																<table cellpadding="0" cellspacing="0" width="100%">
																	<tbody>
																		<tr>
																			<td align="center" class="esd-block-spacer" height="40"></td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
											<td class="esdev-mso-td" valign="top">
												<table cellpadding="0" cellspacing="0" class="es-left" align="left">
													<tbody>
														<tr>
															<td width="121" class="esd-container-frame" align="left">
																<table cellpadding="10" cellspacing="0" width="100%" bgcolor="#e8eafb" style="background-color: #e8eafb; border-radius: 10px 0 0 10px; border-collapse: separate;">
																	<tbody>
																		<tr>
																			<td align="right" class="esd-block-text es-p10t">
																				<p style="margin:0px;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Login:</p>
																			</td>
																		</tr>
																		<tr>
																			<td align="right" class="esd-block-text es-p10b">
																				<p style="margin:0px;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Password:</p>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
											<td class="esdev-mso-td" valign="top">
												<table cellpadding="0" cellspacing="0" class="es-left" align="left">
													<tbody>
														<tr>
															<td width="155" align="left" class="esd-container-frame">
																<table cellpadding="10" cellspacing="0" width="100%" bgcolor="#e8eafb" style="background-color: #e8eafb; border-radius:0 10px 10px 0; border-collapse: separate;">
																	<tbody>
																		<tr>
																			<td align="left" class="esd-block-text es-p10t es-p10l">
																				<p style="margin:0px;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>${data.email}</strong></p>
																			</td>
																		</tr>
																		<tr>
																			<td align="left" class="esd-block-text es-p10t es-p10l">
																				<p style="margin:0px;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>${req.body.password}</strong></p>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
											<td class="esdev-mso-td" valign="top">
												<table cellpadding="0" cellspacing="0" class="es-right" align="right">
													<tbody>
														<tr class="es-mobile-hidden">
															<td width="138" class="esd-container-frame" align="left">
																<table cellpadding="0" cellspacing="0" width="100%">
																	<tbody>
																		<tr>
																			<td align="center" class="esd-block-spacer" height="40"></td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr><tr>
						<td class="esd-structure es-p10b es-p20r es-p20l" align="left">
							<table cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td width="560" class="esd-container-frame" align="center" valign="top">
											<table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 5px; border-collapse: separate;">
												<tbody>
													<tr>
														<td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px;"><a href="http://somashop.com" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #cc0000;	border-width: 10px 30px 10px 30px; display: inline-block;background: #cc0000;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif;	font-weight: normal;font-style: normal;	line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">SHOP NOW</a></span></td>
													</tr>
													<tr>
														<td align="left" class="esd-block-text es-p20t es-p10b">
															<p style="margin-top:0px;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-left: 30px;padding-right: 30px;">Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:info@somashop.com">info@somashop.com</a>&nbsp;or give us a call at&nbsp;<a target="_blank" href="tel:+919116653338">+91 9116653338</a></p>
															<p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-left: 30px;padding-right: 30px;">Thanks,<br />Soma Block prints Pvt. Ltd.</p>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>`;

          var emailContent2 = `<tr>
                    <td class="esd-structure es-p30t es-p10b es-p20r es-p20l" align="left">
                        <table cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                                <tr>
                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;">
                                                        <img src="http://143.110.190.232/assets/images/78501618239341906.png" alt="" style="display: block; margin-top:40px;width:100px” width="100">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                                        <h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Your email has been verified</h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-left:30px;padding-right:30px">We will keep you updated with the latest novelties, discounts, sales, new and seasonal collections, as well as events and news!</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
<tr>
                    <td class="esd-structure es-p30b es-p20r es-p20l" align="left">
                        <table cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                                <tr>
                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                        <table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 5px; border-collapse: separate;">
                                            <tbody>
                                                <tr>
                                                    <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px;"><a href="http://143.110.190.232/" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #cc0000;   border-width: 10px 30px 10px 30px; display: inline-block;background: #cc0000;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif; font-weight: normal;font-style: normal; line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">GO SHOPPING</a></span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>`;

          let mailService = new MailService();
          await mailService.userMail(
            data.email,
            "Register Confirmation",
            emailContent,
            async function (response) {
              if (response) {
                await mailService.userMail(
                  data.email,
                  "Email Verified",
                  emailContent2,
                  function (response) {}
                );
                if (data) {
                  res.status(200).json({
                    success: 1,
                    data: data,
                    message: "User verified email",
                  });
                } else {
                  res
                    .status(200)
                    .json({ success: 0, message: "No Results Found" });
                }
              } else {
                res
                  .status(200)
                  .json({ success: 0, message: "No Results Found" });
              }
            }
          );
        });
      });
  } catch (error) {
    res.status(200).json({ success: 0, message: "Error while updating user." });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    user
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then(async (userFetchResponse) => {
        if (userFetchResponse) {
          res.status(200).json({
            success: 1,
            message: "Email already exists!",
            isExist: true,
            data: {},
          });
        } else {
          res.status(200).json({
            success: 0,
            message: "Email is not exists!",
            isExist: false,
            data: {},
          });
        }
      });
  } catch (error) {
    res.status(200).send({
      success: 0,
      message: "error!",
    });
  }
};
