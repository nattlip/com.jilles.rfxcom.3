import Homey from 'homey';
import {   X10decoding as X10LanSignal } from  './lib/rfxcom/lan/X10decoding.js';  // is needed as Homey.app.X10LanSignal
 import { easywaveDecoding as EWSignal}from   './lib/rfxcom/easywave/easywaveDecoding.js';


class rfxcomapp extends Homey.App {

  /**
   * 
   * onInit is called when the app is initialized.
   */
  async onInit() {


   let app : string = 'Rfxcom'

    let myEWS =  new EWSignal()



let a : string  = myEWS.addSmileMethod("ikke");

this.log(a)
    
    this.log('rfxcom has been initialized');

    
    
    this.log(`${this.constructor.name} is running...`);


    let EWTypesMapArray : Array<string>= 
      [`rollerShutters`]
   

  let RxTxTypesMapArray : string[]= [
    "RxLan" ,
     "RxTxLan",
     "TxLan",
     "RfxTrx",
     "EldatPi",
     "HomySignalX10",
     "HomySignalOregon",
     "PlugwiseSource",
     "Proliphix"
]

let RxTxTypesMap  =  RxTxTypesMapArray.map(function(val, index){})


let RxTxTypes : string[] = [
  'RxLan',
  'TxLan',
  'RxTxLan',
  'RfxTrx',
  "EldatPi",
  "HomySignalX10",
  "HomySignalOregon",
  "Proliphix"
]

let RxTx = {
  id: null,  // its ip for now must become mac 
  type: null, // lan  with or without transmitterer / trnasmitter or trx //
  ip: null,
  rx: null,  // or trx  can be difind by type if type is trx   port number
  tx: null,
}


let rfxcomDeviceTypes = {
  "generic":  // as template
  {
      data: {
          //{ type: null, index: null }, dfor more devicetypes per driver visonic motion sensor or doorsensor 
          id: null,             // homey id 
          houseCode: null,
          unitCode: null,
          protocol: null,
          type: null,
      },
     
      driver: null,
     
      name: null,            //   rfxcom and old id 
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device  the device id of a rxtx is its ip
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device               
      capabilities: [],
      capability: {},                   
          icon: null,
          settings: null
  },

  "EW":
  {
      data: {
          id: null,             // homey id 
          houseCode: null,
          unitCode: null,
          protocol: 'EW', //  visonic , x10 , oregon , etc klika elro etc ndlers 
          type: "EW"
      },
      driver: `EW`,
      name: null,    // type of device eg visonicdoorsensor
      rx: [], //  //{ type: null, index: null }of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device               
      capabilities: ["windowcoverings_state"],
         
      capability: {
          windowcoverings_state: false
         },   // onoff dim temp etc as json  object of capabilities
      icon: null,
      settings: null
  },


  "MS13E":
  {
      data: {
          id: null,             // homey id 
          houseCode: null,
          unitCode: null,
          protocol: 'X10', //  visonic , x10 , oregon , etc klika elro etc ndlers 
          type: "MS13E"
      },               
      driver: `X10`,               
      name: null,    // type of device eg visonicdoorsensor
      rx: [], //  //{ type: null, index: null }of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device               
      capabilities: ["alarm_motion", "alarm_night"],
      capability: {
          alarm_motion: false,
          alarm_night : false
      },   // onoff dim temp etc as json  object of capabilities
      icon: null,
      settings: null
  },

  "OnOff":
  {
      data: {
          id: null,             // homey id 
          houseCode: null,
          unitCode: null,
          protocol: 'X10', //  visonic , x10 , oregon , etc klika elro etc ndlers 
          type: "OnOff",           // type of device eg visonicdoorsensor
      },
   
      driver: "X10",              
      name: null,
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      capabilities: ['onoff'],
      capability: { onoff : false}   // onoff dim temp etc as json  object of capabilities
      , icon: null,
      settings: null
  },

  "Dim":
  {
      data: {
          id: null,             // homey id 
          houseCode: null,
          unitCode: null,
          protocol: 'X10', //  visonic , x10 , oregon , etc klika elro etc ndlers 
          type: "Dim",      // type of device eg visonicdoorsensor 
      },
      driver: "X10",                    
      name: null,
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      capabilities: ['onoff', 'dim'],
      capability: {
          onoff: false,
          dim: 0
      },                // onoff dim temp etc as json  object of capabilities
      icon: null,
      settings: null
  },








  "visonicMotionSensor": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `visonic`,
          type: "visonicMotionSensor",
      },  
      driver: `security`, // eg security  ms14e visonic  address
      name: null,
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      capabilities: ['alarm_motion', 'alarm_tamper', 'alarm_battery'],
      capability: {
          alarm_motion: false,
          alarm_tamper: false,
          alarm_battery: false
      }  , // onoff dim temp etc as json
      icon: null,
      settings: null
  },

