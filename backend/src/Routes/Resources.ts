import Router, { response } from "express"
import { UserAuth } from "../middleware/middleware";
import { prismaclient } from "../config/import";
const ResourcesRouter = Router();


ResourcesRouter.post("/postresourcses", UserAuth  , async(req , res)=>{
    try{
        const { } = req.body;
        const CreateResourcses = await prismaclient.resource.create({
            data : {
                
            }
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

ResourcesRouter.get("/getresourcsespost", UserAuth  , async(req , res)=>{

})





export default ResourcesRouter