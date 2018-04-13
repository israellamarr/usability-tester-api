/**
 * Sets the specified value for all matching elements that are visible
 * @param {string} selector
 * @param {string} value
 */
import Resolution from '../../src/domain/resolution';

const setValueForVisible = ( selector: string, value: string ) => {
  const elements = $$( selector );
  elements.forEach( elem => {
    if ( elem.isVisible() ) {
      elem.setValue( value );
    }
  } );
};

/**
 * Waits for a matching selector to be visible and sets the specified value for first matching
 * @param {string} selector
 * @param {string} value
 */
const waitAndSetValue = ( selector: string, value: string ) => {
  browser.waitForVisible( selector );
  browser.setValue( selector, value );
};

/**
 * Selects item matching provided selector if it is not already selected
 * @param {string} selector
 */
const safeSelect = ( selector: string ) => {
  if ( !browser.isSelected( selector ) ) {
    browser.click( selector );
  }
};

/**
 * Takes a screenshot at the provided resolution
 * @param {Resolution} resolution
 * @param {string} path
 */
const takeTheShot = ( resolution: Resolution, path: string ) => {
  if ( resolution ) {
    browser.setViewportSize( {
      width: resolution.x,
      height: resolution.y
    } );
  }
  const time = new Date().getTime();
  const fileName = resolution.name + '-'  + time + '.png';
  if ( path && fileName ) {
    browser.saveScreenshot( path + '/' + fileName );
  }
};

browser.addCommand( 'setValueForVisible', setValueForVisible );
browser.addCommand( 'waitAndSetValue', waitAndSetValue );
browser.addCommand( 'safeSelect', safeSelect );
browser.addCommand( 'takeTheShot', takeTheShot );
