import Mongoose, { Schema } from 'mongoose';

const TestSchema = new Schema( {
  browser: {
    required: true,
    type: String
  },
  duration: {
    required: true,
    type: Number
  },
  end: {
    required: true,
    type: Date
  },
  failed: {
    required: true,
    type: Number
  },
  passed: {
    required: true,
    type: Number
  },
  results: {
    required: true,
    type: String
  },
  skipped: {
    required: true,
    type: Number
  },
  start: {
    required: true,
    type: Date
  },
  test_id: {
    required: true,
    type: String
  },
  test_path: {
    required: true,
    type: String
  },
  resolution: {
    required: false,
    type: Object
  },
  screenshots: [ String ]
} );

const TestModel = Mongoose.model( 'Test', TestSchema );
export default TestModel;
