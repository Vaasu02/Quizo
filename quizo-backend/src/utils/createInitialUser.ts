import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export const createInitialUser = async () => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Check if demo user exists
    const existingUser = await userRepository.findOne({
      where: { username: 'teacher' }
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = userRepository.create({
        username: 'teacher',
        password: hashedPassword
      });
      
      await userRepository.save(user);
      console.log('Demo teacher account created successfully');
    }
  } catch (error) {
    console.error('Error creating initial user:', error);
  }
}; 