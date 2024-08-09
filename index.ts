import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get('/',(request: Request, response: Response)=>{

})

app.listen(port, () => console.log(`This server is running at port ${port}`));