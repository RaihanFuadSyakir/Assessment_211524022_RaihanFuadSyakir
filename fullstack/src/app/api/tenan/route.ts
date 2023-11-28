import { dataResponse } from "@/utils/dataInterface";
import {createTenan, deleteTenan, getAllTenan, getTenanById, updateTenan } from "@/utils/dbConnector";
import { Tenan } from "@prisma/client";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
        const tenan = await getTenanById(id);
        const res: dataResponse<Tenan> = {
            status: 401,
            msg: "success",
            data: tenan!
        }
        return Response.json(res);
    }
    else {
        const tenan = await getAllTenan();
        const res: dataResponse<Tenan[]> = {
            status: 401,
            msg: "success",
            data: tenan
        }
        return Response.json(res);
    }
}

export async function POST(request: Request) {
    const body: Tenan = await request.json();
    try {
        const newTenan = await createTenan(body);
        const res: dataResponse<Tenan> = {
            status: 200,
            msg: "success",
            data: newTenan
        }
        return Response.json(res);
    } catch (error) {
        const res: dataResponse<Tenan> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        if (id) {
            const tenanToDel = await deleteTenan(id);
            const res: dataResponse<Tenan> = {
                status: 200,
                msg: "success",
            }
            return Response.json(res);
        }
        else {
            const res: dataResponse<Tenan> = {
                status: 200,
                msg: `Failed no id tenan`,
            }
            return Response.json(res);
        }

    } catch (error) {
        const res: dataResponse<Tenan> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}

export async function PUT(request: Request) {
    const body: Tenan = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        if (id) {

            const newTenan = await updateTenan(id, body);
            const res: dataResponse<Tenan> = {
                status: 200,
                msg: "success",
                data: newTenan
            }
            return Response.json(res);
        }

    } catch (error) {
        const res: dataResponse<Tenan> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}