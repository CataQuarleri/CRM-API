import Pet from '../models/petModel.js';

async function getPets (req, res, next){
    console.log("IM IN PETS")
    res.send("iM IN PETS GET")
}
async function createNewPet (req, res, next){}
async function findOnePet (req, res, next){}
async function updateOnePet (req, res, next){}
async function deleteOnePet (req, res, next){}

export {getPets, createNewPet, findOnePet, updateOnePet, deleteOnePet}