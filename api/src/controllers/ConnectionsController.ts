import { Request, Response } from 'express';
import connection from '../database/connection';
export default class ConnectionController{
    async create(req: Request, res: Response){
        const { teacher_id } = req.body;
        await connection('connections').insert({ teacher_id });
        return res.status(201).send();

    }
    async index(req: Request, res: Response){
        const totalConnections = await connection('connections')
            .count('* as total')
            
        const { total } = totalConnections[0];
        return res.json({ total });
    }
}