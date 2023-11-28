"use client"
import CreateBarang from '@/components/barang/CreateBarang';
import { dataResponse } from '@/utils/dataInterface';
import { Barang } from '@prisma/client'
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function BarangPage() {
    const [items, setItems] = useState<Barang[]>([]);

    useEffect(() => {
        axios.get('/api/barang')
            .then((res: AxiosResponse<dataResponse<Barang[]>>) => {
                setItems(res.data.data!);
            })
            .catch((err_res: AxiosError<dataResponse<Barang[]>>) => {
                console.log(JSON.stringify(err_res.response?.data.data));
            })
    })
    return (
        <div className='flex flex-row'>
            <CreateBarang setListBarang={setItems} listBarang={items} />
            <div className='m-4 flex flex-row flex-wrap'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-gray-400 border-2'>
                                <TableCell>No</TableCell>
                                <TableCell align="center">Kode Barang</TableCell>
                                <TableCell align="center">Nama Barang</TableCell>
                                <TableCell align="center">Harga Satuan</TableCell>
                                <TableCell align="center">Satuan</TableCell>
                                <TableCell align="center">Stok</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="center">{row.KodeBarang}</TableCell>
                                    <TableCell align="center">{row.NamaBarang}</TableCell>
                                    <TableCell align="center">{row.HargaSatuan}</TableCell>
                                    <TableCell align="center">{row.Satuan}</TableCell>
                                    <TableCell align="center">{row.Stok}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
