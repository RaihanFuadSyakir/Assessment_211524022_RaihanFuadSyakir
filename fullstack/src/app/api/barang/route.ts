import { dataResponse } from "@/utils/dataInterface";
import { createBarang, getAllBarang, getBarangById } from "@/utils/dbConnector";
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
    console.log("create")
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