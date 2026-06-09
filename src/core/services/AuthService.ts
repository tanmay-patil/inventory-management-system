import { User, Role } from '../entities/User';

export class AuthService {
  /**
   * Mock authentication for Phase 0.
   * Validates against hardcoded credentials as per requirements.
   */
  public static async login(username: string, password: string): Promise<User | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === 'admin' && password === 'Admin@IMS') {
      return { id: '1', username: 'admin', role: Role.ADMIN, name: 'System Admin' };
    }
    if (username === 'manager' && password === 'Manager@IMS') {
      return { id: '2', username: 'manager', role: Role.MANAGER, name: 'Inventory Manager' };
    }
    if (username === 'engineer' && password === 'Engineer@IMS') {
      return { id: '3', username: 'engineer', role: Role.ENGINEER, name: 'Field Engineer' };
    }

    return null;
  }
}
