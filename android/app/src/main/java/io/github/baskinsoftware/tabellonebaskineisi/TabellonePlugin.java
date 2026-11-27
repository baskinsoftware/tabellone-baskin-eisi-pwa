// TabellonePlugin.java by Daniele Lolli (UncleDan) feat. Claude AI - Release 26.1.2 - 2026-11-27 15-04-56
package io.github.baskinsoftware.tabellonebaskineisi;

import android.app.Activity;
import android.view.WindowManager;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Funzioni della PWA che nella WebView non sono affidabili:
 * - schermo sempre acceso (nella PWA: Screen Wake Lock API);
 * - chiusura dell'app (nella PWA: window.close(), ignorato dalla WebView).
 */
@CapacitorPlugin(name = "Tabellone")
public class TabellonePlugin extends Plugin {

    @PluginMethod
    public void schermoAcceso(PluginCall call) {
        final boolean attivo = Boolean.TRUE.equals(call.getBoolean("attivo", false));
        final Activity a = getActivity();
        a.runOnUiThread(() -> {
            if (attivo) a.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            else a.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            call.resolve();
        });
    }

    @PluginMethod
    public void chiudi(PluginCall call) {
        call.resolve();
        final Activity a = getActivity();
        a.runOnUiThread(a::finishAndRemoveTask);
    }
}
