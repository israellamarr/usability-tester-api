import Mongoose, { Schema } from 'mongoose';

const PersonaSchema = new Schema( {
  persona_id: {
    required: true,
    type: String
  },
  persona_name: {
    required: true,
    type: String
  },
  data: {
    required: true,
    type: Object
  }
} );

const AssetSchema = new Schema( {
  asset_id: {
    required: true,
    type: String
  },
  asset_type: {
    required: true,
    type: String
  },
  business_line: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  path: {
    required: true,
    type: String
  },
  test_id: {
    required: true,
    type: String
  },
  url: {
    required: true,
    type: String
  },
  version: {
    required: true,
    type: String
  },
  proof_url: {
    required: false,
    type: String
  },
  personas: [ PersonaSchema ],
  asset_health: {
    required: false,
    pass_rate: {
      required: false,
      type: String
    }
  }
} );

const AssetModel = Mongoose.model( 'Asset', AssetSchema );
export default AssetModel;
