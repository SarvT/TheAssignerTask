import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';

export const processTransaction = async (senderId, receiverId, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      throw new Error('Invalid sender or receiver ID format');
    }

    // Fetch sender and receiver
    const sender = await User.findById(senderId).session(session);
    const receiver = await User.findById(receiverId).session(session);

    if (!sender || !receiver) throw new Error('Sender or receiver not found');
    if (sender.balance < amount) throw new Error('Insufficient balance');

    // Perform transaction
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save({ session });
    await receiver.save({ session });

    // Save transaction record
    const transaction = new Transaction({ senderId, receiverId, amount });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: 'Transaction successful' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
