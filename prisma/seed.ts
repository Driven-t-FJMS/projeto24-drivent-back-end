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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
