// versione-app.mjs by Daniele Lolli (UncleDan) feat. Claude AI - Release 26.1.2 - 2026-11-27 15-04-56
// Allinea la versione delle app Android e iOS ad APP_VERSION di pwa/js/app.js secondo la
// "Regola di versioning dei progetti Baskin (v3)":
//   versione  AA.M[.P[.W]] con eventuale suffisso aN | bN | RCN
//   build     (((AA*100 + M)*100 + P)*10 + W)*100 + contatore
//   contatore 01-98 per le pre-release (alpha, beta e RC: progressivo unico di invii),
//             99 per la finale
//   26.0b19 -> versionCode 260000019, iOS 26.0.0 (build 260000019)
//   26.0    -> 260000099;  26.0.1 -> 260001099;  26.0.0.1 -> 260000199;  26.1 -> 260100099
// Il contatore delle pre-release è il numero del suffisso; se alpha/beta/RC della stessa
// versione si alternano negli invii agli store, impostarlo con la variabile CONTATORE.
// Uso (dalla radice del repository): node tools/versione-app.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const app = readFileSync('pwa/js/app.js', 'utf8');
const v = (app.match(/const APP_VERSION = '([^']+)'/) || [])[1];
const m = v && v.match(/^(\d{2})\.(\d{1,2})(?:\.(\d{1,2})(?:\.([1-9]))?)?(?:(a|b|RC)(\d{1,2}))?$/);
if (!m) { console.error('APP_VERSION non conforme alla regola AA.M[.P[.W]][aN|bN|RCN]: ' + v); process.exit(1); }
const [aa, mm, pp, ww] = [+m[1], +m[2], +(m[3] || 0), +(m[4] || 0)];
const pre = m[5] ? +(process.env.CONTATORE || m[6]) : null;
if (pre !== null && !(pre >= 1 && pre <= 98)) { console.error('Contatore della pre-release fuori intervallo (1-98): ' + pre); process.exit(1); }
const code = (((aa * 100 + mm) * 100 + pp) * 10 + ww) * 100 + (pre ?? 99);
const ios = `${aa}.${mm}.${pp}`;   // Apple: al massimo tre numeri; W va solo nel build

const g = 'android/app/build.gradle';
writeFileSync(g, readFileSync(g, 'utf8')
  .replace(/versionCode \d+/, 'versionCode ' + code)
  .replace(/versionName "[^"]*"/, `versionName "${v}"`));

const x = 'ios/App/App.xcodeproj/project.pbxproj';
writeFileSync(x, readFileSync(x, 'utf8')
  .replace(/MARKETING_VERSION = [^;]+;/g, `MARKETING_VERSION = ${ios};`)
  .replace(/CURRENT_PROJECT_VERSION = [^;]+;/g, `CURRENT_PROJECT_VERSION = ${code};`));

console.log(`Versione ${v}: Android versionCode ${code}, iOS ${ios} (build ${code})`);
if (process.env.GITHUB_ENV) writeFileSync(process.env.GITHUB_ENV, `APP_VER=${v}\nAPP_CODE=${code}\n`, { flag: 'a' });
