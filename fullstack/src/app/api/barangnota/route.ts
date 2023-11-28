import { dataResponse } from "@/utils/dataInterface";
import { getBarangNotaById, getAllBarangNota, createBarangNota, deleteBarangNota, updateBarangNota } from "@/utils/dbConnector";
import { BarangNota } from "@prisma/client";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id_nota = searchParams.get('id_nota');
    const id_barang = searchParams.get('id_barang');
    if (id_nota && id_barang) {
        const barangNota = await getBarangNotaById(id_nota,id_barang);
        const res: dataResponse<BarangNota> = {
            status: 401,
            msg: "success",
            data: barangNota!
        }
        return Response.json(res);
    }
    else {
        const barangNota = await getAllBarangNota();
        const res: dataResponse<BarangNota[]> = {
            status: 401,
            msg: "success",
            data: barangNota
        }
        return Response.json(res);
    }
}

export async function POST(request: Request) {
    const body: BarangNota = await request.json();
    try {
        const newBarangNota = await createBarangNota(body);
        const res: dataResponse<BarangNota> = {
            status: 200,
            msg: "success",
            data: newBarangNota
        }
        return Response.json(res);
    } catch (error) {
        const res: dataResponse<BarangNota> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id_nota = searchParams.get('id_nota');
    const id_barang = searchParams.get('id_barang');
    try {
        if (id_barang && id_nota) {
            const barangNotaToDel = await deleteBarangNota(id_nota,id_barang);
            const res: dataResponse<BarangNota> = {
                status: 200,
                msg: "success",
            }
            return Response.json(res);
        }
        else {
            const res: dataResponse<BarangNota> = {
                status: 200,
                msg: `Failed no id barangNota`,
            }
            return Response.json(res);
        }

    } catch (error) {
        const res: dataResponse<BarangNota> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}

export async function PUT(request: Request) {
    const body: BarangNota = await request.json();
    const { searchParams } = new URL(request.url);
    const id_nota = searchParams.get('id_nota');
    const id_barang = searchParams.get('id_barang');
    try {
        if (id_nota && id_barang) {

            const newBarangNota = await updateBarangNota(id_nota,id_barang, body);
            const res: dataResponse<BarangNota> = {
                status: 200,
                msg: "success",
                data: newBarangNota
            }
            return Response.json(res);
        }

    } catch (error) {
        const res: dataResponse<BarangNota> = {
            status: 400,
            msg: String(error),
        }
        return Response.json(res);
    }
}