  "visonicDoorSensor": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `visonic`,
          type: `visonicDoorSensor`,
      },
      driver: `security`,
      // eg security  ms14e visonic  address
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      name: null,
      capabilities: ['alarm_contact', 'alarm_tamper', 'alarm_battery'],
      capability: {
          alarm_contact: false,
          alarm_tamper: false,
          alarm_battery: false
      }   // onoff dim temp etc as json
      , icon: null,
      settings: null
  },

  "security": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `visonic`,
          type: `visonicDoorSensor`,
      },   // eg security  ms14e visonic  address
      driver: `security`,
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      name: null,
      capabilities: ['alarm_contact', 'alarm_tamper', 'alarm_battery'],
      capability: {
          alarm_contact: false,
          alarm_tamper: false,
          alarm_battery: false
      }   // onoff dim temp etc as json
      , icon: null,
      settings: null
  },

    "THB": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `oregon`,
          type: `THB`,
      },
      driver: `oregon`,
      // eg security  ms14e visonic  address
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      name: null,
        capabilities: ["measure_temperature", "measure_humidity", "measure_pressure", "measure_battery"],
        capability: {
            measure_temperature: 0,
            measure_humidity: 0,
            measure_pressure: 0,
            measure_battery: 0  // onoff dim temp etc as json  object of capabilities
        },
        icon: null,
        settings: null
  },
  "TH": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `oregon`,
          type: `TH`,
      },
      driver: `oregon`,
      // eg security  ms14e visonic  address
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      name: null,
      capabilities: ["measure_temperature", "measure_humidity", "measure_battery"],
      capability: {
          measure_temperature: 0,
          measure_humidity: 0,
          measure_battery: 0  // onoff dim temp etc as json  object of capabilities
      },
      icon: null,
      settings: null
  },
  "T": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `oregon`,
          type: `T`,
      },
      driver: `oregon`,
      // eg security  ms14e visonic  address
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      name: null,
      capabilities: ["measure_temperature","measure_battery"],
      capability: {
          measure_temperature: 0,
          measure_battery: 0  // onoff dim temp etc as json  object of capabilities
      },
      icon: null,
      settings: null
  },
  "U": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `oregon`,
          type: `U`,
      },
      driver: `oregon`,
      // eg security  ms14e visonic  address
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      name: null,
      capabilities: ["measure_ultraviolet", "measure_battery"],
      capability: {
          measure_ultraviolet: 0,
          measure_battery: 0  // onoff dim temp etc as json  object of capabilities
      },
      icon: null,
      settings: null
  },
  "R": {
      data: {
          id: null,
          houseCode: null,
          unitCode: null,
          protocol: `oregon`,
          type: `R`,
      },
      driver: `oregon`,
      // eg security  ms14e visonic  address
      rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
      tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
      name: null,
      capabilities: ["measure_rain", "meter_rain", "measure_battery"],
      capability: {
          measure_rain: 0,
          meter_rain: 0,
          measure_battery: 0  // onoff dim temp etc as json  object of capabilities
      },
      icon: null,
      settings: null
  },
}

     
  }//end constructorcls
  
 

} //end class

module.exports =rfxcomapp;
