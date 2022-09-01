/*
  Warnings:

  - A unique constraint covering the columns `[eventId,enrollementId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ticket_eventId_enrollementId_key" ON "Ticket"("eventId", "enrollementId");
