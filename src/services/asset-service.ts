import mongoose, { Document, Types } from 'mongoose';
import Config from '../config';
import AssetModel from '../models/asset';

import { Asset, BusinessLine } from '../domain/asset';

const pipeline: any[] = [
  {
    $lookup: {
      as: 'completed_tests',
      foreignField: 'test_id',
      from: 'tests',
      localField: 'test_id'
    }
  },
  { $unwind: {
      path: '$completed_tests',
      preserveNullAndEmptyArrays: true
    }
  },
  { $sort: { 'completed_tests.start' : -1 } },
  {
    $group: {
      _id: '$_id',
      asset_id: { $first: '$asset_id' },
      business_line: { $first: '$business_line' },
      test_id: { $first: '$test_id' },
      asset_type: { $first: '$asset_type' },
      description: { $first: '$description' },
      url: { $first: '$url' },
      proof_url: { $first: '$proof_url' },
      path: { $first: '$path' },
      version: { $first: '$version' },
      personas: { $first: '$personas' },
      completed_tests: { $push: '$completed_tests' }
    }
  },
  {
    $project: {
      _id: 0,
      asset_id: 1,
      business_line: 1,
      test_id: 1,
      asset_type: 1,
      description: 1,
      url: 1,
      proof_url: 1,
      path: 1,
      version: 1,
      personas: {
        persona_id: 1,
        persona_name: 1,
        data: 1
      },
      completed_tests: {
        $slice: [
          '$completed_tests',
          5
        ]
      }
    }
  },
  {
    $lookup: {
      as: 'active_builds',
      foreignField: 'test_id',
      from: 'builds',
      localField: 'test_id'
    }
  }
];

export default class AssetService {
  public static incrementAssetId ( count: string ): string {
    const length = count.length;
    let idNum: string;
    // best way to iterate to next ID number is check length of count and append it to the appropro amount of 0s
    if ( length === 2 ) {
      idNum = '0' + count;
    } else if ( length === 1 ) {
      idNum = '00' + count;
    } else {
      idNum = count;
    }
    return idNum;
  }

  /**
   * Fetches all assets for provided business line
   *
   * @param {BusinessLine} businessLine
   * @returns {Promise<[Asset]>}
   */
  public async getAssetsForBusinessLine ( businessLine: BusinessLine ): Promise<Asset[]> {
    const queryPipeline = pipeline.slice();
    /**
     * Don't limit by business_line if the provided line is 'all'
     */
    if ( businessLine !== 'all' ) {
      queryPipeline.unshift(
        { $match : { business_line: businessLine } }
      );
    } else {
      queryPipeline.push(
        { $sort : { business_line: 1 } }
      );
    }

    return new Promise<Asset[]>( ( resolve, reject ) => {
      AssetModel.aggregate( queryPipeline, ( err: any, results: Asset[] ) => {
        if ( err ) {
          console.log( err );
          reject( err );
        } else {
          results = results.map( ( result: Asset ) => {
            const tests = result.completed_tests;
            const numPassing = tests.reduce( ( passing, test ) => {
              const { skipped, failed, passed } = test;
              // const total = skipped + failed + passed;
              return passing + ( failed === 0 ? 1 : 0 );
            }, 0 );

            result.asset_health = {
              pass_rate: numPassing / tests.length
            };

            return result;
          } );
          resolve( results );
        }
      } );
    } );
  }

  /**
   * Fetches one asset with provided assetId
   *
   * @param {string} assetId
   * @returns {Promise<[Asset]>}
   */
  public async getAssetById ( assetId: string ): Promise<Asset> {
    const queryPipeline = pipeline.slice();
    queryPipeline.unshift( {
      $match: { asset_id: assetId }
    } );
    return new Promise<Asset>( ( resolve, reject ) => {
      AssetModel.aggregate( queryPipeline, ( err: any, results: Asset[] ) => {
        if ( err || ! results ) {
          reject( err );
        } else {
          results = results.map( ( result: Asset ) => {
            const tests = result.completed_tests;
            const numPassing = tests.reduce( ( passing, test ) => {
              const { skipped, failed, passed } = test;
              // const total = skipped + failed + passed;
              return passing + ( failed === 0 ? 1 : 0 );
            }, 0 );

            result.asset_health = {
              pass_rate: numPassing / tests.length
            };

            return result;
          } );
          resolve( results.pop() );
        }
      } );
    } );
  }

  /**
   * Counts assets by businessLine and creates new assetId
   * Then creates asset for provided business line
   *
   * @param {Asset} asset
   * @returns {Promise<[boolean]>}
   */
  public async createAsset ( asset: Asset ): Promise<object> {
    return new Promise<object>( ( resolve, reject ) => {
      AssetModel.count( { business_line: asset.business_line }, ( err, count ) => {
        let resp;
        if ( err ) {
          resp = {
            success: false,
            response: err
          };
          reject( resp );
        } else {
          count++;
          const idSuffix = AssetService.incrementAssetId( count.toString() );
          const newId: string = Config.businessLineInitialMap[ asset.business_line ] + '-' + asset.asset_type + '-' + idSuffix;
          asset.asset_id = newId.toUpperCase();

          return AssetModel.create( asset, ( createError: any, doc: Document ) => {
            if ( createError || ! doc ) {
              resp = {
                success: false,
                response: createError ? createError : 'Asset creation failed.'
              };
            } else {
              resp = {
                success: true,
                response: 'Asset successfully created.'
              };
            }
            resolve( resp );
          } );
        }
      } );
    } );
  }

  /**
   * Updates asset
   *
   * @param {Asset} asset
   * @returns {Promise<[boolean]>}
   */
  public async updateAsset ( asset: Asset ): Promise<object> {
    const query = { asset_id: asset.asset_id };

    return new Promise<object>( ( resolve, reject ) => {
      AssetModel.findOneAndUpdate( query, asset, ( err: any, doc: Document ) => {
          if ( err || ! doc ) {
            reject( {
              success: false,
              response: err
            } );
          } else {
            resolve( {
              success: true,
              response: 'Asset successfully updated.'
            } );
          }
      } );
    } );
  }

  /**
   * Deletes asset
   *
   * @param {string} assetId
   * @returns {Promise<[boolean]>}
   */
  public async deleteAsset ( assetId: string ): Promise<object> {
    const query = { asset_id: assetId };

    return new Promise<object>( ( resolve, reject ) => {
      AssetModel.deleteOne( query, ( err: any ) => {
        if ( err ) {
          reject( {
            success: false,
            response: err
          } );
        } else {
          resolve( {
            success: true,
            response: 'Asset successfully deleted.'
          } );
        }
      } );
    } );
  }
}
