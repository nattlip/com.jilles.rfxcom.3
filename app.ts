import Homey from 'homey';
import {   X10decoding as X10LanSignal } from  './lib/rfxcom/lan/X10decoding.js';  // is needed as Homey.app.X10LanSignal
import { easywaveDecoding as  EWSignal}from   './lib/rfxcom/easywave/easywaveDecoding.js';


class rfxcomapp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('rfxcom has been initialized');

    
    
    this.log(`${this.constructor.name} is running...`);



  }

}

module.exports =rfxcomapp;
