import chalk from "chalk"
import inquirer from "inquirer";
import { log } from "node:console";


const validateService = (service: string)=>{
    if(!service || service.length === 0)
        throw new Error("Service name is requird")

    const regex = /^[a-zA-Z0-9-]+$/;
    const isValid = regex.test(service)
    
    if(!isValid)
        throw new Error("Space or any symbol not allowed in service name you can use -")

    return service.toLowerCase()
}

const exitApp = () => {
    const message = chalk.bgGreenBright.black.bold("👋 Good Bye ! ")
    log(message);
    process.exit(0);
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

        const serviceName = validateService(service)
        console.log(serviceName)
    }
    catch(err){
        if(err instanceof Error){
            log(chalk.bgRed.white.bold(` 🛑 Error - ${err.message} \n`))
            app()
        }
    }
}

app()