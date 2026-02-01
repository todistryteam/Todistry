var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var familyTree = require("../models/familyTree.model");
var familyMember = require("../models/familyMember.model");
var users = require("../models/user.model");
var env = require("../../config/environment");
var jwt = require("jsonwebtoken");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, callback) { 
     callback(null, env.user_image_path);
  },
  filename: function (req, file, callback) {
    let extArray = file.mimetype.split("/");
    let random_num = Math.floor(Math.random() * 90000) + 10000;
    let extension = extArray[extArray.length - 1];
    callback(
      null,
      "tree_" + random_num + "-" + Date.now().toString() + "." + extension
    );
  },
});
var upload = multer({ storage: storage });
  
async function getFamilyMember(dataObj, reqType) {
  try{
        let memberObj = {};
        
        if(reqType == 'getBiologicalFather'){  
          memberObj = await familyMember.findOne({
            where: {
              treeId: dataObj.treeId,
              parentId: dataObj.parentId,
              parentType: 'biological',
              memberType: 'Parents',
              gender: 'M',
              isDeleted:'No'
            },
          }); 
        }

        if(reqType == 'getBiologicalMother'){ 

          memberObj = await familyMember.findOne({
            where: {
              treeId: dataObj.treeId,
              parentId: dataObj.parentId,
              parentType: 'biological',
              memberType: 'Parents',
              gender: 'F',
              isDeleted:'No'
            },
          });
          
          /* if(fatherObj?.id > 0){
            memberObj = await familyMember.findOne({
              where: {
                treeId: dataObj.treeId,
                parentId: fatherObj.id,
                parentType: 'biological',
                memberType: 'Spouse',
                gender: 'F',
              },
            }); 
          }else{
            memberObj = await familyMember.findOne({
              where: {
                treeId: dataObj.treeId,
                parentId: dataObj.parentId,
                parentType: 'biological',
                memberType: 'Spouse',
                gender: 'F',
              },
            }); 
          } */
          
        }

        if(reqType == 'getFosterFather'){  
          memberObj = await familyMember.findOne({
            where: {
              treeId: dataObj.treeId,
              parentId: dataObj.parentId,
              parentType: 'fosterParent',
              memberType: 'Parents',
              gender: 'M',
              isDeleted:'No'
            },
          }); 
        }

        if(reqType == 'getFosterMother'){ 
          memberObj = await familyMember.findOne({
            where: {
              treeId: dataObj.treeId,
              parentId: dataObj.parentId,
              parentType: 'fosterParent',
              memberType: 'Parents',
              gender: 'F',
              isDeleted:'No'
            },
          }); 
        } 

        if(reqType == 'getAdoptiveFather'){  
          memberObj = await familyMember.findOne({
            where: {
              treeId: dataObj.treeId,
              parentId: dataObj.parentId,
              parentType: 'adoptiveParent',
              memberType: 'Parents',
              gender: 'M',
              isDeleted:'No'
            },
          }); 
        }

        if(reqType == 'getAdoptiveMother'){ 
          memberObj = await familyMember.findOne({
            where: {
              treeId: dataObj.treeId,
              parentId: dataObj.parentId,
              parentType: 'adoptiveParent',
              memberType: 'Parents',
              gender: 'F',
              isDeleted:'No'
            },
          });
          
        } 
        if(reqType == 'getGodFather'){  
          memberObj = await familyMember.findOne({
          where: {
            treeId: dataObj.treeId,
            parentId: dataObj.parentId,
            parentType: 'godParent',
            memberType: 'Parents',
            gender: 'M',
            isDeleted:'No'
          },
        }); 
      }

      if(reqType == 'getGodMother'){ 
          memberObj = await familyMember.findOne({
          where: {
            treeId: dataObj.treeId,
            parentId: dataObj.parentId,
            parentType: 'godParent',
            memberType: 'Parents',
            gender: 'F',
            isDeleted:'No'
          },
        });
        
      }
      if(reqType == 'getSecondaryFather'){  
        memberObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.parentId,
          parentType: 'secondaryParent',
          memberType: 'Parents',
          gender: 'M',
          isDeleted:'No'
        },
      }); 
      }

      if(reqType == 'getSecondaryMother'){ 
        memberObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.parentId,
          parentType: 'secondaryParent',
          memberType: 'Parents',
          gender: 'F',
          isDeleted:'No'
        },
      });
      
      }  
        return memberObj?.id > 0 ? memberObj : false;
  } catch (error) {
    console.log("errorerror", error);
    return {};
  }    
}; 

