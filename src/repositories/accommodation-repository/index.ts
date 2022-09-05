import { prisma } from '../../config';

interface createReservation {
	userId: number, 
	hotelId: number, 
	roomId: number, 
	updatedVacancy: number, 
	indexVacancy: number
}

const createReservation = async (data: createReservation) => {
	const { userId, hotelId, roomId, updatedVacancy, indexVacancy } = data;
	await prisma.room.update({ where: { id: roomId }, data: { accommodationVacancy: updatedVacancy } }); //atualiza lugares disponíveis
	return await prisma.reserves.create({
		data: {
			hotelId, roomId, userId, selectedVacancy: indexVacancy
		}
	});
}

const getHotelByName = async (name: string) => {
	return await prisma.hotel.findUnique({ 
		where: { name },
		select: {
			id: true
		} 
	});
}

const getRoomsByHotelId = async (hotelId: number) => {
	return await prisma.room.findMany({ where: { hotelId } });
}

const getRoomByNumber = async (number: number) => {
	return await prisma.room.findUnique({ where: { number } });
}

const getRoomById = async (id: number) => {
	return await prisma.room.findUnique({ where: { id } });
}

const getReservationsByUserId = async (userId: number) => {
	return await prisma.reserves.findFirst({ 
		where: { userId },
		select: {
			hotel: {
				select: {
					name: true,
					image: true
				}
			},
			room: {
				select: {
					number: true
				}
			},
			selectedVacancy: true
		} 
	});
}

const getHotels = async () => {
	return await prisma.hotel.findMany(); 
}

export const accommodationRepository = { 
	createReservation, 
	getHotelByName, 
	getHotels, 
	getRoomById, 
	getRoomByNumber, 
	getRoomsByHotelId, 
	getReservationsByUserId  
};