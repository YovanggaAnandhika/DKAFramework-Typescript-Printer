
export interface ConfigPrinter {
    autoClose ?: (error?: any) => void
}
export interface ConfigPrinterUSBOptions {
    vendorId ?: string,
    productId ?: string,
    encoding ?: string | undefined,
    width ?: number | undefined
}

export interface ConfigPrinterUSB extends ConfigPrinter {
    type : "USB",
    options ?: ConfigPrinterUSBOptions
}

export interface ConfigPrinterSerial extends ConfigPrinter {
    type : "SERIAL",
    port : string,
    options ?: any
}
export interface ConfigPrinterNetwork extends ConfigPrinter {
    type : "NETWORK",
    address : string,
    port : number,
    timeout ?: number,
    options ?: any
}