async function updateParentData(dataObj,gender) {
  try{
      console.log('dataObj.treeLevel',dataObj.treeLevel);
      let boiFatherObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.reqData.parentId,
          parentType:'biological',
          gender:gender
        },
        order: [['id', 'DESC']],
      });
      let fosterFatherObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.reqData.parentId,
          parentType:'fosterParent',
          gender:gender
        },
      });
      let adoptiveFatherObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.reqData.parentId,
          parentType:'adoptiveParent',
          gender:gender
        },
      });
      let godFatherObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.reqData.parentId,
          parentType:'godParent',
          gender:gender
        },
      });
      
      let secondaryFatherObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.reqData.parentId,
          parentType:'secondaryParent',
          gender:gender
        },
      });
      const fathersArray = []; 
      if(boiFatherObj && boiFatherObj?.id > 0){
        fathersArray.push(boiFatherObj?.id.toString()); 
      }else{
        fathersArray.push("");
      }
      if(fosterFatherObj && fosterFatherObj?.id > 0){
        fathersArray.push(fosterFatherObj?.id.toString()); 
      }else{
        fathersArray.push("");
      }
      if(adoptiveFatherObj && adoptiveFatherObj?.id > 0){
        fathersArray.push(adoptiveFatherObj?.id.toString()); 
      }else{
        fathersArray.push("");
      }
      if(godFatherObj && godFatherObj?.id > 0){
        fathersArray.push(godFatherObj?.id.toString()); 
      }else{
        fathersArray.push("");
      }
      if(secondaryFatherObj && secondaryFatherObj?.id > 0){
        fathersArray.push(secondaryFatherObj?.id.toString()); 
      }else{
        fathersArray.push("");
      }
      return fathersArray;
  } catch (error) {
    console.log("errorerror", error);
    return {};
  }
}

async function getLevel(dataObj) {
  try{
    // Fetch the current member data
    let memberObj = await familyMember.findOne({
      where: {
        id: dataObj.parentId
      },
    });
  
    // If no member is found, return null
    if (!memberObj) {
      console.log("Reached root node:", memberObj);
      return { parentId: 0, level: dataObj?.level };
    }
    
   
    // Stop the recursion when parentId is 0
    if (memberObj.parentId === 0) {
      return { parentId: memberObj.parentId, level: dataObj?.level + 1 };
    }
    let level = memberObj && memberObj.gender == "M" ? dataObj?.level + 1 : level;

    // Recursively call getLevel for the parent
    return await getLevel({ parentId: memberObj.parentId, level: level });

  } catch (error) {
    console.log("errorerror", error);
    return {};
  }
}

async function updateFatherDataNew(dataObj) {
  try {
    let memberObj = await familyMember.findOne({
      where: {
        treeId: dataObj.treeId,
        id: dataObj.reqData.parentId,
      },
    });

    let gender = dataObj.reqData.gender;
    let parentType = dataObj.reqData.parentType;
    let memberType = dataObj.reqData.memberType;
    let parentId = dataObj.reqData.parentId;

    if (memberType == "Child") {
      const childrensArray = memberObj.childrens
        ? JSON.parse(memberObj.childrens)
        : [];
      childrensArray.push(dataObj.newFamilyMemberId.toString());
      console.log("childrensArray", childrensArray);
      let updateData = {
        childrens: JSON.stringify(childrensArray),
      };

      await familyMember.update(updateData, {
        where: {
          id: parentId,
        },
      });
    }
    if (memberType == "Spouse") {
      const spousesArray = memberObj.spouses
        ? JSON.parse(memberObj.spouses)
        : [];
      spousesArray.push(dataObj.newFamilyMemberId.toString());
      console.log("spousesArray", spousesArray);
      let updateData = {
        spouses: JSON.stringify(spousesArray),
      };

      await familyMember.update(updateData, {
        where: {
          id: parentId,
        },
      });
    }
    console.log("memberType", memberType);

    if (memberType == "Siblings" && parentId > 0) {
      let updateData2 = {
        mothers: memberObj.mothers,
        fathers: memberObj.fathers,
      };
      await familyMember.update(updateData2, {
        where: {
          id: dataObj.newFamilyMemberId,
        },
      });
      let famReq = {};
      famReq.treeId = dataObj.treeId;
      famReq.parentId = parentId;
      console.log("famReq", famReq);
      let getBiologicalFatherData = await getFamilyMember(
        famReq,
        "getBiologicalFather"
      );
      console.log("getBiologicalFatherData", getBiologicalFatherData);
      if (getBiologicalFatherData) {
        let childrensArray = getBiologicalFatherData.childrens
          ? JSON.parse(getBiologicalFatherData.childrens)
          : [];
        childrensArray.push(dataObj.newFamilyMemberId.toString());
        console.log("childrensArray", childrensArray);
        let updateData = {
          childrens: JSON.stringify(childrensArray),
        };
        await familyMember.update(updateData, {
          where: {
            id: getBiologicalFatherData.id,
          },
        });
      }
      console.log("famReq Mother", famReq);
      let getBiologicalMother = await getFamilyMember(
        famReq,
        "getBiologicalMother"
      );
      console.log("getBiologicalMother", getBiologicalMother);
      if (getBiologicalMother) {
        let childrensArray = getBiologicalMother.childrens
          ? JSON.parse(getBiologicalMother.childrens)
          : [];
        childrensArray.push(dataObj.newFamilyMemberId.toString());
        console.log("childrensArray", childrensArray);
        let updateData = {
          childrens: JSON.stringify(childrensArray),
        };
        await familyMember.update(updateData, {
          where: {
            id: getBiologicalMother.id,
          },
        });
      }
    }

    if (
      (memberType == "Parents" || memberType == "Spouse") &&
      parentId > 0 &&
      (parentType == "biological" ||
        parentType == "adoptiveParent" ||
        parentType == "fosterParent" ||
        parentType == "godParent" ||
        parentType == "secondaryParent")
    ) {
      let childrensArray = [];
      if (!childrensArray.includes(parentId.toString())) {
        childrensArray.push(parentId.toString());
      }
      console.log("childrensArrayss", childrensArray);

      let updateData2 = {
        childrens: JSON.stringify(childrensArray),
      };
      await familyMember.update(updateData2, {
        where: {
          id: dataObj.newFamilyMemberId,
        },
      });
      let genderRev = gender == "M" ? "F" : "M";
      let spouseObj = await familyMember.findOne({
        where: {
          treeId: dataObj.treeId,
          parentId: dataObj.reqData.parentId,
          parentType: parentType,
          gender: genderRev,
        },
      });
      if (spouseObj) {
        let spousesArray = spouseObj.spouses
          ? JSON.parse(spouseObj.spouses)
          : [];
        if (!spousesArray.includes(dataObj.newFamilyMemberId.toString())) {
          spousesArray.push(dataObj.newFamilyMemberId.toString());
        }

        let updateData = {
          spouses: JSON.stringify(spousesArray),
        };
        await familyMember.update(updateData, {
          where: {
            id: spouseObj.id,
          },
        });
      }

      if (gender == "M") {
        let fathersArray = await updateParentData(dataObj, gender);
        console.log("fathersArrayss", fathersArray);

        let updateData = {
          fathers: JSON.stringify(fathersArray),
        };
        console.log("spouseObj ",spouseObj);
        if (spouseObj) {
          let spousesArray = memberObj.spouses
            ? JSON.parse(memberObj.spouses)
            : [];
          if (!spousesArray.includes(spouseObj.id.toString())) {
            spousesArray.push(spouseObj.id.toString());
          }
          let updateData2={
            spouses : JSON.stringify(spousesArray)
          }
          await familyMember.update(updateData2, {
            where: {
              id: dataObj.newFamilyMemberId,
            },
          });
        }
        await familyMember.update(updateData, {
          where: {
            id: parentId,
          },
        });
      } else if (gender == "F") {
        let mothersArray = await updateParentData(dataObj, gender);
        console.log("mothersArraysss", mothersArray);
        let updateData = {
          mothers: JSON.stringify(mothersArray),
        };
        if (spouseObj) {
          let spousesArray = [];
          if (!spousesArray.includes(spouseObj.id.toString())) {
            spousesArray.push(spouseObj.id.toString());
          }
          let updateData2 = {
            spouses: JSON.stringify(spousesArray),
          };
          await familyMember.update(updateData2, {
            where: {
              id: dataObj.newFamilyMemberId,
            },
          });
        }
        await familyMember.update(updateData, {
          where: {
            id: parentId,
          },
        });
      } else {
      }
    }

    return true;
  } catch (error) {
    console.log("errorerror", error);
    return {};
  }
}

