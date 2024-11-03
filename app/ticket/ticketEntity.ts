var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

enum TicketStatus {
  OPEN = 1, CLOSE = 2, FINISHED = 3
}

enum TicketPriority {
  MEDIUM = 1,
  HIGH = 2,
  CRITICAL = 3
}

export class TicketCommentEntity {
  _id: string = "";
  body: string = "";
  userId: string = "";
  ticketId: string = "";
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export class TicketEntity {
  _id: string = "";
  subject: string = "";
  body: string = "";
  attachments: string[] = [];

  categoryId: string = "";
  priority: TicketPriority = TicketPriority.MEDIUM;
  status: TicketStatus = TicketStatus.OPEN;


  completedAt: Date | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
export const TicketSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  subject: Joi.string(),
  body: Joi.string(),

  attachments: Joi.array().min(0),
  categoryId: Joi.objectId(),

  priority: Joi.string(),
  status: Joi.string(),

  completedAt: Joi.string().allow(""),
  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});




module.exports = {
  TicketEntity,
  TicketSchema
};