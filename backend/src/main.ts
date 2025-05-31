import Express from "express";
import UserRouter from "./Routes/UserRouter";
const app = Express();
app.use(Express.json());


app.use("/api/vi/user", UserRouter);


app.listen(3000 , ()=>{
    console.log("The Backend On : http://localhost:3000")
});