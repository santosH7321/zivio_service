import chalk from "chalk"
import inquirer from "inquirer";
import { log } from "node:console";
import fs from "fs"
import path from "node:path";


const validateService = (service: string)=>{
    if(!service || service.length === 0)
        throw new Error("Service name is requird")

    const regex = /^[a-zA-Z0-9-]+$/;
    const isValid = regex.test(service)
    
    if(!isValid)
        throw new Error("Space or any symbol not allowed in service name you can use -")

    return service.toLowerCase()
}

const exitApp = (msg: string | null = null) => {
    const message = chalk.bgGreenBright.black.bold(msg || "👋 Good Bye ! ")
    log(message);
    process.exit(0);
}

const makeFolder = (path: string)=>{
    const isExist = fs.existsSync(path)

    if(isExist)
        throw new Error(`${path.split("\\").pop()} service already exists !`)

    fs.mkdirSync(path)
}

const copyFiles = (files: string[], inputPath: string, outputPath: string)=>{
    files.forEach((file)=>{
        fs.copyFileSync(
            path.join(`${inputPath}`, file),
            path.join(`${outputPath}`, file)
        )
    })
}

const createFiles = (files: string[], service: string, srcPath: string)=>{
    files.forEach((file)=>{
        const filename = `${service}${file}`
        const filepath = path.join(srcPath, filename)
        fs.writeFileSync(filepath, "")
    })
}


const app = async () => {
    try {
        const welcomeMessage = chalk.bgMagenta.bold("---💥 Welcome team ! 💥 ---\n")
        console.log(welcomeMessage);

        const {service} = await inquirer.prompt({
            type: 'input',
            name: 'service',
            message: chalk.yellow('Enter service name || To exit app write :q \n')
        })

        if(service === ":q"){
            exitApp()
        }

        if(service === "pipeline"){
            exitApp("Pipeline name not allowed")
        }

        const serviceName = validateService(service)
        const appPath = __dirname
        const rootPath = path.resolve(appPath, "../../")
        const pipelinePath = path.resolve(appPath, "../")
        const servicePath = path.join(rootPath, serviceName) 
        const srcPath = path.join(servicePath, "src")
        const appFilePath = path.join(srcPath, "app.ts")
        const filesListForCopy  = [
            ".env",
            "Dockerfile",
            "package.json",
            "tsconfig.json"
        ]

        const filesListForCreate = [
            ".controller.ts",
            ".service.ts",
            ".model.ts",
            ".interface.ts",
            ".enum.ts",
            ".middleware.ts",
            ".dto.ts",
            ".router.ts"
        ]

        // service folder
        makeFolder(servicePath)

        // src folder inside service
        makeFolder(srcPath)

        // creating app.ts
        fs.writeFileSync(appFilePath, "")
        
        // copy all required files for typescripts
        copyFiles(filesListForCopy, pipelinePath, servicePath)

        // creating required files for start codin
        createFiles(filesListForCreate, serviceName, srcPath)

        log(chalk.bgYellow.black.bold(`Success - ${serviceName} created successfully !`))
        exitApp()
    }
    catch(err){
        if(err instanceof Error){
            log(chalk.bgRed.white.bold(` 🛑 Error - ${err.message} \n`))
            app()
        }
    }
}

app()