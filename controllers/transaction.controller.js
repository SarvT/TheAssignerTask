import { processTransaction } from '../services/transactionService.js';

export const handleTransaction = async (req, res) => {
  try {
    const { sender_id, receiver_id, amount } = req.body;
    const result = await processTransaction(sender_id, receiver_id, amount);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
