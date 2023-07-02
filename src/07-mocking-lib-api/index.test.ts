import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Enable fake timers
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run any remaining timers after each test
    jest.useRealTimers(); // Restore real timers
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    };

    jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockAxiosClient as unknown as AxiosInstance);

    const promise = throttledGetDataFromApi('/posts');

    jest.runAllTimers(); // Execute the throttled function immediately

    await promise;

    expect(mockAxiosClient.get).toHaveBeenCalledWith('/posts');
  });
});
