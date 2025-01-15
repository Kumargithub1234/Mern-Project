
const Player = require('../models/playerModel')

const getPlayers = async (req,res) => {
    try{
        const data = await Player.find({});
        console.log(data)
        res.status(200).send({
            success: true,
            message: "Data of players",
            data
        })
    } catch(err){
        res.status(500).send({
            success: false,
            message: 'INTERNAL SERVER ERROR',
            err
        })  
    }
}

const addPlayers = async (req,res) =>{
   try{
      const {first_name, last_name,email,phone,role,available} = req.body

      if(!first_name || !last_name || !email || !phone || !role || !available){
        res.status(404).send({
            success: false,
            message: 'each field is mandatory'
        })
      }
      await Player({
        first_name,
        last_name,
        email,
        phone,
        role,
        available
      }).save()

       res.status(200).send({
        success: true,
        message: "User is added",
       })
   }
    catch(err){
        res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR",
            err
        })
    }
}

const updatePlayer = async (req,res) =>{
    try{
        const player_id = req.params.id
        await Player.updateOne({_id:player_id}, {$set:req.body})
        

        res.status(200).send({
            success: true,
            message: "player updated succssfully"
        })

    } catch(err){
        res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR",
            err
        })
    }
}

const deletePlayer = async (req,res) =>{
    try{
        const player_id = req.params.id;
        await Player.deleteOne({_id:player_id}, {$set:req.body})
        res.status(200).send({
            success:true,
            message: "player deleted successfully"
        })

    }catch(err){
        res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR",
            err
        })
    }  
}


module.exports = {getPlayers, addPlayers, updatePlayer, deletePlayer}