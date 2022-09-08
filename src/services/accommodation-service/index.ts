import { notFoundError } from "@/errors";
import { accommodationRepository } from "@/repositories/accommodation-repository";
import userRepository from "@/repositories/user-repository";

const getHotels = async () => {
	const hotels = await accommodationRepository.getHotels();
	if(!hotels) throw notFoundError();
	return hotels;
}

const getRoomsByHotelName = async (name: string) => {
	const { id } = await accommodationRepository.getHotelByName(name);
	if(!id) throw notFoundError();

	const rooms = await accommodationRepository.getRoomsByHotelId(id);
	return rooms;
}

const getReservation = async (userId: number) => {
	const user = await userRepository.getById(userId);
	if(!user) throw notFoundError();

	const reservation = await accommodationRepository.getReservationsByUserId(userId);
	if(!reservation) throw notFoundError();

	return reservation;
}

const createReservation = async (data: any) => {
	const { userId, hotel, room, indexVacancy } = data;
	const auxHotel = await accommodationRepository.getHotelByName(hotel.name);
	if(!auxHotel) throw notFoundError();

	const auxRoom = await accommodationRepository.getRoomById(room.id);
	if(!auxRoom) throw notFoundError();

	return await accommodationRepository.createReservation({
		userId, 
		hotelId: auxHotel.id, 
		roomId: room.id, 
		updatedVacancy: (room.accommodationVacancy-1), 
		indexVacancy
	}); 
}

const modificateReservation = async (data: any) => {
	const { reservationId, hotel, room, userId, indexVacancy} = data;
	const reservation = await accommodationRepository.getReservationById(reservationId);
	if(!reservation) throw notFoundError();

	const auxHotel = await accommodationRepository.getHotelByName(hotel.name);
	if(!auxHotel) throw notFoundError();

	const auxRoom = await accommodationRepository.getRoomById(room.id);
	if(!auxRoom) throw notFoundError();

	return await accommodationRepository.modificateAccommodation({
		reservationId, 
		data: {
			userId, 
			hotelId: auxHotel.id, 
			roomId: room.id, 
			updatedVacancy: (room.accommodationVacancy-1), 
			indexVacancy
	 	}
	}); 
}

export const accommodationService = {
	getHotels, getRoomsByHotelName, getReservation, createReservation, modificateReservation
};