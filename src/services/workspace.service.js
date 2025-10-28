import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"

class WorkspaceService {
    static async getAll(user_id){
        const members = await MemberWorkspaceRepository.getAllByUserId(user_id)
        
        return members
    } 
    static async create (user_id, name, url_img){

        //crear el espacio de trabajo
        const workspace_created = await WorkspaceRepository.create(name, url_img)

        //crear al miembro adm (creadorr)
        await MemberWorkspaceRepository.create(user_id, workspace_created._id, "admin")
    
        return workspace_created 
    }
}


export default WorkspaceService