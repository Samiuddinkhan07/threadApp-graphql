import  CreateUserPayLoad  from "../../service/user.js";
import userService from "../../service/user.js";

const queries = {}

const mutations = {
    createUser:async (_,CreateUserPayLoad) =>{
      const res = await userService.createUser(CreateUserPayLoad);
      return res.id;
    },
};


export const resolvers = {queries,mutations}