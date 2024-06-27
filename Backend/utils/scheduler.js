import cron from 'node-cron';
import { updateGameStatus } from '../controllers/ticketController.js'

// Schedule a task to run every 15 minutes
cron.schedule('*/10 * * * *', async () => {
  try {
    console.log('Running scheduled job to update game results');
    await updateGameStatus();
    console.log('Game results updated successfully');
  } catch (error) {
    console.error('Error updating game results:', error);
  }
});