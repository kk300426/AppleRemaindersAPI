import { ReminderService } from '../services/remindersService.js';

export const ReminderController = {
    async getAllReminders(req, res) {
        try {
            const reminders = await ReminderService.getAllReminders();
            return res.status(200).json(reminders);
        } catch (error) {
            return res.status(500).send({ message: 'internal server error' });
        }
    },

    async getReminderById(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await ReminderService.getReminderById(reminderId);
            return res.status(200).json(reminder);
        } catch (error) {
            return res.status(500).send({ message: 'internal server error' });
        }
    },

    async createReminder(req, res) {
        try {
            const reminder = await ReminderService.createReminder(req.body);
            return res.status(201).json(reminder);
        } catch (error) {
            return res.status(500).send({ message: 'internal server error' });
        }
    },

    async updateReminder(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const updatedReminder = await ReminderService.updateReminder(reminderId, req.body);
            return res.status(200).json(updatedReminder);
        } catch (error) {
            return res.status(500).send({ message: 'internal server error' });
        }
    },

    async deleteReminder(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const deleteMessage = await ReminderService.deleteReminder(reminderId);
            return res.status(200).json(deleteMessage);
        } catch (error) {
            return res.status(500).send({ message: 'internal server error' });
        }
    },
};
