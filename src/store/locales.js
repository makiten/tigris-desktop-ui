/*
 * NOTE! If you want to include new locales/translations, you
 * only need to add to this list.
 * Everything below `localesToLoad` is for auto-loading.
 */
/*
const localesToLoad = [
  'en_gb',
  'en_us',
  'jp',
  'pt_br'
]
*/
/*
 * DO NOT EDIT THIS SECTION!
 * @TODO: Can't load with `System.import`, because it returns a function
 */
/*
function load (locale) {
  return () => { System.import(`./../i18n/locale-${locale}.js`) }
}
*/
import localeEn from './../i18n/locale-en_001.js'
import localeEnGb from './../i18n/locale-en_gb.js'
import localeEnUs from './../i18n/locale-en_us.js'
import localeJp from './../i18n/locale-jp.js'
import localePtBr from './../i18n/locale-pt_br.js'
const localeData = {
  'en': localeEn,
  'en_gb': localeEnGb,
  'en_us': localeEnUs,
  'jp': localeJp,
  'pt_br': localePtBr
}

/*
localesToLoad.forEach(function (l) {
  localeData[l] = ''
})
*/
export default localeData
