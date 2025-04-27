import Task from '../models/Task.js'

export const createTask = async (req,res) =>{
    try {
        const {title} = req.body;
        const userId = req.user._id;

        const task = new Task({title,userId});
        await task.save();

        res.status(201).json({success:true,task});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to create task"});
    }
};

export const getTask = async (req,res) =>{
    try {
        const userId = req.user._id;
        const tasks = await Task.find({userId});
        res.status(200).json({success:true,tasks});
    } catch (error) {
        res.status(500).json({success:false});
    }
};
export const toggleTask = async (req,res) =>{
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        task.completed=!task.completed;
        await task.save();
        res.status(200).json({success:true,task});
    } catch (error) {
        res.status(500).json({success:false});
    }
};
export const deleteTask = async(req,res)=>{
    try {
        const {id}=req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false});
        
    }
};

export const updateTask = async(req,res)=>{
    try{
        const {id}=req.params;
        const {title}=req.body;

        const task=await Task.findById(id);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }

        task.title=title;
        await task.save();

        res.status(200).json({success:true,task});
    }
    catch{
        res.status(500).json({success:false,message:"Failed to update the task"});
    }
}