/**
 * Data about a finished test
 */
import Resolution from './resolution';

export default interface Test {
  results: string;
  test_id: string;
  duration: number;
  start: Date;
  end: Date;
  passed: number;
  failed: number;
  skipped: number;
  browser: string;
  screenshots?: string[];
  test_path: string;
  resolution: Resolution
}
