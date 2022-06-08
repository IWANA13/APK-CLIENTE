import { Injectable } from '@angular/core';
import { BarcodeScanner, ScanOptions, SupportedFormat, CameraDirection } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  private _allowed: boolean;

  constructor() {
      this._allowed = false;
  }

  async configureScanner(): Promise<void> {
      const options: ScanOptions = {
          targetedFormats: [SupportedFormat.EAN_13, SupportedFormat.QR_CODE],
          cameraDirection: CameraDirection.BACK
      }
      const status = BarcodeScanner.prepare(options);
      return status;
  }

  //Petició de permisos
  async checkPermission(): Promise<boolean> {
      //Si l'aplicació no té permisos, es presenta un diàleg per demanar-los (opció: force => true)
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
          this._allowed = true;
          return true;
      } else if (status.denied) {
          BarcodeScanner.openAppSettings();
          this._allowed = false;
          return false;
      }
  }

  async startScanner(): Promise<string> {
      if (this._allowed) {
          //Cal amagar l'aplicació per tal que es pugui veure la càmera
          BarcodeScanner.hideBackground();
          const result = await BarcodeScanner.startScan();
          if (result.hasContent) return result.content;
          else return null;
      }
      else return null;
  }

  stopScanner(): void {
      BarcodeScanner.stopScan();
  }
}
