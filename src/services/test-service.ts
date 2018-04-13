import TestModel from '../models/test';

import Test from '../domain/test';

export default class TestService {
  /**
   * Saves test data
   *
   * @param {Test} test
   * @returns {Promise<>}
   */
  public async saveTest ( test: Test ): Promise<any> {
    return TestModel.create( test );
  }
}
