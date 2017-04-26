var expect = require("chai").expect;
var mongoose = require("mongoose");
var jobModel = require("../model/Job");
var Promise = require("bluebird");

function resetJobs(){
    return new Promise(function(resolve,reject){
        mongoose.connection.collections['jobs'].drop(resolve,reject);    
    });
}
/*
describe('get jobs',function(){
    it('should never be empty since jobs are seeded',function(done){  
        mongoose.connect('mongodb://localhost/jobfinder',function(){
            resetJobs(function(){
                jobModel.seedJobs(function(){
                    mongoose.model('Job').find({}).exec(function(error,jobsList){
                     expect(jobsList.length).to.be.at.least(1);
                     done();
                    })
                })
            })
        })
    })
});
*/

var connectDB = Promise.promisify(mongoose.connect,{context: mongoose});

function findJobs(query){
    return Promise.cast(mongoose.model('Job').find(query).exec());
}
/*
describe('get jobs',function(){
    it('should never be empty since jobs are seeded',function(done){ 
        connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(findJobs)
            .then(function(jobsList) {
                 expect(jobsList.length).to.be.at.least(1);
                 done();
            });
    });
});
*/

describe('get jobs',function(){
    
    var jobs;
    
    before(function(done){
        connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(findJobs)
            .then(function(collections) {
                 jobs = collections;
                 done();
            });
    });
    
    it('should never be empty since jobs are seeded',function(){ 
        expect(jobs.length).to.be.at.least(1);
    });
    
    it('should have job title',function(){ 
        expect(jobs[0].title).to.not.be.empty;
    });
    
    it('should have a job description',function(){ 
        expect(jobs[0].description).to.not.be.empty;
    });
});

