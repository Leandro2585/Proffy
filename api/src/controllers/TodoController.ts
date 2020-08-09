import { Request, Response } from 'express';
import connection from '../database/connection';
export default class TodoController {
    async create(req: Request, res: Response){
        const {
            title,
            description,
            class_id,
            todo_item
        } = req.body;
        const trx = await connection.transaction();
        try{
            const insertedTodoId = await trx('todo')
                  .insert({
                    title,
                    description,
                    media: req.file.filename,
                    class_id
                  });
            const todo_id = insertedTodoId[0];
            await trx('todo_item').insert({
              todo_item,
              todo_id
            });

            return res.status(200).send();
        }catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new media : '+ err
            });

        }
    }
    async index(req: Request, res: Response){
      
    }
}
