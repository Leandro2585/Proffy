import { Request, Response } from 'express';
import connection from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}
export default class ClassesController {
    async create(req: Request, res: Response){
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;

        const trx = await connection.transaction();
        try {
            const insertedTeachersIds = await trx('teachers')
            .insert({
                name,
                avatar,
                whatsapp,
                bio
            });

            const teacher_id = insertedTeachersIds[0];
            const insertedClassesId = await trx('classes')
            .insert({
                subject,
                cost,
                teacher_id
            });
            const class_id = insertedClassesId[0];
            const classSchedule = schedule.map((schedule: ScheduleItem) => {
                return{
                    class_id,
                    week_day: schedule.week_day,
                    from: convertHourToMinutes(schedule.from),
                    to: convertHourToMinutes(schedule.to),
                };
            });
            await trx('class_schedule')
            .insert(classSchedule);

            await trx.commit();
            return res.status(201).send();

        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });

        }
    }
    async index(req: Request, res: Response){
        const filters = req.query;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        if(!filters.subject || !filters.week_day || !filters.time){
            return res.status(400).json({
                error: 'Missing filters to search classes'
            });
        }
        const timeInMinutes = convertHourToMinutes(time);
        const classes = await connection('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??',[timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??',[timeInMinutes])
            })
            .where('classes.subject','=',subject)
            .join('teachers', 'classes.teacher_id', '=' ,'teachers.id')
            .select(['classes.*', 'teachers.*']);
        return res.json(classes);
    }
}
