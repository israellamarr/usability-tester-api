import Resolution from '../../src/domain/resolution';

declare namespace WebdriverIO {
  interface Client<T> {
    setValueForVisible( selector: string, value: string ): void;
    waitAndSetValue( selector: string, value: string ): void;
    safeSelect( selector: string ): void;
    takeTheShot( resolution: Resolution, path: string ): void;
  }
}
