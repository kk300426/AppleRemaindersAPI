import { ReminderModel } from '../models/remindersModel.js';
import CustomError from '../utils/CustomError.js';
import ERROR_MESSAGES from '../constants/errorMessages.js';
import redisClient from '../config/redis.js';

export const ReminderService = {
 async getAllReminders() {
  const cached = await redisClient.get('all-reminders');

  if (cached) {
    console.log('Serving reminders from Redis');
    return JSON.parse(cached);
  }

  const reminders = await ReminderModel.getAll();

  await redisClient.set(
    'all-reminders',
    JSON.stringify(reminders),
    {
      EX: 60,
    }
  );
  return reminders;
},
  async getReminderById(id) {
    const reminder = await ReminderModel.findById(id);

    if (!reminder) {
      throw new CustomError(ERROR_MESSAGES.NOT_FOUND, 404);
    } else {
      return reminder;
    }
  },

  async createReminder(data) {
  const { reminder, notes, userId } = data;

  const created = await ReminderModel.create({
    reminder: reminder.trim(),
    notes: notes?.trim() || null,
    userId,
  });

  await redisClient.del('all-reminders');

  return created;
},


  async updateReminder(id, data) {
    const fields = Object.keys(data);

    if (fields.length === 0) {
      throw new CustomError('No update data provided', 400);
    }

    const setClause = fields
      .map((f, i) => `${f} = $${i + 1}`)
      .join(', ');

    const values = Object.values(data);
    values.push(id);

    const query = `
      UPDATE reminders
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    const updated = await ReminderModel.update(query, values);

if (!updated) {
  throw new CustomError(ERROR_MESSAGES.NOT_FOUND, 404);
}

await redisClient.del('all-reminders');

return updated;
  },

  async deleteReminder(id) {
    const reminder = await ReminderModel.findById(id);

    if (!reminder) {
      throw new CustomError(ERROR_MESSAGES.NOT_FOUND, 404);
    }

    const deleted = await ReminderModel.delete(id);

    if (!deleted) {
      throw new CustomError(ERROR_MESSAGES.NOT_FOUND, 404);
    }
    await redisClient.del('all-reminders');
    return { message: 'Deleted successfully' };
  },
};