exports.create = async (req, res) => {
  try {
    
    var sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    var user_id = sessionData.user_id; 
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

        familyTree
          .findOne({
            where: {
              userId: user_id,
            },
          })
          .then(async (familyTreeDataResponse) => { 
            if (
              familyTreeDataResponse &&
              Object.keys(familyTreeDataResponse).length > 0
            ) {
              var treeId = familyTreeDataResponse.id;
              
              let spouseType = req.body.spouseType;
              let memberType = req.body.memberType || "Parents";
              let parentType = req.body.parentType;
              let parentId = req.body.parentId;
              let gender = req.body.gender;
              let is_foster_parent = 0;
              let is_foster_child = 0;
              let is_adopted_parent = 0;
              let is_adopted_child = 0;
              let is_god_parent = 0;
              let is_god_child = 0;
              let is_secondary_parent = 0;
              let is_secondary_child = 0;
              let reqObj = {};
              let fathersArr = JSON.stringify([]);
              let mothersArr = JSON.stringify([]);
              let isValidated = 1;
              reqObj.treeId = treeId;
              reqObj.parentId = parentId; 
              
              
              if(parentId > 0 && parentType == "biological"){ 
                if(gender == "M"){
                  let getBiologicalFatherData = await getFamilyMember(reqObj,"getBiologicalFather");              
                  if (getBiologicalFatherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "Biological Father Already Exists!!" });
                        isValidated = 0;
                  }
                }

                if(gender == "F"){
                  let getBiologicalMotherData = await getFamilyMember(reqObj,"getBiologicalMother");
                  if (getBiologicalMotherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "Biological Mother Already Exists!!" });
                        isValidated = 0;
                  }else{                  
                    //let getBiologicalFatherData = await getFamilyMember(reqObj,"getBiologicalFather");
                    //if(getBiologicalFatherData){
                    //    parentId = getBiologicalFatherData.id;
                    //    memberType = "Spouse";
                    //} 
                  }
                }
              }

              if(parentId > 0 && parentType == "adoptiveParent"){

                if(gender == "M"){
                  let getAdoptiveFatherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getAdoptiveFather");
                  if (getAdoptiveFatherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "Adoptive Father Already Exists!!" });
                        isValidated = 0;
                  }else{
                      //let getAdoptiveFatherData = await updateAdoptiveParent({treeId:treeId,parentId:parentId});
                  }
                }

                if(gender == "F"){
                  let getAdoptiveMotherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getAdoptiveMother");
                  if (getAdoptiveMotherData) {
                        res
                         .status(200)
                        .json({ success: 0, message: "Adoptive Mother Already Exists!!" });
                        isValidated = 0;
                  }else{
                     // let getAdoptiveFatherData = await updateAdoptiveParent({treeId:treeId,parentId:parentId});
                  }
                }
                is_adopted_parent = 1;
                //memberType = "Spouse";
                
              }else if(parentId > 0 && parentType == "fosterParent"){
                if(gender == "M"){
                  let getFosterFatherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getFosterFather");
                  if (getFosterFatherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "Foster Father Already Exists!!" });
                        isValidated = 0;
                  }else{
                    
                      //let getAdoptiveFatherData = await updateAdoptiveParent({treeId:treeId,parentId:parentId});
                      //let getFosterData = await updateFosterParent({treeId:treeId,parentId:parentId});
                  }
                }

                if(gender == "F"){
                  let getFosterMotherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getFosterMother");
                  if (getFosterMotherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "Foster Mother Already Exists!!" });
                        isValidated = 0;
                  }else{
                      //let getAdoptiveFatherData = await updateAdoptiveParent({treeId:treeId,parentId:parentId});
                      //let getFosterData = await updateFosterParent({treeId:treeId,parentId:parentId});
                  }
                }
                is_foster_parent = 1;
               // memberType = "Spouse";

                //let getBiologicalFatherData = await getFamilyMember(reqObj,"getBiologicalFather");
                //  if(getBiologicalFatherData){
                      //parentId = getBiologicalFatherData.id;
                //  } 

              }else if(parentId > 0 && parentType == "godParent"){
                if(gender == "M"){
                  let getGodFatherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getGodFather");
                  if (getGodFatherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "God Father Already Exists!!" });
                        isValidated = 0;
                  }else{
                     
                  }
                }

                if(gender == "F"){
                  let getGodMotherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getGodMother");
                  if (getGodMotherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "God Mother Already Exists!!" });
                        isValidated = 0;
                  }else{ 
                  }
                }
                is_god_parent = 1;

              }else if(parentId > 0 && parentType == "secondaryParent"){
                if(gender == "M"){
                  let getSecondaryFatherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getSecondaryFather");
                  if (getSecondaryFatherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "Secondary Father Already Exists!!" });
                        isValidated = 0;
                  }else{
                     
                  }
                }

                if(gender == "F"){
                  let getSecondaryMotherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getSecondaryMother");
                  if (getSecondaryMotherData) {
                        res
                        .status(200)
                        .json({ success: 0, message: "Secondary Mother Already Exists!!" });
                        isValidated = 0;
                  }else{ 
                  }
                }
                is_secondary_parent = 1;
              }else{

              }
            
              
              if(parentId > 0 && spouseType == "Wife"){
                  let getBiologicalMotherData = await getFamilyMember({treeId:treeId,parentId:parentId},"getBiologicalMother");
                  console.log('getBiologicalMotherData',getBiologicalMotherData);
                  if (getBiologicalMotherData) {
                      parentType = "";  
                  }else{
                      parentType = "biological";  
                  }         
              } 
              let childType = req.body.childType;
              let siblingType = req.body.siblingType;
              if(memberType == "Child"){
                  if(childType == 'godChild'){
                    is_god_child = 1;
                  }else if(childType == 'foster'){
                    is_foster_child = 1;
                  }else if(childType == 'adoptive'){
                    is_adopted_child = 1;
                  }else if(childType == 'secondary'){
                    is_secondary_child = 1;
                  }
               }

               if(memberType == "Siblings"){
                  if(siblingType == 'god'){
                    is_god_child = 1;
                  }else if(siblingType == 'foster'){
                    is_foster_child = 1;
                  }else if(siblingType == 'adoptive'){
                    is_adopted_child = 1;
                  }else if(siblingType == 'secondary'){
                    is_secondary_child = 1;
                  }  
              }
              console.log('req.body',req.body);
              console.log('parentId',parentId);
              let treeMemData = await getLevel({ treeId: treeId, parentId: parentId, level: 0 });
              console.log('treeMemData',treeMemData);
              console.log("Initial treeMemData:", treeMemData);
              
              if (treeMemData && treeMemData.parentId > 0) {
                let treeMemData2 = await getLevel({ parentId: treeMemData.parentId, level: treeMemData.level });
                console.log("Second-level treeMemData2:", treeMemData2);
              } else {
                console.log("Reached the root or no parent found.", treeMemData);
              }
                console.log('isValidated',isValidated);

              if( isValidated == 1){
                const newFamilyMember = await familyMember.create({
                  nameSuffix: req.body.nameSuffix,
                  relationShipToAdmin: req.body.relationShipToAdmin,
                  nickNameSuffix: req.body.nickNameSuffix,
                  firstName: req.body.firstName,
                  middleName: req.body.middleName,
                  lastName: req.body.lastName,
                  image: image,
                  treeId: treeId,
                  treeLevel: treeMemData?.level || 0,
                  userId: user_id,
                  motherId: req.body.motherId || 0, 
                  memberType: memberType,
                  siblingType: req.body.siblingType || "sameParent",
                  siblingType2: req.body.siblingType2 || "",
                  parentId: parentId || 0,
                  is_foster_parent: is_foster_parent || 0,
                  is_foster_child: is_foster_child || 0,
                  is_adopted_parent: is_adopted_parent || 0,
                  is_adopted_child: is_adopted_child || 0,
                  is_god_parent: is_god_parent || 0,
                  is_god_child: is_god_child || 0,
                  is_secondary_parent: is_secondary_parent || 0,
                  is_secondary_child: is_secondary_child || 0,
                  fathers: fathersArr,
                  mothers: mothersArr,
                  birthDate: req.body.birthDate,
                  gender: gender,
                  birthDay: req.body.birthDay,
                  parentType: parentType,
                  childType: req.body.childType, 
                  email: req.body.email,
                  website: req.body.website,
                  blog: req.body.blog,
                  homePhone: req.body.homePhone,
                  workPhone: req.body.workPhone,
                  mobile: req.body.mobile,
                  steetNumber: req.body.steetNumber,
                  aptNumber: req.body.aptNumber,
                  city: req.body.city,
                  state: req.body.state,
                  zipCode: req.body.zipCode,
                  birthFirstName: req.body.birthFirstName,
                  birthLastName: req.body.birthLastName,
                  nickName: req.body.nickName,
                  birthCity: req.body.birthCity,
                  birthState: req.body.birthState,
                  birthPlace: req.body.birthPlace,
                  profession: req.body.profession,
                  company: req.body.company,
                  interests: req.body.interests,
                  activities: req.body.activities,
                  bioNotes: req.body.bioNotes
                }); 
                req.body.treeLevel = treeMemData?.level;
                console.log('newFamilyMember',newFamilyMember)
                let updateFatherData = await updateFatherDataNew({treeId:treeId,newFamilyMemberId:newFamilyMember.id,reqData:req.body});
                console.log('updateFatherData',updateFatherData);

                let treeData = await getTreeData(treeId);
                if (treeData) {
                  res
                    .status(200)
                    .json({ success: 1, data: treeData, message: "success!" });
                } else {
                  res
                    .status(200)
                    .json({ success: 0, message: "No Results Found" });
                }
              }else{
                res
                    .status(200)
                    .json({ success: 0, message: "Data Validation issue found!!" });
              }
              
            } else {
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
                  userId: user_id,
                  treeName: "family-tree-" + treeName,
                  slug: "family-tree-" + treeName,
                  shareDescription:
                    req.body.shareDescription || "family-tree-" + treeName,
                  familyCode: familyCode,
                  isPublished: req.body.Published || "UnPulished",
                  status: "Active",
                  isDeleted: "No",
                  treeCode:treeCode,
                })
                .then(async (familyTreeData) => {
                  var treeId = familyTreeData.id;
                  users
                    .create({
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      image: image,
                      treeId: treeId,
                      status: "Active",
                      birthDate: req.body.birthDate,
                      gender: req.body.gender,
                      birthDay: req.body.birthDay,
                      childType: req.body.childType,
                    })
                    .then(async (usersData) => {
                      var profileID = usersData.id;

                      familyMember.create({
                        nameSuffix: req.body.nameSuffix,
                        relationShipToAdmin: req.body.relationShipToAdmin,
                        nickNameSuffix: req.body.nickNameSuffix,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        image: image,
                        treeId: treeId,
                        userId: user_id,
                        profileId: profileID,
                        parentId: req.body.parentId || 0,
                        treeLevel: req.body.treeLevel || 0,
                        birthDate: req.body.birthDate,
                        gender: req.body.gender,
                      });
                      let treeData = await getTreeData(treeId);
                      if (treeData) {
                        res.status(200).json({
                          success: 1,
                          data: treeData,
                          message: "success!",
                        });
                      } else {
                        res
                          .status(200)
                          .json({ success: 0, message: "No Results Found" });
                      }
                    })
                    .catch(function (err) {
                      console.log(err);
                      res.status(200).json({ success: 0, message: err });
                    });
                })
                .catch(function (err) {
                  console.log(err);
                  res.status(200).json({ success: 0, message: err });
                });
            }
          })
          .catch(function (err) {
            res.status(200).json({ success: 0, message: err });
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ success: 0, message: err.message });
  }
};

