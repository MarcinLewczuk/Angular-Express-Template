import { Request, Response } from 'express';
import { QueryError } from 'mysql2';
import { db } from './app'; 

export function selectAll(tableName: string) {
    return (req: Request, res: Response) => {
        db.query(`SELECT * FROM ${tableName}`, (error: QueryError | null, results: any[]) => {
            if (error) {
                console.error(`GET from "${tableName}" failed:`, error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json(results);
            }
        });
    };
}

export function selectColumn(tableName: string, columnName: string) {
    return (req: Request, res: Response) => {
        const value = req.params[columnName];
        db.query(
            `SELECT * FROM ${tableName} WHERE ${columnName} = ?`,
            [value],
            (error: QueryError | null, results: any[]) => {
                if (error) {
                    console.error(`GET from "${tableName}" failed:`, error);
                    res.status(500).json({ error: 'Internal server error' });
                } else if (results.length === 0) {
                    res.status(404).json({ error: `${tableName.slice(0, -1)} not found` });
                } else {
                    res.json(results);
                }
            }
        );
    };
}
