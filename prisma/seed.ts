import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
	let event = await prisma.event.findFirst();
	if (!event) {
		event = await prisma.event.create({
			data: {
				title: 'Driven.t',
				logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
				backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
				startsAt: dayjs().toDate(),
				endsAt: dayjs().add(21, 'days').toDate(),
			},
		});
	}

	console.log({ event });
}

const seedHotel = async () => {
	const hotel = await prisma.hotel.findFirst();
	if (!hotel) {
		for (let i = 0; i < 3; i++) {
			let data = { name: `Hotel ${i + 1}`, image: 'https://images6.alphacoders.com/519/thumb-1920-519784.jpg', vacancy: 10, accommodationType: '' };
			switch (i) {
				case 0:
					data = { ...data, accommodationType: 'Single' };
					break;
				case 1:
					data = { ...data, accommodationType: 'Single e Double' };
					break;
				case 2:
					data = { ...data, accommodationType: 'Single, Double e Triple' };
					break;
			}
			await prisma.hotel.create({ data });
		}
	}
}

const seedRoom = async () => {
	const room = await prisma.room.findFirst();
	if (!room) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 6; j++) {
				let data = { number: 100 + (j + 1), hotelId: (i + 1), accommodationVacancy: 0 };
				if ((j % 2 === 0 && (j % 3 !== 0))) {
					data = { ...data, accommodationVacancy: 1 };
				}
				else if ((j % 2 !== 0 && (j % 3 === 0))) {
					data = { ...data, accommodationVacancy: 2 };
				}
				else if (((j % 2 === 0 && (j % 3 === 0)) || (j === 5))) {
					data = { ...data, accommodationVacancy: 3 };
				}
				await prisma.room.create({ data });
			}
		}
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await seedHotel();
		await seedRoom();
		await prisma.$disconnect();
	});
