/* eslint-disable no-console */
import { Request, Response } from 'express';
import { accommodationService } from '@/services/accommodation-service';

export const getReservationController = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const reservation = await accommodationService.getReservation(userId);
  res.status(200).send(reservation);
};

export const getHotelsController = async (req: Request, res: Response) => {
  const hotels = await accommodationService.getHotels();
  res.status(200).send(hotels);
};

export const getRoomsController = async (req: Request, res: Response) => {
  const { hotelName } = req.params;
  const rooms = await accommodationService.getRoomsByHotelName(hotelName);
  res.status(200).send(rooms);
};

export const createReservationController = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { body } = req;
  await accommodationService.createReservation({ ...body, userId });
  res.sendStatus(201);
};

export const modificateReservationController = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { body } = req;
  await accommodationService.modificateReservation({ ...body, userId });
  res.sendStatus(200);
};
