const express = require('express');  
var Config = require('./../config/config.model');
var ConfigService = require('../services/ConfigService');
var templatesjs = require("templatesjs");

class TemplateService {
    constructor(){
     console.log("In constructor TemplateService");
    }


   async getRenderedValue(templateName, list) {
    return new Promise(function(resolve, reject) {
        let configObj = new ConfigService();
        let configPromise =configObj.getValue(templateName);
        configPromise.then(function(configvalue) {
            let data = configvalue[0].value;
            //console.log("Config details=="+ configvalue);
            //console.log("Basic Template=="+ data);
            templatesjs.setSync(data);
            data = templatesjs.renderAllSync(list);
            //console.log("Rendered Template=="+ data);
            configvalue[0].value = data;
            resolve(configvalue);
        }).catch(function(err) {
            console.log(err);
            return null;
           });
     });
    }
}
module.exports=TemplateService;