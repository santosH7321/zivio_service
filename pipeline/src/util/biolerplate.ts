const getServiceInPascalCase = (service: string)=>{
  const arr = service.split("-")
  const tmp = arr.map((item)=>{
    const firstLetter = item[0].toUpperCase()
    const restLetter = item.slice(1)
    return firstLetter+restLetter
  })
  return tmp.join("")
}

export const appBoilerplate = (service: string, port: number)=>{
  return [
    `import dotenv from "dotenv"`,
    `dotenv.config()\n`,
    `import mongoose from "mongoose"`,
    `mongoose.connect(process.env.DB!)`,
    `.then(()=>console.log("${service} - Database is running"))`,
    `.catch(()=>console.log("${service} - Failed to connect with database"))\n`,
    `import express, { Request, Response } from "express"`,
    `import ${getServiceInPascalCase(service)}Router from "./${service}.router"`,
    `import morgan from "morgan"`,
    `import cors from "cors"`,
    `const app = express()`,
    `app.listen(process.env.PORT, ()=>console.log("${service} service is running on - http://localhost:${port}/${service}"))\n`,
    `app.use(cors({`,
    `\torigin: process.env.CLIENT,`,
    `\tcredentials: true`,
    `}))`,
    `app.use(express.json())`,
    `app.use(express.urlencoded({extended: false}))`,
    `app.use(morgan('dev'))\n`,
    `app.use("/${service}", ${getServiceInPascalCase(service)}Router)`
  ].join("\n")
}

