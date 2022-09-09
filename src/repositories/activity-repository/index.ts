import { prisma } from '@/config';

export function findActiviesByEventId(eventId: number) {
  return prisma.activity.findMany({
    where: {
      eventId,
    },
    orderBy: {
      date: 'asc',
    },
  });
}

export function findActivity(activityId: number) {
  return prisma.activity.findFirst({
    where: {
      id: activityId,
    },
  });
}

export function findUserActivies(enrollementId: number, eventId: number) {
    return prisma.userActivities.findMany({
        where: {
            enrollementId,
        },
    });
}

export function findUserActivity(enrollementId: number, activityId: number) {
  return prisma.userActivities.findFirst({
    where: {
      enrollementId,
      activityId,
    },
  });
}

export function registerToActivity(enrollementId: number, activityId: number) {
  return prisma.userActivities.create({
    data: {
      enrollementId,
      activityId,
    },
  });
}

export function decreaseActivityVacancy(activityId: number, vacancy: number) {
  return prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      vacancy: {
        decrement: vacancy,
      },
    },
  });
}
