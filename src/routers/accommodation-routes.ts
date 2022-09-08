import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { 
	createReservationController, 
	getHotelsController, 
	getReservationController, 
    getRoomsController, 
	modificateReservationController
} from '@/controllers/accommodation-controller';

export const accommodationRouter = Router();
accommodationRouter.get('/hotels', getHotelsController);
accommodationRouter.get('/rooms/:hotelName', getRoomsController);
accommodationRouter.get('/reservation', /*authenticateToken,*/ getReservationController);
accommodationRouter.post('/reservation', /*authenticateToken,*/ createReservationController);
accommodationRouter.put('/reservation', /*authenticateToken,*/ modificateReservationController); //alterar reserva
