import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
const prisma = new PrismaClient();

export const CrearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {

    const { nombre,dni,telefono,correo,contrasena,es_propietario } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const user = await prisma.usuario.create({
      data: {
    
        nombre,dni,telefono,correo,contrasena: hashedPassword,es_propietario,},
      });

    res.status(201).json({ message: "Usuario Creado Correctamente", info: user });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(res)
  }
};

export const Logeo = async (req: Request, res: Response)=> {
  try {
    const { correo, contrasena } = req.body;
    const user = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!user) {
      return res.status(401).json({ message: "Correo no Regisrado" });
    }
    const passwordIsValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ auth: false, message: "Ups ... Contraseña Incorrecta" });
    }

    const token = jwt.sign(user, process.env.TOKEN_SECRET!, {
   
      expiresIn: 24*60*60,
    });

    res.json({ auth: true ,token });
  } catch (error) {
    res.status(500).json({ auth: false, message: error });
    console.log(error)
  }
};


export const BuscarUsuario = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    const user = await prisma.usuario.findUnique({

      where: {id,},

      select: {id: true,nombre: true,dni: true,telefono:true,
      correo : true},
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const EliminarUsuario = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);

    const user = await prisma.usuario.delete({
      where: {id}
    });

    res.json("Usuario Eliminado");
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const ActualiUsuario = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { nombre,dni,telefono,correo,contrasena,es_propietario } = req.body;
    const id: number = parseInt(req.params.id);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
 
    const usuarioUpda = await prisma.usuario.update({
      where: {id},
      data: {
        nombre,dni,telefono,correo,contrasena: hashedPassword,es_propietario,},
      });

    res.json({
      message: "Se Actualizo el Usuario",
      info: usuarioUpda,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const AllUsuario = async (_req: Request, res: Response): Promise<void> => {
  try {

    const allusuario = await prisma.usuario.findMany({

      select: {
        nombre:true,dni:true,telefono:true,correo:true,contrasena:true,es_propietario:true,
      },
    });
    res.json(allusuario);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};