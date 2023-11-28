// db.js

import { Barang, BarangNota, Kasir, Nota, Tenan } from "@prisma/client";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Function to create a new Barang
export const createBarang = async (data: Barang) => {
    try {
        const newBarang = await prisma.barang.create({
            data: data,
        });
        return newBarang;
    } catch (error) {
        console.error('Error creating Barang:', error);
        throw error;
    }
};

// Function to get all Barang
export const getAllBarang = async () => {
    try {
        const allBarang = await prisma.barang.findMany();
        return allBarang;
    } catch (error) {
        console.error('Error getting all Barang:', error);
        throw error;
    }
};

// Function to get a specific Barang by KodeBarang
export const getBarangById = async (KodeBarang: string) => {
    try {
        const barang = await prisma.barang.findUnique({
            where: { KodeBarang: KodeBarang },
        });
        return barang;
    } catch (error) {
        console.error('Error getting Barang by ID:', error);
        throw error;
    }
};

// Function to update a Barang by KodeBarang
export const updateBarang = async (KodeBarang: string, data: Barang) => {
    try {
        const updatedBarang = await prisma.barang.update({
            where: { KodeBarang: KodeBarang },
            data: data,
        });
        return updatedBarang;
    } catch (error) {
        console.error('Error updating Barang:', error);
        throw error;
    }
};

// Function to delete a Barang by KodeBarang
export const deleteBarang = async (KodeBarang: string) => {
    try {
        const deletedBarang = await prisma.barang.delete({
            where: { KodeBarang: KodeBarang },
        });
        return deletedBarang;
    } catch (error) {
        console.error('Error deleting Barang:', error);
        throw error;
    }
};

// Function to create a new Kasir
export const createKasir = async (data: Kasir) => {
    try {
        const newKasir = await prisma.kasir.create({
            data: data,
        });
        return newKasir;
    } catch (error) {
        console.error('Error creating Kasir:', error);
        throw error;
    }
};

// Function to get all Kasir
export const getAllKasir = async () => {
    try {
        const allKasir = await prisma.kasir.findMany();
        return allKasir;
    } catch (error) {
        console.error('Error getting all Kasir:', error);
        throw error;
    }
};

// Function to get a specific Kasir by KodeKasir
export const getKasirById = async (KodeKasir: string) => {
    try {
        const kasir = await prisma.kasir.findUnique({
            where: { KodeKasir: KodeKasir },
        });
        return kasir;
    } catch (error) {
        console.error('Error getting Kasir by ID:', error);
        throw error;
    }
};

// Function to update a Kasir by KodeKasir
export const updateKasir = async (KodeKasir: string, data: Kasir) => {
    try {
        const updatedKasir = await prisma.kasir.update({
            where: { KodeKasir: KodeKasir },
            data: data,
        });
        return updatedKasir;
    } catch (error) {
        console.error('Error updating Kasir:', error);
        throw error;
    }
};

// Function to delete a Kasir by KodeKasir
export const deleteKasir = async (KodeKasir: string) => {
    try {
        const deletedKasir = await prisma.kasir.delete({
            where: { KodeKasir: KodeKasir },
        });
        return deletedKasir;
    } catch (error) {
        console.error('Error deleting Kasir:', error);
        throw error;
    }
};

// Function to create a new Tenan
export const createTenan = async (data: Tenan) => {
    try {
        const newTenan = await prisma.tenan.create({
            data: data,
        });
        return newTenan;
    } catch (error) {
        console.error('Error creating Tenan:', error);
        throw error;
    }
};

// Function to get all Tenan
export const getAllTenan = async () => {
    try {
        const allTenan = await prisma.tenan.findMany();
        return allTenan;
    } catch (error) {
        console.error('Error getting all Tenan:', error);
        throw error;
    }
};

// Function to get a specific Tenan by KodeTenan
export const getTenanById = async (KodeTenan: string) => {
    try {
        const tenan = await prisma.tenan.findUnique({
            where: { KodeTenan: KodeTenan },
        });
        return tenan;
    } catch (error) {
        console.error('Error getting Tenan by ID:', error);
        throw error;
    }
};

