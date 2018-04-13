import Mongoose, { Schema } from 'mongoose';

const BuildSchema = new Schema( {
  build_id: {
    required: true,
    type: String
  },
  start_time: {
    required: true,
    type: Date
  },
  test_id: {
    required: true,
    type: String
  }
} );

const BuildModel = Mongoose.model( 'Build', BuildSchema );
export default BuildModel;
