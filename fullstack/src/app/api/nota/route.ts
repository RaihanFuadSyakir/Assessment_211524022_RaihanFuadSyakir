import { dataResponse } from "@/utils/dataInterface";
import { getNotaById, getAllNota, createNota, deleteNota, updateNota } from "@/utils/dbConnector";
import { Nota } from "@prisma/client";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
        const nota = await getNotaById(id);
        const res: dataResponse<Nota> = {
            status: 401,
            msg: "success",
            data: nota!
        }
        return Response.json(res);
    }
    else {
        const nota = await getAllNota();
        const res: dataResponse<Nota[]> = {
            status: 401,
            msg: "success",
            data: nota
        }
        return Response.json(res);
    }
}

export async function POST(request: Request) {
    const body: Nota = await request.json();
    try {
        const newNota = await createNota(body);
        const res: dataResponse<Nota> = {
            status: 200,
            msg: "success",
            data: newNota
        }
        return Response.json(res);
    } catch (error) {
        const res: dataResponse<Nota> = {
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
            const notaToDel = await deleteNota(id);
            const res: dataResponse<Nota> = {
                status: 200,
                msg: "success",
            }
            return Response.json(res);
        }
        else {
            const res: dataResponse<Nota> = {
                status: 200,
                msg: `Failed no id nota`,
            }
            return Response.json(res);
        }

    } catch (error) {
        const res: dataResponse<Nota> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}

export async function PUT(request: Request) {
    const body: Nota = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        if (id) {

            const newNota = await updateNota(id, body);
            const res: dataResponse<Nota> = {
                status: 200,
                msg: "success",
                data: newNota
            }
            return Response.json(res);
        }

    } catch (error) {
        const res: dataResponse<Nota> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}