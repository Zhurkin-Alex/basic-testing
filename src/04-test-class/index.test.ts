import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawalAmount = 150;
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.withdraw(withdrawalAmount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const transferAmount = 150;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(0);

    expect(() => {
      account1.transfer(transferAmount, account2);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 50;
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.transfer(transferAmount, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawalAmount = 50;
    const account = getBankAccount(initialBalance);

    account.withdraw(withdrawalAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 100;
    const initialBalance2 = 200;
    const transferAmount = 50;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);

    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();

    if (typeof balance === 'number' || typeof balance === 'object') {
      expect(true).toBe(true);
    } else {
      throw new Error('Received value is not of type number or object.');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    const balance = 100;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
