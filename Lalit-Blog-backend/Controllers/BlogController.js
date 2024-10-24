const Blog = require("../Models/BlogModel");

exports.getAllBlog = async(req,res)=>{
    try{
        const Blogs = await Blog.find();
        res.status(200).json({
            status:"Success",
            result:Blogs.length,
            data:{
                Blogs
            }
        })
    }catch{
        res.status(401).json({
            status:"Failed",
            msg:err
        })
    }
}   
exports.deleteBlog =async (req,res,next)=>{
    try{
        await Blog.findByIdAndDelete(req.params._id);
        res.status(201).json({
            status:"success",
            data:null
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
}
exports.editBlog = async(req,res,next)=>{
    const {id} = req.params._id;
    const {title} = req.body.title;

    try{
        const updateBlog = await Blog.findByIdAndUpdate(id,{title},{new:true, runValidators:true});
        if(!updateBlog){
            return res.status(404).json({
                status:"failed",
                message:"Blog not found"
            })
        }
        res.status(200).json({
            status:"success",
            data:{
                blog:updateBlog
            }
        })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }

}