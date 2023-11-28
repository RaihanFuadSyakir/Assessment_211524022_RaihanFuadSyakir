import { dataResponse } from "@/utils/dataInterface";
import { createBarang, deleteBarang, getAllBarang, getBarangById, updateBarang } from "@/utils/dbConnector";
import { Barang } from "@prisma/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
        const barang = await getBarangById(id);
        const res: dataResponse<Barang> = {
            status: 401,
            msg: "success",
            data: barang!
        }
        return Response.json(res);
    }
    else {
        const barang = await getAllBarang();
        const res: dataResponse<Barang[]> = {
            status: 401,
            msg: "success",
            data: barang
        }
        return Response.json(res);
    }
}

export async function POST(request: Request) {
    const body: Barang = await request.json();
    try {
        const newBarang = await createBarang(body);
        const res: dataResponse<Barang> = {
            status: 200,
            msg: "success",
            data: newBarang
        }
        return Response.json(res);
    } catch (error) {
        const res: dataResponse<Barang> = {
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
            const barangToDel = await deleteBarang(id);
            const res: dataResponse<Barang> = {
            status: 200,
            msg: "success",
            }
            return Response.json(res);
        }
        else{
            const res: dataResponse<Barang> = {
                status: 200,
                msg: `Failed no id barang`,
            }
            return Response.json(res);
        }
        
    } catch (error) {
        const res: dataResponse<Barang> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}
export async function PUT(request: Request) {
    const body: Barang = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        if(id){
            
            const newBarang = await updateBarang(id,body);
            const res: dataResponse<Barang> = {
            status: 200,
            msg: "success",
            data: newBarang
        }
        return Response.json(res);
        }
        
    } catch (error) {
        const res: dataResponse<Barang> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }

}