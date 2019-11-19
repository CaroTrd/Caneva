const validate = (values) => {
  const {
    firstname, lastname, email, code, phone, street, number, city,
    municipality, zipcode, country, legal_form, name_comp, position, vatcode,
    vatnumbr, password, phone_code, phone_comp, street_comp, number_comp,
    city_comp, municipality_comp, zipcode_comp, country_comp, website, rules,
    namecontact, phonecontact, emailcontact,
  } = values;
  const errors = {};
  if (!firstname || firstname.trim() === '') {
    errors.firstname = 'Veuillez renseigner votre prénom';
  } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{1,102})$/gi.test(firstname)) {
    errors.firstname = 'Veuillez rentrer un prénom valide';
  }
  if (!lastname || lastname.trim() === '') {
    errors.lastname = 'Veuillez renseigner votre nom';
  } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{1,102})$/gi.test(lastname)) {
    errors.lastname = 'Veuillez rentrer un nom valide';
  }
  /* if (!day || day.trim() === '') {
    errors.day = 'Veuillez rentrer un jour valide';
  } else if (!/^(^[0-3]{0,1})([0-9]{1}){0,1}$/.test(day)) {
    errors.day = 'Veuillez rentrer un jour valide';
  }
  if (!month || month.trim() === '') {
    errors.month = 'Veuillez rentrer un jour valide';
  } else if (!/^(^[0-1]{0,1})([0-9]{1}){0,1}$/.test(month)) {
    errors.month = 'Veuillez rentrer un mois valide';
  }
  if (!year || year.trim() === '') {
    errors.year = 'Veuillez rentrer un jour valide';
  } else if (!/^((^[0-2]{0,1})([09]{1})([02-9]{1})(\d{1})){0,1}$/.test(year)) {
    errors.year = 'Veuillez rentrer une annéee valide';
  } */
  if (!email || email.trim() === '') {
    errors.email = 'Veuillez renseigner votre e-mail';
  } else if (!/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi.test(email)) {
    errors.email = 'Veuillez respecter le format du courriel (exemple@domaine.com)';
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:-])[A-Za-z\d@$!%*?&:-]{8,}$/i.test(password) && password !== undefined) {
    errors.password = 'Veuillez respecter les critères';
  }
  /*if (!code || code.trim() === '') {
    errors.code = 'Veuillez renseigner le format national';
  } else if (!/^(\+)[32]{2}$/gi.test(code)) {
    errors.code = 'Veuillez respecter le format (exemple: +32)';
  }
  if (!phone || phone.trim() === '') {
    errors.phone = 'Veuillez renseigner votre numéro de téléphone';
  } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/gi.test(phone)) {
    errors.phone = 'Veuillez respecter le format (046xxxxxxx)';
  }
  if (!street || street.trim() === '') {
    errors.street = 'Veuillez renseigner votre rue';
  } else if (!/^(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç])+$/i.test(street)) {
    errors.street = 'Veuillez renseigner un nom de rue valide';
  }
  if (!number || number.trim() === '') {
    errors.number = 'Veuillez renseigner votre numéro';
  } else if (!/^(^[1-9]{1})([0-9]{0,2})$/i.test(number)) {
    errors.number = 'Veuillez renseigner un numéro de rue correct';
  }
  if (!city || city.trim() === '') {
    errors.city = 'Veuillez renseigner votre ville';
  } else if (!/^[a-zA-Zéèêëàâîïôöûü-]+$/i.test(city)) {
    errors.city = 'Veuillez renseigner un nom de ville correct';
  }
  if (!municipality || municipality.trim() === '') {
    errors.municipality = 'Veuillez renseigner votre commune';
  } else if (!/^[a-zA-Zàâäéèêëïîôöùûüç-]{1,60}$/i.test(municipality)) {
    errors.municipality = 'Veuillez renseigner un nom de commune correct';
  }
  if (!zipcode || zipcode.trim() === '') {
    errors.zipcode = 'Veuillez renseigner votre code postal';
  } else if (!/^[0-9]{4}$/i.test(zipcode)) {
    errors.zipcode = 'Veuillez renseigner un code postal correct';
  }
  if (!country || country.trim() === '') {
    errors.country = 'Veuillez renseigner votre pays';
  } else if (!/^[a-zA-Zàâäéèêëïîôöùûüç-]{1,40}$/i.test(country)) {
    errors.country = 'Veuillez renseigner un nom de pays correct';
  }

  // Company Form

  if (!/^([a-zA-Zéèêëàâîïôöûü-].{1,20})$/gi.test(legal_form) && legal_form !== undefined) {
    errors.legal_form = 'Veuillez renseigner une forme juridique ';
  }
  if (!/^([a-zA-Z0-9].{1,102}){0,}$/gi.test(name_comp) && name_comp !== undefined) {
    errors.name_comp = 'Veuillez renseigner une société';
  }
  if (!/^([a-zA-Zéèêëàâîïôöûü-].{1,50})$/gi.test(position) && position !== undefined) {
    errors.position = 'Veuillez renseigner votre position';
  }
  if (!/^(BE){0,1}$/gi.test(vatcode) && vatcode !== undefined) {
    errors.vatcode = 'Veuillez renseigner le format national';
  }
  if (!/^0[0-9]{9}$/gi.test(vatnumbr) && vatnumbr !== undefined) {
    errors.vatnumbr = 'Veuillez renseigner le numéro de TVA';
  }
  if (!/^(\+)[32]{0,2}$/gi.test(phone_code) && phone_code !== undefined) {
    errors.phone_code = 'Veuillez renseigner un format national';
  }
  if (!/^((\+\d{1,3}[- ]?)?\d{9,10}){0, 10}$/gi.test(phone_comp) && phone_comp !== undefined) {
    errors.phone_comp = 'Veuillez renseigner un numére de téléphone';
  }
  if (!/^(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç])+$/i.test(street_comp) && street_comp !== undefined) {
    errors.street_comp = 'Veuillez renseigner une rue';
  }
  if (!/^(^[1-9]{1})([0-9]{0,2})$/gi.test(number_comp) && number_comp !== undefined) {
    errors.number_comp = 'Veuillez renseigner un numéro';
  }
  if (!/^[a-zA-Zéèêëàâîïôöûü-]+$/gi.test(city_comp) && city_comp !== undefined) {
    errors.city_comp = 'Veuillez renseigner une ville';
  }
  if (!/^[a-zA-Zàâäéèêëïîôöùûüç-]{1,60}$/gi.test(municipality_comp) && municipality_comp !== undefined) {
    errors.municipality_comp = 'Veuillez renseigner une commune';
  }
  if (!/^[0-9]{0,4}$/gi.test(zipcode_comp) && zipcode_comp !== undefined) {
    errors.zipcode_comp = 'Veuillez renseigner un code postal';
  }
  if (!/^[a-zA-Zàâäéèêëïîôöùûüç-]{1,40}$/gi.test(country_comp)) {
    errors.country_comp = 'Veuillez rentrer un nom valide s\'il vous plaît';
  }
  if (!/^(https?:\/\/|www.)[\w-_./?=&]+$/gi.test(website)) {
    errors.website = 'URL incorrect';
  }


  // Rules

  if (!rules) {
    errors.rules = 'Veuillez accepter les conditions';
  } else if (rules === false) {
    errors.rules = 'Veuillez accepter les conditions';
  }

  // Page contact

  if (!namecontact || namecontact.trim() === '') {
    errors.namecontact = 'Champ exigé';
  } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{1,102})$/gi.test(namecontact)) {
    errors.namecontact = 'Prénom incorrect';
  }
  if (!phonecontact || phonecontact.trim() === '') {
    errors.phonecontact = 'Champ exigé';
  } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/gi.test(phonecontact)) {
    errors.phonecontact = 'Numéro incorrect';
  }
  if (!emailcontact || emailcontact.trim() === '') {
    errors.emailcontact = 'Champ exigé ';
  } else if (!/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi.test(emailcontact)) {
    errors.emailcontact = 'E-mail incorrect';
  }*/
  return errors;
};


export default validate;
