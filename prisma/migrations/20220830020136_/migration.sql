-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "enrollementId" INTEGER NOT NULL,
    "isPresential" BOOLEAN NOT NULL,
    "haveHotel" BOOLEAN NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_enrollementId_fkey" FOREIGN KEY ("enrollementId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
