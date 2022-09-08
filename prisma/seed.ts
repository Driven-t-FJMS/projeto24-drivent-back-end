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

  let activity = await prisma.activity.findFirst();
  if (!activity) {
    await prisma.activity.createMany({
      data: [{
        title: 'HUB extra',
        startsAt: 12,
        endsAt: 13,
        vacancy: 0,
        eventId: event.id,
        location: 'Auditório Principal',
        date: dayjs().add(7, 'days').toDate(),
      },
      {
        title: 'Live Coding',
        startsAt: 12,
        endsAt: 13,
        vacancy: 100,
        eventId: event.id,
        location: 'Auditório Principal',
        date: dayjs().add(8, 'days').toDate(),
      },
      {
        title: 'Projetão',
        startsAt: 13,
        endsAt: 14,
        vacancy: 50,
        eventId: event.id,
        location: 'Auditório Principal',
        date: dayjs().add(8, 'days').toDate(),
      },
      {
        title: 'SQL',
        startsAt: 10,
        endsAt: 11,
        vacancy: 100,
        eventId: event.id,
        location: 'Auditório Lateral',
        date: dayjs().add(8, 'days').toDate(),
      },
      {
        title: 'Sala de Workshop',
        startsAt: 12,
        endsAt: 13,
        vacancy: 1,
        eventId: event.id,
        location: 'Auditório Principal',
        date: dayjs().add(8, 'days').toDate(),
      },
      {
        title: 'Docker',
        startsAt: 10,
        endsAt: 11,
        vacancy: 71,
        eventId: event.id,
        location: 'Auditório Principal',
        date: dayjs().add(9, 'days').toDate(),
      },
      {
        title: 'CI/CD',
        startsAt: 12,
        endsAt: 13,
        vacancy: 100,
        eventId: event.id,
        location: 'Auditório Principal',
        date: dayjs().add(9, 'days').toDate(),
      },
      {
        title: 'Scrum',
        startsAt: 11,
        endsAt: 12,
        vacancy: 0,
        eventId: event.id,
        location: 'Auditório Lateral',
        date: dayjs().add(9, 'days').toDate(),
      },
      {
        title: 'Bandeira Verde',
        startsAt: 12,
        endsAt: 13,
        vacancy: 100,
        eventId: event.id,
        location: 'Sala de Workshop',
        date: dayjs().add(9, 'days').toDate(),
      },
      ],
    });
  }
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
				await prisma.room.create({ data: {...data, accommodationVacancy: (i+1)} });
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