exports.memberDetails = async (req, res) => {  
  try {
    const familyMemberData = await familyMember.findOne({
      where: { id: req.body.id },
    });

    if (!familyMemberData) {
      return res.status(200).json({ success: 0, message: "fail!" });
    }

    // Convert to plain object
    const data = familyMemberData.toJSON();

    // Safely parse children and spouses
    const childrenArray = typeof data.children === "string"
      ? JSON.parse(data.children.replace(/'/g, '"'))
      : data.children || [];

    const spousesArray = typeof data.spouses === "string"
      ? JSON.parse(data.spouses.replace(/'/g, '"'))
      : data.spouses || [];

    // Determine delete button visibility
    const isdeletebutton =
      data.parentId != 0 &&
      data.treeLevel != 0 &&
      ((childrenArray.length > 0 && spousesArray.length === 0) || childrenArray.length === 0);

    // Merge into data object
    data.isdeletebutton = isdeletebutton;

    res.status(200).json({
      success: 1,
      message: "success!",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching member details:", error);
    res.status(500).json({ success: 0, message: "Server error" });
  }
};

exports.profileDetails = async (req, res) => {  
  const familyMemberData = await familyMember.findOne({
    where: {
      userid: req.body.id,
      treeLevel:0
    },
  });

  if (familyMemberData) {
    res.status(200).json({ success: 1, message: "success!",data:familyMemberData });
  }else{
    res.status(200).json({ success: 0, message: "fail!" });
  }
}

exports.update = async (req, res) => {
  try {
    await upload.any()(req, res, async function (err) {
      if (err) {
        if (err instanceof multer.MulterError) {
          // Handle specific Multer errors
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ success: 0, message: 'File size too large. Maximum size is 2 MB.' });
          }
          return res.status(400).json({ success: 0, message: err.message });
        } else if (err) {
          // Handle unknown errors
          return res.status(400).json({ success: 0, message: `File upload error: ${err.message}` });
        }
      }
      if (req.body.isError) {
        res.status(200).json({
          success: 0,
          message: req.body.message,
        });
      } else {
        let image = "";
        if (req.files && req.files.length > 0) {
          for (let i = 0; i < req.files.length; i++) {
            if (req.files[i].fieldname === "image") {
              image = req.files[i].filename;
            }
          }
        }

        const familyMemberData = await familyMember.findOne({
          where: {
            id: req.body.id,
            // Add more conditions if necessary (e.g., parentId, profileId, etc.)
          },
        });

        if (familyMemberData) {
          // Create an object with fields to update
          const updateData = {
            nameSuffix: req.body.nameSuffix,
            relationShipToAdmin: req.body.relationShipToAdmin,
            nickNameSuffix: req.body.nickNameSuffix,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            email: req.body.email, // Adding email to update
            website: req.body.website, // Adding website to update
            blog: req.body.blog, // Adding blog to update
            homePhone: req.body.homePhone, // Adding home phone to update
            workPhone: req.body.workPhone, // Adding work phone to update
            steetNumber: req.body.steetNumber,
            aptNumber: req.body.aptNumber,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            mobile: req.body.mobile,
            birthFirstName: req.body.birthFirstName,
            birthLastName: req.body.birthLastName,
            nickName: req.body.nickName,
            birthCity: req.body.birthCity, // Adding birth city to update
            birthState: req.body.birthState, // Adding birth state to update
            birthPlace: req.body.birthPlace, // Adding birth place to update
            profession: req.body.profession, // Adding profession to update
            company: req.body.company, // Adding company to update            
            interests: req.body.interests, // Adding interests to update
            activities: req.body.activities, // Adding activities to update
            bioNotes: req.body.bioNotes,
            birthDay: req.body.birthDay,
          };

          // Only include the image field if it's not empty
          if (image) {
            updateData.image = image;
          }
         
          // Update existing family member
          var update = await familyMember.update(updateData, {
            where: {
              id: familyMemberData.id,
            },
          });

          if (update) {
            res.status(200).json({ success: 1, message: "success!" });
          } else {
            res.status(200).json({ success: 0, message: "No Results Found" });
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ success: 0, message: err.message });
  }
};
 
exports.index = async (req, res) => {
  try {
    let treeData = await getTreeData("", req);
    if (treeData) {
      res.status(200).json({ success: 1, data: treeData, message: "success!" });
    } else {
      res.status(200).json({ success: 0, message: "No Results Found" });
    }
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.getTreeDetails = async (req, res) => {
  let whereClause = {};
    let sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    let user_id = sessionData.user_id;
    whereClause.userId = user_id;
    let treeData = await familyTree.findOne({ where: whereClause });
    if (!treeData) {
      var responce= { success: 0, message: "Tree data not found!" };
    }else{
      var url=`https://todistry.com/apptree/?treeId=${treeData.id}`;
      var responce=  { success: 1, message: "Tree data found!",data:treeData ,url:url};
    }
    res.status(200).json(responce);
}
  
exports.getTreeNew = async (req, res) => {
  try {
    let treeData = await getTreeJsonNew("", req);
    if (treeData.success == 1) {
      res
        .status(200)
        .json({ success: 1, data: treeData.data, message: "success!" });
    } else if (treeData.success == 0) {
      res.status(200).json(treeData);
    } else {
      res.status(200).json({ success: 0, message: "No Results Found" });
    }
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.appgetTree = async (req, res) => {
  try {
    var treeData
  if(req.body.id){
     treeData = await getTreeJsonNew(req.body.id, req);
  }
    if (treeData.success == 1) {
      res
        .status(200)
        .json({ success: 1, data: treeData.data, message: "success!" });
    } else if (treeData.success == 0) {
      res.status(200).json(treeData);
    } else {
      res.status(200).json({ success: 0, message: "No Results Found" });
    }
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.getParentList = async (req, res) => {
  try {
    let treeData = await getParentList(req);
    if (treeData) {
      res.status(200).json({ success: 1, data: treeData, message: "success!" });
    } else {
      res.status(200).json({ success: 0, message: "No Results Found" });
    }
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

exports.getById = async (req, res) => {
  try {
    let treeData = await getTreeData(req.body.id);
    if (treeData) {
      res.status(200).json({ success: 1, data: treeData, message: "success!" });
    } else {
      res.status(200).json({ success: 0, message: "No Results Found" });
    }
  } catch (error) {
    res.status(200).json({ success: 0, message: "error!" });
  }
};

//delete family member 21-04-2025
exports.remove = async (req, res) => {
  try {
    
    familyMember
      .update(
        {
          isDeleted: "Yes",
        },
        {
          returning: true,
          where: {
            id: req.body.id,
          },
        } 
      )
      .then(function () {
        res.status(200).json({ success: 1, message: "Removed successfully." });
      });
  } catch (error) {
    res.status(200).json({
      success: 0,
      message: "Error while removing.",
    });
  }
};

// 26-04-2025
exports.removeMember = async (req, res) => {
  try {
    await upload.any()(req, res, async function (err) {
      if (req.body.id > 0) {
        const idToRemove = req.body.id;

        // Find all family members first
        const allMembers = await familyMember.findAll();

        const undoAction = []; // ← Collect undo snapshots here

        // Loop through each member and clean their arrays
        for (const member of allMembers) {
          let updatedData = {};
          let originalData = { id: member.id };
          
          ['fathers', 'mothers', 'spouses', 'childrens', 'halfsibling'].forEach(field => {
            
            if (member[field] && member[field] !== 'null' && member[field] !== '[]' && member[field].trim() !== '') {
              let arrayData = JSON.parse(member[field]);
              
              if (Array.isArray(arrayData)) {
                // Filter out the ID
                const newArray = arrayData.filter(e => e.toString() !== idToRemove.toString());
                if(member.id == 1){
                  console.log('idToRemove',idToRemove); 
                  console.log('newArray',newArray); 
                }
                // Update only if it actually changed
                if (arrayData.length !== newArray.length) {
                  // Save original field for undo
                  originalData[field] = member[field];

                  updatedData[field] = JSON.stringify(newArray);
                }
              }
            }
            
          });
          undoAction.push(originalData);
          await member.update(updatedData);
        }

        await familyMember.update(
          { 
            isDeleted: "Yes",
            undoAction: JSON.stringify(undoAction)
           },
          {
            returning: true,
            where: { id: idToRemove },
          }
        );

        res.status(200).json({
          success: 1,
          message: "Removed successfully and cleaned all references.",
        });
      } else {
        res.status(400).json({
          success: 0,
          message: "Invalid ID provided.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: "Server error while removing member.",
    });
  }
};

exports.undoRemoveMember = async (req, res) => {
  try {
    await upload.any()(req, res, async function (err) {

    const { id } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: 0,
        message: "Invalid member ID.",
      });
    }

    // Step 1: Get the deleted member with undoAction
    const member = await familyMember.findOne({ where: { id } });

    if (!member || member.isDeleted !== 'Yes') {
      return res.status(404).json({
        success: 0,
        message: "Deleted member not found.",
      });
    }

    if (!member.undoAction) {
      return res.status(400).json({
        success: 0,
        message: "No undo action found for this member.",
      });
    }

    // Step 2: Parse undoAction
    const undoActionArray = JSON.parse(member.undoAction);

    for (const original of undoActionArray) {
      const relatedMember = await familyMember.findOne({ where: { id: original.id } });
      if (!relatedMember) continue;

      let restoreData = {};

      ['fathers', 'mothers', 'spouses', 'childrens', 'halfsibling'].forEach(field => {
        if (original[field] !== undefined) {
          restoreData[field] = original[field]; // it's already a JSON string
        }
      });

      await relatedMember.update(restoreData);
    }

    // Step 3: Restore deleted member
    await member.update({
      isDeleted: 'No',
      undoAction: null, // Clear undo after applying
    });

    return res.status(200).json({
      success: 1,
      message: "Undo successful. Member and relationships restored.",
    });
    
    });
  } catch (error) {
    console.error("Undo Remove Error:", error);
    return res.status(500).json({
      success: 0,
      message: "Server error while undoing member removal.",
    });
  }
};

async function getTreeJsonNew(treeId, req = {}) {
  try {
    console.log("req.body.selectedId", req.body.selectedId);

    let whereClause = {};
    if (typeof treeId !== "undefined" && treeId > 0) {
      whereClause.id = treeId;
    } else {
      let sessionData = await jwt.verify(
        req.headers.accesstoken,
        env.ACCESS_TOKEN_SECRET
      );
      let user_id = sessionData.user_id;
      whereClause.userId = user_id;
      console.log("tree function user_id", user_id);
    }

    // Fetch tree data
    let treeData = await familyTree.findOne({ where: whereClause });
    if (!treeData) {
      return { success: 0, message: "Tree data not found!" };
    }

    let members = await familyMember.findAll({
      where: { treeId: treeData.id, isDeleted: "No" },
    });
    treeData = treeData.toJSON(); // Convert Sequelize instance to plain object
      
    // Map members to desired tree structure
    treeData.members = members.map((member) => {
      let color_class = member.id === treeData.memberid ? "root" : undefined;
      color_class =
        member.id == parseInt(req.body.selectedId)
          ? "searchedNode"
          : color_class;
        

      let is_foster_parent = member.is_foster_parent == 1 ? true : false;
      let is_foster_child = member.is_foster_child == 1 ? true : false;
      let is_adopted_parent = member.is_adopted_parent == 1 ? true : false;
      let is_adopted_child = member.is_adopted_child == 1 ? true : false;
      let is_god_child = member.is_god_child == 1 ? true : false;
      let is_god_parent = member.is_god_parent == 1 ? true : false;
 
      return {
        id: member.id.toString(),
        gender: member.gender,
        rels: {
          is_foster_parent: is_foster_parent,
          is_foster_child: is_foster_child,
          is_adopted_parent: is_adopted_parent,
          is_adopted_child: is_adopted_child,
          is_god_parent: is_god_parent,
          is_god_child: is_god_child,
          spouses: member.spouses ? JSON.parse(member.spouses) : [],
          father: member.fathers ? JSON.parse(member.fathers) : [],
          mother: member.mothers ? JSON.parse(member.mothers) : [],
          children: member.childrens ? JSON.parse(member.childrens) : [],
          halfsibling: [],
        },
        data: {
          nameSuffix: member.nameSuffix,
          relationShipToAdmin: member.relationShipToAdmin,
          nickNameSuffix: member.nickNameSuffix,
          first_name: member.firstName,
          middle_name: member.middleName,
          last_name: member.lastName,
          email: member.email, // Getting email
          website: member.website, // Getting website URL
          blog: member.blog, // Getting blog URL
          homePhone: member.homePhone, // Getting home phone number
          workPhone: member.workPhone,
          mobile: member.mobile, // Getting home phone number
          steetNumber: member.steetNumber, // Getting work phone number
          aptNumber: member.aptNumber, // Getting work phone number
          city: member.city, // Getting work phone number
          state: member.state, // Getting work phone number
          zipCode: member.zipCode, // Getting work phone number
          birthCity: member.birthCity, // Getting birth place
          birthState: member.birthState, // Getting birth place
          birthPlace: member.birthPlace, // Getting birth place
          profession: member.profession, // Getting profession
          company: member.company, // Getting company
          interests: member.interests, // Getting interests
          activities: member.activities, // Getting activities
          bioNotes: member.bioNotes,
          birthDate: member.birthDate,
          birthFirstName: member.birthFirstName,
          birthLastName: member.birthLastName,
          nickName: member.nickName,
          siblingType: member.siblingType,
          siblingType2: member.siblingType2,
          parentType: member.parentType,
          memberType: member.memberType,
          image:
            member.image ||
            "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
          gender: member.gender,
          birthDay: member.birthDay,
          childType: member.childType,
          ...(color_class && { color_class }),
        },
      };
    });
  //  console.log(JSON.stringify(treeData));
    // Return the structured family data
    return { success: 1, data: treeData, message: "success!" };
  } catch (error) {
    console.error("Error in getTreeJson:", error);
    return {
      success: 0,
      message: "Error fetching tree data",
      error: error.message,
    };
  }
}



async function getTreeData(treeId, req = {}) {
  try {
    if (typeof treeId !== "undefined" && treeId > 0) {
      var whereClause = {
        id: treeId,
      };
    } else {
      var sessionData = await jwt.verify(
        req.headers.accesstoken,
        env.ACCESS_TOKEN_SECRET
      );
      var user_id = sessionData.user_id;
      //let userObj = await getUserData(user_id);
      var whereClause = {
        userId: user_id,
      };
      console.log("tree function user_id", user_id);
    }

    let treeData = await familyTree.findOne({
      where: whereClause,
    });

    if (treeData) {
      let members = await familyMember.findAll({
        where: {
          treeId: treeData.id,
        },
      });
      treeData = treeData.toJSON();
      treeData.members = members;
    }

    return treeData;
  } catch (error) {
    console.log("errorerror", error);
    return {};
  }
}

async function getParentList(req = {}) {
  try {
    var sessionData = await jwt.verify(
      req.headers.accesstoken,
      env.ACCESS_TOKEN_SECRET
    );
    var user_id = sessionData.user_id;
    //let userObj = await getUserData(user_id);
    var whereClause = {
      userId: user_id,
    };
    let treeData = await familyTree.findOne({
      where: whereClause,
    });
    let memberList = [];
    if (treeData) {
      let members = await familyMember.findAll({
        where: {
          treeId: treeData.id,
        },
      });
      memberList = members;
    }

    return memberList;
  } catch (error) {
    console.log("errorerror", error);
    return {};
  }
} 

 

const arrayColumn = (arr, n) => arr.map((x) => x[n]);

