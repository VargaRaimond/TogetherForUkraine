
import { SchemaOf, ValidationError } from "yup";
import { Response } from "express";
import {pg} from "./knex";

async function updateOne<DbType>(
    tableName: string,
    id: string,
    dbData: DbType
) {
    const retId: unknown[] = await pg(tableName)
        .where({ id })
        .update(dbData, ["id"], { includeTriggerModifications: true });
    if (retId.length === 0) {
        throw Error("Not found");
    }
}

async function deleteOne(tableName: string, id: string) {
    const entriesDeleted = await pg(tableName).where("id", id).del();

    if (entriesDeleted === 0) {
        throw Error("Not found");
    }
}

export async function addNewEntry<Type, NewType, DbType>(
    tableName: string,
    data: NewType,
    validationSchema: SchemaOf<any>,
    convertApiToDbMethod: (arg: Type) => DbType,
    res: Response
): Promise<null> {
    try {
        // validate body
        await validationSchema.validate(data);
        const dbData: DbType = convertApiToDbMethod({
            ...data,
        } as unknown as Type);
        res.status(201);
        return (
            await pg(tableName).insert(dbData, null, {
                includeTriggerModifications: true,
            })
        )[0];
    } catch (e) {
        // validation failed -> 400 Bad request
        if (e instanceof ValidationError) {
            res.status(400);
        }

        // insert operation failed -> 409 Conflict
        if ((e as Error).message.includes("violates unique constraint")) {
            res.status(409);
        }

        if ((e as Error).message.includes("violates foreign key constraint")) {
            res.status(400);
        }

        // original error
        throw e;
    }
}

export async function updateEntry<Type extends { id: string }, DbType>(
    tableName: string,
    id: string,
    data: Partial<Type>,
    validationSchema: SchemaOf<any>,
    convertApiToDbMethod: (arg: Partial<Type>) => Partial<DbType>,
    res: Response
) {
    if (!data.id || id !== data.id) {
        res.status(400);
    }

    try {
        // Validate path and body
        await validationSchema.validate(data);

        // Update entry if it exists
        const dbData: Partial<DbType> = convertApiToDbMethod(data);
        await updateOne(tableName, id, dbData);
    } catch (e) {
        // validation failed -> 400 Bad request
        if (e instanceof ValidationError) {
            res.status(400);
        }

        if ((e as Error).message.includes("violates unique constraint")) {
            res.status(409);
        }

        if ((e as Error).message.includes("Not found")) {
            res.status(404);
        }
    }
}

export async function deleteEntry(
    tableName: string,
    id: string,
    res: Response
) {
    try {

        // Delete entry if it exists
        await deleteOne(tableName, id);
    } catch (e) {
        // validation failed -> 400 Bad request
        if (e instanceof ValidationError) {
            res.status(400);
        }

        if ((e as Error).message.includes("Not found")) {
            res.status(404);
        }
    }
}