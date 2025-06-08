import Router from "express"
import { UserAuth } from "../middleware/middleware";
import { prismaclient } from "../config/import";
import { upload } from "../uploads/uplode";
import { v2 as cloudinary } from "cloudinary"
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

MainRouter.post("/addusertag" , UserAuth , async(req, res)=>{
    try{
        const { tag } = req.body;
        const userId = req.userId;
        const Tag = await prismaclient.tag.upsert({
            where : { name : tag},
            update : { },
            create : { name : tag}
        });

        await prismaclient.user.update({
            where : { id : userId},
            data : {
                tags : {
                    connect : { id : Tag.id }
                }
            }
        })
        res.status(200).json({ message: "Tag added to user" });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})



MainRouter.post("/addposttag/:postId" , UserAuth , async(req, res)=>{
    try{
        const { tag } = req.body;
        const postid = req.params.postId;
        const Tag = await prismaclient.tag.upsert({
            where : { name : tag},
            update : { },
            create : { name : tag}
        });

        await prismaclient.user.update({
            where : { id : postid},
            data : {
                tags : {
                    connect : { id : Tag.id }
                }
            }
        })
        res.status(200).json({ message: "Tag added to Post" });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})
MainRouter.post("/addposttag/:moodEntryId " , UserAuth , async(req, res)=>{
    try{
        const { tag } = req.body;
        const moodEntryId  = req.params.moodEntryId;
        const Tag = await prismaclient.tag.upsert({
            where : { name : tag},
            update : { },
            create : { name : tag}
        });

        await prismaclient.user.update({
            where : { id : moodEntryId },
            data : {
                tags : {
                    connect : { id : Tag.id }
                }
            }
        })
        res.status(200).json({ message: "Tag added to Mood Entry" });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})
MainRouter.post("/addposttag/:resourceId  " , UserAuth , async(req, res)=>{
    try{
        const { tag } = req.body;
        const resourceId   = req.params.resourceId ;
        const Tag = await prismaclient.tag.upsert({
            where : { name : tag},
            update : { },
            create : { name : tag}
        });

        await prismaclient.user.update({
            where : { id : resourceId  },
            data : {
                tags : {
                    connect : { id : Tag.id }
                }
            }
        })
        res.status(200).json({ message: "Tag added to resource Entry" });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

MainRouter.post('/upload', UserAuth , async (req, res) => {
    cloudinary.config({
        cloud_name : "EmpathyHub"
    })

});


export default MainRouter