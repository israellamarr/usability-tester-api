// Custom Specs
function registerSpec ( path, globalSelectors, persona ) {
  const selectors = {
    first_name: '[label="First Name:"]',
    last_name: '[label="Last Name:"]',
    zip_code: '[label="Zip Code:"]',
    email: '[label="Email Address:"]',
    phone: '[label="Phone Number:"]',
    terms: '#terms-checkbox'
  };

  it ( 'should run the register page', () => {
    browser.waitForVisible( selectors.first_name );
    browser.setValue( selectors.first_name, persona.first_name );
    browser.setValue( selectors.last_name, persona.last_name );
    browser.setValue( selectors.email, persona.email );
    browser.setValue( selectors.phone, persona.phone );
    browser.setValue( selectors.zip_code, persona.zip_code );
    browser.safeSelect( selectors.terms );
  } );
}

function birthdaySpec ( path, globalSelectors, persona ) {
  const selectors = {
    birthday: '.form-control'
  };

  it ( 'should run the birthday page', () => {
    browser.waitForVisible( `.${ path.name }` );
    browser.setValue( selectors.birthday, persona.birthday );
  } );
}

function genderSpec ( path, globalSelectors, persona ) {
  const selectors = {
    gender: '.yes'
  };
  if ( persona.gender === 'female' ) {
    selectors.gender = '.no';
  }

  it ( 'should run the gender page', () => {
    browser.waitForVisible( `.${ path.name }` );
    browser.click( selectors.gender );
  } );
}

function MultipleChoice ( path, globalSelectors, choice ) {
  it ( 'should click ' + choice + ' for MultipleChoice on ' + path.name, () => {
    browser.waitForVisible( `.${ path.name }` );
    browser.safeSelect( "[for=" + choice + "]" );
  } );
}

function YesNo ( path, globalSelectors, choice ) {
  if ( choice === "yes" )
    yesSpec( path, globalSelectors );
  else
    noSpec( path, globalSelectors );
}

function yesSpec ( path, globalSelectors ) {
  const selector = '.yes';

  it ( 'should click yes box on ' + path.name, () => {
    browser.waitForVisible( `.${ path.name }` );
    browser.click( selector );
  } );
}

function noSpec ( path, globalSelectors ) {
  const selector = '.no';

  it ( 'should click no box on ' + path.name, () => {
    browser.waitForVisible( `.${ path.name }` );
    browser.click( selector );
  } );
}

function clickContinue ( selector ) {
  it( 'should continue to next component', () => {
    browser.click( selector );
  } );
}

module.exports = {
  registerSpec,
  birthdaySpec,
  genderSpec,
  MultipleChoice,
  YesNo,
  clickContinue
};