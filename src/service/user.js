
import { prismaClient } from "../lib/db.js"
import {createHmac,randomBytes} from "node:crypto"

/**
 * @typedef {Object} CreateUserPayLoad
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 */


export const CreateUserPayLoad = {
    firstName:String,
    lastName:String,
    email:String,
    password:String
    
}

class UserService{
      createUser(CreateUserPayLoad){
        const {firstName,lastName,email,password} = CreateUserPayLoad
        const salt =  randomBytes(32).toString("hex");
        const hashedPassword = createHmac('sha256',salt).update(password).digest("hex");

        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword,
            }
        })
    }
}

const userService = new UserService()

export default userService