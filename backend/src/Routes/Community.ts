import Router from "express"
import { UserAuth } from "../middleware/middleware";
import { prismaclient } from "../config/import";
const CommunityRouter = Router();


CommunityRouter.post("/addcommunitypost" , UserAuth , async(req, res)=>{
    try{
        const UserId = req.userId;
        const { title , content , tags } = req.body;
        const CreateForumPost = await prismaclient.forumPost.create({
            data : {
                title : title,
                content : content,
                authorId : UserId
            }
        })
        if(!CreateForumPost){
            res.status(403).json({
                messgae : "Error While Creating Post"
            })
            return;
        }

        const AddingTag = await prismaclient.tag.create({
            data : {
                name : tags,
                posts : {
                    connect : {
                        id : CreateForumPost.id
                    }
                }
            },
        })
        if(!AddingTag){
            res.status(403).json({
                message : "Error While Adding The Tags"
            })
        }

        res.status(200).json({
            message: "Post and Tag Created Successfully",
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})


CommunityRouter.get("/getcommunitypost" , UserAuth , async(req, res)=>{
    try{
        const GetCommmunityPost = await prismaclient.forumPost.findMany({ include : { tags : true , author : true , comments : true }});
        if(!GetCommmunityPost){
            res.status(403).json({
                message : "Error While Getting"
            })
            return;
        }
        res.status(200).json({
            CoommutnityPost : GetCommmunityPost
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

CommunityRouter.post("/communitypostcomment/:postId" , UserAuth , async(req, res)=>{
    try{
        const PostId = req.params.postId;
        const UserId = req.userId;
        const { content } = req.body;
        const CreateComment = await prismaclient.forumComment.create({
            data : {
                content : content,
                postId : PostId,
                authorId : UserId
            }
        });
        if(!CreateComment){
            res.status(403).json({
                message : "Error While Posting Comment"
            })
            return;
        }
        res.status(200).json({
            message : "Comment Posted"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

CommunityRouter.get("/getpostcomment/:postId", UserAuth , async(req, res)=>{
    try{
        const PostId = req.params.postId;
        const GetComments = await prismaclient.forumComment.findMany({ where : { postId : PostId }, include : { author : true}});
        if(!GetComments){
            res.status(403).json({
                message : "Error While Getching Data"
            });
            return;
        }
        res.status(200).json({
            comments : GetComments
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Intrnal Server Error"
        })
    }
})

export default CommunityRouter