import {ConfigPrinterUSB} from "../Interfaces/ConfigPrinter";


export const DefaultSettings : ConfigPrinterUSB = {
    type : "USB",
    options : {
        encoding : "GB18030",
        width : 80
    },
    autoClose : async (error) => {

    }
}

export default DefaultSettings;