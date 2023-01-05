import Printer from "./../src";

(async () => {
    await Printer({
        type : "USB",
        options : {
            width : 80
        }
    })
        .then(async (printer) => {
            await printer
                .font('a')
                .align('ct')
                .size(0,0)
                .feed(5)
                .size(0,0)
                .text("FARADAY ELECTRONIC")
                .feed(3)
                .tableCustom([
                        { text:"PUSH SWITCH BUTTON", align:"CENTER", width:0.60 },
                        { text:"5000", align:"RIGHT", width:0.40 }
                    ]
                )
                .feed(5)
                .cut()
                .close();
        })
        .catch(async (error) => {
            console.error(error)
        })

})()