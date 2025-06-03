import Router from "express"
import { UserAuth } from "../middleware/middleware";
import { prismaclient } from "../config/import";
const MainRouter = Router();


MainRouter.post("/postmoodentry" , UserAuth  , async(req, res)=>{
    const UserId = req.userId;
    try{
        const { mood , notes , tages } = req.body;
        const UserPost = await prismaclient.moodEntry.create({
            data : {
                mood : mood,
                notes : notes,
                userId : UserId
            }
        })
        if(!UserPost){
            res.status(403).json({
                message : "Error While Creating"
            })
        }
        res.status(200).json({
            message : "Posted Succsessfully"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

MainRouter.get("/alluserpost", UserAuth , async(req, res)=>{
    try{
        const UserId = req.userId;
        const AllPost = await prismaclient.moodEntry.findMany({ where : { userId : UserId}, orderBy : { createdAt : "desc"}});
        if(!AllPost){
            res.status(403).json({
                message : "Error While Getting Data"
            })
        }
        res.status(200).json({
            posts : AllPost
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server"
        })
    }
})

MainRouter.post("/addtags" , UserAuth , async(req, res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }

})


export default MainRouter