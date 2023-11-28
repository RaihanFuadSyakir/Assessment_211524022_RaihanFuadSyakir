"use client"
import { Nota } from '@prisma/client'
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
import CreateTenan from '@/components/tenan/CreateTenan';
import DeleteTenan from '@/components/tenan/DeleteTenan';
import { dataResponse } from '@/utils/dataInterface';
import CreateNota from '@/components/nota/CreateNota';
import DeleteNota from '@/components/nota/DeleteNota';
export default function NotaPage() {
    const [notas, setNotas] = useState<Nota[]>([]);
    const [isEdit, setEdit] = useState(false);
    const [arrNum, setArrNum] = useState(-1);

    useEffect(() => {
        axios.get('/api/nota')
            .then((res: AxiosResponse<dataResponse<Nota[]>>) => {
                setNotas(res.data.data!);
            })
            .catch((err_res: AxiosError<dataResponse<Nota[]>>) => {
                console.log(JSON.stringify(err_res.response?.data.data));
            });
    }, []);

    return (
        <div className='flex flex-row'>
            <CreateNota setListNota={setNotas} listNota={notas} index={arrNum} isEdit={isEdit} setEdit={setEdit} />
            <div className='m-4 flex flex-row flex-wrap'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-gray-400 border-2'>
                                <TableCell>No</TableCell>
                                <TableCell align="center">Kode Nota</TableCell>
                                <TableCell align="center">Kode Tenan</TableCell>
                                <TableCell align="center">Kode Kasir</TableCell>
                                <TableCell align="center">Tanggal Nota</TableCell>
                                <TableCell align="center">Jam Nota</TableCell>
                                <TableCell align="center">Jumlah Belanja</TableCell>
                                <TableCell align="center">Diskon</TableCell>
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notas.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="center">{row.KodeNota}</TableCell>
                                    <TableCell align="center">{row.KodeTenan}</TableCell>
                                    <TableCell align="center">{row.KodeKasir}</TableCell>
                                    <TableCell align="center">{JSON.stringify(row.TglNota)}</TableCell>
                                    <TableCell align="center">{JSON.stringify(row.JamNota)}</TableCell>
                                    <TableCell align="center">{row.JumlahBelanja}</TableCell>
                                    <TableCell align="center">{row.Diskon}</TableCell>
                                    <TableCell align="center">{row.Total}</TableCell>
                                    <TableCell align="center" className='flex flex-col'>
                                        <DeleteNota listNota={notas} index={index} setListNota={setNotas} />
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