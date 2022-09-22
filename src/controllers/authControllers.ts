import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from '../prisma/client';
import { jwtSecret, saltRounds } from '../config';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { name, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        name: name
      }
    });

    // If there is not a user
    if (!user) {
      throw new Error('Your name or password is wrong.')
    };

    const passwordCheck = bcrypt.compareSync(password, user.password);

    // If password is wrong
    if(!passwordCheck) {
      throw new Error('Your name or password is wrong.')
    }

    const token = jwt.sign(
      { sub: user.id },
      jwtSecret
    );

    res.status(200).json({ token });
    
  } catch(error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    res.status(401).json({ message: message });
  }
};

export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { name, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        name: name
      }
    });

    // If there is the same name in DB
    if (user) {
      throw new Error('The user name has alrady been registered. Please use a different name.')
    };

    const passwordHash = bcrypt.hashSync(password, saltRounds);
    const userId = uuidv4();

    const createdUser = await prisma.user.create({
      data: {
        id: userId,
        name: name,
        password: passwordHash
      }
    })

    const token = jwt.sign(
      { sub: createdUser.id },
      jwtSecret
    );

    res.status(200).json({ token });

  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    res.status(401).json({ message: message });
  }
};

