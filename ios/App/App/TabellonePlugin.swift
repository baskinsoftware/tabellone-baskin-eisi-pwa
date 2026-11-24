// TabellonePlugin.swift by Daniele Lolli (UncleDan) feat. Claude AI - Release 26.1.0.1 - 2026-11-24 23-37-54
import Capacitor
import UIKit

/// Funzioni della PWA che nella WebView non sono affidabili:
/// schermo sempre acceso (nella PWA: Screen Wake Lock API).
/// La chiusura dell'app non esiste su iOS: il pulsante è nascosto da nativo.js.
@objc(TabellonePlugin)
public class TabellonePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TabellonePlugin"
    public let jsName = "Tabellone"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "schermoAcceso", returnType: CAPPluginReturnPromise)
    ]

    @objc func schermoAcceso(_ call: CAPPluginCall) {
        let attivo = call.getBool("attivo") ?? false
        DispatchQueue.main.async {
            UIApplication.shared.isIdleTimerDisabled = attivo
            call.resolve()
        }
    }
}

/// Controller principale: registra i plugin locali dell'app.
/// La barra di stato è nascosta da Info.plist (UIStatusBarHidden, letto da
/// CAPBridgeViewController): schermo intero come la PWA.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(TabellonePlugin())
    }
}
