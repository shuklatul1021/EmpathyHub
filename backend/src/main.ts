import Express from "express";
const app = Express();
app.use(Express.json());


app.get("/" , (req, res)=>{
    res.send("Hello")
})


app.listen(3000 , ()=>{
    console.log("The Backend On : http://localhost:3000")
});