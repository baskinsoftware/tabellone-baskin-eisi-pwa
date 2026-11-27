/* nativo.js by Daniele Lolli (UncleDan) feat. Claude AI - Release 26.1.2 - 2026-11-27 15-04-56 */
/* =====================================================================
   Tabellone Baskin EISI - adattamenti per l'app Android/iOS (Capacitor)
   Nel browser (PWA) questo file non fa nulla. Nell'app nativa:
   - niente «Installa app» (è già un'app);
   - «Chiudi applicazione» chiude l'app su Android (plugin locale
     «Tabellone», vedi app.js); su iOS le app non si chiudono da sole,
     quindi il pulsante è nascosto;
   - i link esterni (repository, segnalazioni, eisi.it, baskin.it) si aprono
     nel browser di sistema invece che dentro l'app.
   Schermo sempre acceso e «Verifica aggiornamenti» sono gestiti in app.js.
   ===================================================================== */
(function(){
  if(!NATIVO) return;
  document.documentElement.classList.add('nativo');

  /* pulsanti che nell'app nativa non hanno senso */
  const nascondi = id => { const el = document.getElementById(id); if(el){ el.hidden = true; el.style.display = 'none'; } };
  nascondi('actInstall');
  nascondi('rotateInstall');
  if(PIATTAFORMA === 'ios') nascondi('actQuit');

  /* link esterni con target=_blank: nella WebView li apre il browser di
     sistema (Capacitor intercetta la navigazione verso un altro sito) */
  document.addEventListener('click', e => {
    const a = e.target && e.target.closest && e.target.closest('a[href]');
    if(!a || a.target !== '_blank') return;
    let url;
    try{ url = new URL(a.href, location.href); }catch(_){ return; }
    if(url.origin === location.origin) return;
    e.preventDefault();
    location.href = url.href;
  }, true);
})();
