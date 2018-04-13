const {
  clickContinue,
  registerSpec,
  birthdaySpec,
  genderSpec,
  YesNo,
  MultipleChoice
} = require( './freeforms.js' );

const base = 'localhost:8080/#/';
const test_id = browser.options.test_id;
const persona = browser.options.persona.data;
const pathAssertions = browser.options.pathAssertions;
const resolution = browser.options.resolution;
const screenshotPath = browser.options.screenshotPath;
console.log( browser.options );

// Global Selectors
const globalSelectors = {
  survey_anchor: '[class^=app__AppContainer]',
  continue: '.button'
};

const assetURL = base + pathAssertions[ 0 ].name;
let currentPath;

// Test entry
describe( `Testing ${ test_id }`, () => {
  startTest();
  let i = 0;
  while ( i < pathAssertions.length ) {
    currentPath = pathAssertions[ i ];
    checkUrl( currentPath );
    specSwitcher( currentPath );
    takeScreenshot( currentPath );
    clickContinue( globalSelectors.continue );
    i++
  }
} );

function startTest () {
  it( 'should open the site and wait for app load', () => {
    browser.url( assetURL );
    expect( browser.getUrl() === assetURL );
    browser.waitForVisible( globalSelectors.survey_anchor );
  });
}

function checkUrl () {
  it( 'should land on next path - ' + currentPath.name, () => {
    expect( browser.getUrl() === base + currentPath.name );
  });
}

function specSwitcher ( path ) {
  switch ( path.name ) {
    case 'personal_data':
      registerSpec( path, globalSelectors, persona );
      break;
    case 'birthday':
      birthdaySpec( path, globalSelectors, persona );
      break;
    case 'gender':
      genderSpec( path, globalSelectors, persona );
      break;
    default:
      if ( path.type === 'YesNo' ) {
        YesNo( path, globalSelectors, persona[ path.name ] );
      } else {
        MultipleChoice( path, globalSelectors, persona[ path.name ] );
      }
  }
}

function takeScreenshot ( path ) {
  it( 'should take a screenshot on' + path.name, function () {
    browser.takeTheShot( resolution, screenshotPath );
  } );
}