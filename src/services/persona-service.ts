import { Document } from 'mongoose';
import AssetModel from '../models/asset';

import { Asset } from '../domain/asset';
import Persona from '../domain/persona';

export default class PersonaService {

  /**
   * Creates persona
   *
   * @param {string} assetId
   * @param {Persona} persona
   * @returns {Promise<[object]>}
   */
  public async createPersona ( assetId: string, persona: Persona ): Promise<object> {
    const query = { asset_id: assetId };
    const min = Math.ceil( 1 );
    const max = Math.floor( 1000 );
    const randomNumber = Math.floor( Math.random() * ( max - min ) ) + min;

    persona.persona_id = assetId.substring( 0, 3 ) + '-' + randomNumber;

    return new Promise<object>( ( resolve, reject ) => {
      AssetModel.update( query, { $push: { personas: persona } }, { new : true }, ( err: any, doc: Document ) => {
        if ( err || ! doc ) {
          reject( {
            success: false,
            response: err
          } );
        } else {
          resolve( {
            success: true,
            response: 'Persona successfully created.'
          } );
        }
      } );
    } );
  }

  /**
   * Updates persona
   *
   * @param {Persona} persona
   * @returns {Promise<[object]>}
   */
  public async updatePersona ( persona: Persona ): Promise<object> {
    const query = {
      'personas.persona_id': persona.persona_id
    };
    return new Promise<object>( ( resolve, reject ) => {
      AssetModel.update( query, { $set: { 'personas.$': persona } }, { new : true }, ( err: any, doc: Document ) => {
        if ( err || ! doc ) {
          reject( {
            success: false,
            response: err
          } );
        } else {
          resolve( {
            success: true,
            response: 'Persona successfully updated.'
          } );
        }
      } );
    } );
  }

  /**
   * Deletes persona to an asset
   *
   * @param {string} persona_id
   * @returns {Promise<[boolean]>}
   */
  public async deletePersona ( persona_id: string ): Promise<object> {
    const query = {
      'personas.persona_id': persona_id
    };
    const update = { $pull: { personas: { persona_id } } };

    return new Promise<object>( ( resolve, reject ) => {
      AssetModel.update( query, update, { new : true }, ( err: any, doc: Document ) => {
        if ( err || ! doc ) {
          reject( {
            success: false,
            response: err
          } );
        } else {
          resolve( {
            success: true,
            response: 'Persona successfully deleted.'
          } );
        }
      } );
    } );
  }
}
