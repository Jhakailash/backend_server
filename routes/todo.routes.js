const express = require("express")

const TodoModel  = require("../models/Todo.model")

const todoController = express.Router();


todoController.post("/create", async (req, res) => {

    const {taskname, status,tag,userId} = req.body;
    const new_note = new TodoModel({
        taskname,
        status,
        tag,
        userId
    })

    
    await new_note.save()
    res.send({"message": "note created", new_note}) 
})

todoController.get("/read", async (req, res) => {

    
   const userId= req.headers.userid
   const notes = await TodoModel.find({userId})
   res.send(notes)
 
})


todoController.patch("/:noteId/edit", async (req, res) => {

   const {noteId} = req.params;
   const {userId} = req.body;
   console.log(noteId,userId)
   const note = await TodoModel.findOne({_id: noteId})

   if(note.userId === userId){
       const new_note =  await TodoModel.findOneAndUpdate({_id: noteId}, req.body, {new: true})
       return res.send({"message": "sucessfully updated", new_note})
   }
   else{
    res.send("you have not authorize")
   }
    
})


todoController.delete("/:noteId/delete", async (req, res) => {
    const {noteId} = req.params;
    const {userId} = req.body;
    const note = await TodoModel.findOne({_id: noteId})

    if(note.userId === userId){
        await TodoModel.findOneAndDelete({_id: noteId})
        return res.send({"message": "sucessfully deleted"})
    }
    else{
     res.send("you have not authorize")
    }
     
 })


module.exports = todoController