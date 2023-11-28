import { dataResponse } from "@/utils/dataInterface";
import { createKasir, deleteKasir, getAllKasir, getKasirById, updateKasir } from "@/utils/dbConnector";
import { Kasir } from "@prisma/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
        const kasir = await getKasirById(id);
        const res: dataResponse<Kasir> = {
            status: 401,
            msg: "success",
            data: kasir!
        }
        return Response.json(res);
    }
    else {
        const kasir = await getAllKasir();
        const res: dataResponse<Kasir[]> = {
            status: 401,
            msg: "success",
            data: kasir
        }
        return Response.json(res);
    }
}

export async function POST(request: Request) {
    const body: Kasir = await request.json();
    try {
        const newkasir = await createKasir(body);
        const res: dataResponse<Kasir> = {
            status: 200,
            msg: "success",
            data: newkasir
        }
        return Response.json(res);
    } catch (error) {
        const res: dataResponse<Kasir> = {
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
        if(id){
            const kasirToDel = await deleteKasir(id);
            const res: dataResponse<Kasir> = {
            status: 200,
            msg: "success",
            }
            return Response.json(res);
        }
        else{
            const res: dataResponse<Kasir> = {
                status: 200,
                msg: `Failed no id kasir`,
            }
            return Response.json(res);
        }
        
    } catch (error) {
        const res: dataResponse<Kasir> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}
export async function PUT(request: Request) {
    const body: Kasir = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        if(id){
            
            const newkasir = await updateKasir(id,body);
            const res: dataResponse<Kasir> = {
            status: 200,
            msg: "success",
            data: newkasir
        }
        return Response.json(res);
        }
        
    } catch (error) {
        const res: dataResponse<Kasir> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }

}
