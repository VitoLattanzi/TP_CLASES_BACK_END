import WorkspaceRepository from "../repositories/workspace.repository.js"
import WorkspaceService from "../services/workspace.service.js"

class WorkspaceController {
    static async getAll (request, response){
        try{           
            //Muestro los datos de sesion del usuario
            const user = request.user
            
            //Necesito saber el user_id del cliente para saber exactamente quien es y que lista debo darle
            const workspaces = await WorkspaceService.getAll(user.id)


            response.status(200).json(
                {
                    ok: true,
                    status: 200,
                    message: 'Espacios de trabajo obtenidos exitosamente',
                    data: {
                        workspaces: workspaces
                    }
                }
            )
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL OBTENER LOS WORKSPACES', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

    static async create (request, response, next) {
        try {
            const user = request.user; // asumes auth middleware

            // OJO: body
            const { name, url_img } = request.body;

            // Validaciones rápidas
            if (!name || typeof name !== 'string') {
            return response.status(400).json({
                ok: false,
                message: 'El campo "name" es requerido',
                status: 400
            });
            }

            // url_img opcional, pero si viene que sea string
            if (url_img !== undefined && typeof url_img !== 'string') {
            return response.status(400).json({
                ok: false,
                message: 'El campo "url_img" debe ser string',
                status: 400
            });
            }

            const workspace_created = await WorkspaceService.create(user.id, name, url_img);

            return response.status(201).json({
            status: 201,
            ok: true,
            message: 'Workspace creado con éxito',
            data: { workspace_created }
            });
        } catch (error) {
            // Log más explícito
            console.error('ERROR creando workspace:', error?.stack || error);

            if (error.status) {
            return response.status(error.status).json({
                ok: false,
                message: error.message,
                status: error.status
            });
            }

            return response.status(500).json({
            ok: false,
            message: 'Error interno del servidor',
            status: 500
            });
        }
    }
}

export default WorkspaceController