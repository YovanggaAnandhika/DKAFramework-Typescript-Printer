import {Printer as printer, PrinterOptions} from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";
import Serial from "@node-escpos/serialport-adapter";
import {ConfigPrinterNetwork, ConfigPrinterSerial, ConfigPrinterUSB} from "./Interfaces/ConfigPrinter";
import DefaultSettings from "./Config/DefaultSettings";
import {merge} from "lodash";
import Network from "@node-escpos/network-adapter";

let device : USB | Serial | Network | undefined;
let mPrinter : printer<[]>;

export async function Printer(config : ConfigPrinterUSB | ConfigPrinterSerial | ConfigPrinterNetwork = DefaultSettings) : Promise<printer<[]>> {
    return new Promise(async (resolve, rejected)  => {
        switch (config?.type) {
            case "USB" :
                try {
                    let mPrinterCheck = USB.findPrinter();
                    if (mPrinterCheck.length > 0) {
                        if (config?.options?.vendorId === undefined && config?.options?.productId === undefined) {
                            device = await new USB();

                            if (config?.options?.vendorId !== undefined && config?.options.productId){
                                device = await new USB(config?.options.vendorId, config?.options.productId)
                            }

                            mPrinter = await new printer(device, merge({ width : 80 } as PrinterOptions, config?.options));

                            await device.open(async (error: any) => {
                                if (!error) {
                                    await resolve(mPrinter);
                                } else {
                                    await rejected({status: false, code: 500, msg: `cannot open device printer`, error : error})
                                }
                            });
                        }
                    }else{
                        await rejected({status: false, code: 404, msg: `cannot find default printer`})
                    }
                }catch (e) {
                    await rejected({status: false, code: 505, msg: `unknown error`, error : e})
                }
                break;
            case "SERIAL" :
                try {
                    device = await new Serial(config?.port, config?.options);
                    mPrinter = await new printer(device, merge({ width : 80 } as PrinterOptions, config?.options));
                    await device.open(async (error: any) => {
                        if (!error) {
                            await resolve(mPrinter);
                        } else {
                            await rejected({status: false, code: 500, msg: `cannot open device printer`, error : error})
                        }
                    });
                }catch (e){
                    await rejected({status: false, code: 505, msg: `unknown error`, error : e})
                }
                break;
            case "NETWORK" :
                try {
                    device = await new Network(config?.address,config?.port, config?.timeout);
                    mPrinter = await new printer(device, merge({ width : 80 } as PrinterOptions, config?.options));
                    await device.open(async (error: any) => {
                        if (!error) {
                            await resolve(mPrinter);
                        } else {
                            await rejected({status: false, code: 500, msg: `cannot open device printer`, error : error})
                        }
                    });
                }catch (e) {
                    await rejected({status: false, code: 505, msg: `unknown error`, error : e})
                }
                break;
            default :
                await rejected({status: false, code: 505, msg: `Printer Type must Declaration`})
        }
    });
}

export default Printer;