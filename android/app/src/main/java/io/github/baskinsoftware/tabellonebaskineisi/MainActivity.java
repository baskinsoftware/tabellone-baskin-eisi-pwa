// MainActivity.java by Daniele Lolli (UncleDan) feat. Claude AI - Release 26.1.2 - 2026-11-27 15-04-56
package io.github.baskinsoftware.tabellonebaskineisi;

import android.os.Bundle;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(TabellonePlugin.class); // schermo sempre acceso e chiusura dell'app
        super.onCreate(savedInstanceState);
        schermoIntero();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) schermoIntero();
    }

    /* schermo intero come la PWA ("display": "fullscreen" nel manifest): le barre
       di sistema le nasconde all'avvio il plugin SystemBars di Capacitor
       (capacitor.config.json, "hidden": true); qui si sceglie che con uno swipe
       ricompaiano solo per un momento e si nascondono di nuovo quando l'app
       riprende il focus (es. dopo una finestra di conferma) */
    private void schermoIntero() {
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.hide(WindowInsetsCompat.Type.systemBars());
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    }
}
