var mongoose = require("mongoose");
var Promise = require("bluebird");

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var Job = mongoose.model('Job',jobSchema);

exports.seedJobs = function(){
    return new Promise(function(resolve,reject){
        Job.find({}).exec(function(error,collection){
            if(collection.length == 0){
                Job.create({title:'Software Engineer',description:'You will be only coding!!!!!'});
                Job.create({title:'Senior Software Engineer',description:'You will be only review the code !!!!!'});
                Job.create({title:'Module Lead',description:'You will be only design the project!!!!!'});
                Job.create({title:'Project Lead',description:'You will be only manage the resource!!!!!'});
                Job.create({title:'Project Manager',description:'You will be only communicating with Lady HR !!!!!'},resolve);
            }
        })
    })
}