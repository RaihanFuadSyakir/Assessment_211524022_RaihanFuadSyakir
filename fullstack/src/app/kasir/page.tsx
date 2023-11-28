"use client"
import CreateBarang from '@/components/barang/CreateBarang';
import { dataResponse } from '@/utils/dataInterface';
import { Barang, Kasir } from '@prisma/client'
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CreateKasir from '@/components/kasir/CreateKasir';
import DeleteKasir from '@/components/kasir/DeleteKasir';
export default function KasirPage() {
    const [kasirs, setKasirs] = useState<Kasir[]>([]);
    const [isEdit, setEdit] = useState(false);
    const [arrNum, setArrNum] = useState(-1);

    useEffect(() => {
        axios.get('/api/kasir')
            .then((res: AxiosResponse<dataResponse<Kasir[]>>) => {
                setKasirs(res.data.data!);
            })
            .catch((err_res: AxiosError<dataResponse<Kasir[]>>) => {
                console.log(JSON.stringify(err_res.response?.data.data));
            });
    }, []);

    return (
        <div className='flex flex-row'>
            <CreateKasir setListKasir={setKasirs} listKasir={kasirs} index={arrNum} isEdit={isEdit} setEdit={setEdit} />
            <div className='m-4 flex flex-row flex-wrap'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-gray-400 border-2'>
                                <TableCell>No</TableCell>
                                <TableCell align="center">Kode Kasir</TableCell>
                                <TableCell align="center">Nama Kasir</TableCell>
                                <TableCell align="center">Nomor HP</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kasirs.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="center">{row.KodeKasir}</TableCell>
                                    <TableCell align="center">{row.Nama}</TableCell>
                                    <TableCell align="center">{row.HP}</TableCell>
                                    <TableCell align="center" className='flex flex-col'>
                                        <DeleteKasir listKasir={kasirs} index={index} setListKasir={setKasirs} />
                                        <Button
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            onClick={() => { setEdit(true); setArrNum(index) }}
                                            className='bg-blue-600 text-white border-blue-600 hover:bg-blue-500 hover:border-blue-500'>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}