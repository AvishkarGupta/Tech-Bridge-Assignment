import dotenv from "dotenv"
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({path:'./.env'})

connectDB()
.then( () =>{

  app.on("error", (error) =>{
    console.log(`Error happaned ${error}`)
    throw error;
  })

  app.listen(process.env.PORT || 8080, () =>{
    console.log(`server is running at port ${process.env.PORT}`)
  })
} )
.catch( (err) =>{
  console.error(`Somethingh went worng while connecting while db and trying to listing the app ${err}`)
})

