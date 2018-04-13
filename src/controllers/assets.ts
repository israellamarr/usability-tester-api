import { Request, Response, Router } from 'express';
import { Asset, BusinessLine } from '../domain/asset';
import Persona from '../domain/persona';
import AssetService from '../services/asset-service';
import PersonaService from '../services/persona-service';

const assetsRouter: Router = Router();
const assetService = new AssetService();
const personaService = new PersonaService();

assetsRouter.get( '/:businessLine', ( req: Request, res: Response ) => {
  const business_line: BusinessLine = req.params.businessLine;
  assetService.getAssetsForBusinessLine( business_line )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) );
} );

assetsRouter.get( '/find/:assetId', ( req: Request, res: Response ) => {
  const asset_id: string = req.params.assetId;
  assetService.getAssetById( asset_id )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) );
} );

assetsRouter.post( '/', ( req: Request, res: Response ) => {
  const asset: Asset = req.body.asset;
  assetService.createAsset( asset )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) )
    .catch( ( err ) => { res.send( err ); } );
} );

assetsRouter.put( '/', ( req: Request, res: Response ) => {
  const asset: Asset = req.body.asset;
  assetService.updateAsset( asset )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) )
    .catch( ( err ) => { res.send( err ); } );
} );

assetsRouter.delete( '/:assetId', ( req: Request, res: Response ) => {
  const asset_id: string = req.params.assetId;
  assetService.deleteAsset( asset_id )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) )
    .catch( ( err ) => { res.send( err ); } );
} );

assetsRouter.post( '/persona', ( req: Request, res: Response ) => {
  const asset_id: string = req.body.asset_id;
  const persona: Persona = req.body.persona;
  personaService.createPersona( asset_id, persona )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) )
    .catch( ( err ) => { res.send( err ); } );
} );

assetsRouter.put( '/persona', ( req: Request, res: Response ) => {
  const persona: Persona = req.body.persona;
  personaService.updatePersona( persona )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) )
    .catch( ( err ) => { res.send( err ); } );
} );

assetsRouter.delete( '/persona/:personaId', ( req: Request, res: Response ) => {
  const personaId: string = req.params.personaId;
  personaService.deletePersona( personaId )
    .then( results => res.json( results ), err => res.status( 500 ).json( err ) )
    .catch( ( err ) => { res.send( err ); } );
} );

export default assetsRouter;
