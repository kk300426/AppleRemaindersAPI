import { ReminderService } from '../services/remindersService.js';

export const ReminderController = {
  async getAllReminders(req, res, next) {
    try {
      const data = await ReminderService.getAllReminders();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getReminderById(req, res, next) {
    try {
      const data = await ReminderService.getReminderById(
        parseInt(req.params.id)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async createReminder(req, res, next) {
    try {
      const data = await ReminderService.createReminder(req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async updateReminder(req, res, next) {
    try {
      const data = await ReminderService.updateReminder(
        parseInt(req.params.id),
        req.body
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async deleteReminder(req, res, next) {
    try {
      const data = await ReminderService.deleteReminder(
        parseInt(req.params.id)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};