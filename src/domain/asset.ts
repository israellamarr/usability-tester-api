import { Types } from 'mongoose';
import Build from './build';
import Persona from './persona';
import Test from './test';

export type AssetType = 'STATIC' | 'SURVEY';

export type BusinessLine =
  'all' |
  'beatpain' |
  'healthright' |
  'basemedical' |
  'ensurem' |
  'sitavig' |
  'lwp' |
  'cont';

export interface Asset {
  asset_id: string;
  asset_type: AssetType;
  business_line: BusinessLine;
  path: string;
  version: string;
  description: string;
  url: string;
  test_id: string;
  active_builds?: [ Build ]; // Agg field from controller
  completed_tests?: [ Test ]; // Agg field from controller
  proof_url?: string;
  personas?: [ Persona ];
  asset_health?: {
    pass_rate: number
  };
}

interface Asset2 {
  urls: AssetURL[];
  create_date: Date;
  name: string;
  description: string;
  active_tests: ActiveTest[];
  test_results: TestResult[];
  archived: boolean;
}

interface TestResult {

}

interface ActiveTest {
  start_time: Date;
}

interface Partner {
  name: string;
  url: string;
  create_date: Date;
  abbreviation: string;
}

interface PartnerBrand {
  colorA: Color;
  colorB: Color;
  logoURL: string;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

interface AssetURL {
  name: string;
  URL: string;
}