// Function to update a Tenan by KodeTenan
export const updateTenan = async (KodeTenan: string, data: Tenan) => {
    try {
        const updatedTenan = await prisma.tenan.update({
            where: { KodeTenan: KodeTenan },
            data: data,
        });
        return updatedTenan;
    } catch (error) {
        console.error('Error updating Tenan:', error);
        throw error;
    }
};

// Function to delete a Tenan by KodeTenan
export const deleteTenan = async (KodeTenan: string) => {
    try {
        const deletedTenan = await prisma.tenan.delete({
            where: { KodeTenan: KodeTenan },
        });
        return deletedTenan;
    } catch (error) {
        console.error('Error deleting Tenan:', error);
        throw error;
    }
};

// Function to create a new Nota
export const createNota = async (data: Nota) => {
    try {
        const newNota = await prisma.nota.create({
            data: data,
        });
        return newNota;
    } catch (error) {
        console.error('Error creating Nota:', error);
        throw error;
    }
};

// Function to get all Nota
export const getAllNota = async () => {
    try {
        const allNota = await prisma.nota.findMany();
        return allNota;
    } catch (error) {
        console.error('Error getting all Nota:', error);
        throw error;
    }
};

// Function to get a specific Nota by KodeNota
export const getNotaById = async (KodeNota: string) => {
    try {
        const nota = await prisma.nota.findUnique({
            where: { KodeNota: KodeNota },
        });
        return nota;
    } catch (error) {
        console.error('Error getting Nota by ID:', error);
        throw error;
    }
};

// Function to update a Nota by KodeNota
export const updateNota = async (KodeNota: string, data: Nota) => {
    try {
        const updatedNota = await prisma.nota.update({
            where: { KodeNota: KodeNota },
            data: data,
        });
        return updatedNota;
    } catch (error) {
        console.error('Error updating Nota:', error);
        throw error;
    }
};

// Function to delete a Nota by KodeNota
export const deleteNota = async (KodeNota: string) => {
    try {
        const deletedNota = await prisma.nota.delete({
            where: { KodeNota: KodeNota },
        });
        return deletedNota;
    } catch (error) {
        console.error('Error deleting Nota:', error);
        throw error;
    }
};

// Function to create a new BarangNota
export const createBarangNota = async (data: BarangNota) => {
    try {
        const newBarangNota = await prisma.barangNota.create({
            data: data,
        });
        return newBarangNota;
    } catch (error) {
        console.error('Error creating BarangNota:', error);
        throw error;
    }
};

// Function to get all BarangNota
export const getAllBarangNota = async () => {
    try {
        const allBarangNota = await prisma.barangNota.findMany();
        return allBarangNota;
    } catch (error) {
        console.error('Error getting all BarangNota:', error);
        throw error;
    }
};

// Function to get a specific BarangNota by KodeNota and KodeBarang
export const getBarangNotaById = async (KodeNota: string, KodeBarang: string) => {
    try {
        const barangNota = await prisma.barangNota.findUnique({
            where: { KodeNota_KodeBarang: { KodeNota, KodeBarang } },
        });
        return barangNota;
    } catch (error) {
        console.error('Error getting BarangNota by ID:', error);
        throw error;
    }
};

// Function to update a BarangNota by KodeNota and KodeBarang
export const updateBarangNota = async (
    KodeNota: string,
    KodeBarang: string,
    data: BarangNota
) => {
    try {
        const updatedBarangNota = await prisma.barangNota.update({
            where: { KodeNota_KodeBarang: { KodeNota, KodeBarang } },
            data: data,
        });
        return updatedBarangNota;
    } catch (error) {
        console.error('Error updating BarangNota:', error);
        throw error;
    }
};

// Function to delete a BarangNota by KodeNota and KodeBarang
export const deleteBarangNota = async (KodeNota: string, KodeBarang: string) => {
    try {
        const deletedBarangNota = await prisma.barangNota.delete({
            where: { KodeNota_KodeBarang: { KodeNota, KodeBarang } },
        });
        return deletedBarangNota;
    } catch (error) {
        console.error('Error deleting BarangNota:', error);
        throw error;
    }
};