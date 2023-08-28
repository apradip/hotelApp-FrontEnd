import moment from "moment";

export const MessageRoom = {
    Room: "SOCKET_ROOM",
    Table: "SOCKET_TABLE",
    Service: "SOCKET_SERVICE",
    Miscellaneous: "SOCKET_MISCELLANEOUS"
};

export const ActivityArea = {
    Room: "R",
    Table: "T",
    Service: "S",
    Miscellaneous: "M"
};

export const SearchOption = {
    RestaurentOnly: "RESTAURENT_ONLY",
    ServiceOnly: "SERVICE_ONLY",
    MiscellaneousOnly: "MISCELLANEOUS_ONLY"
};

export const OperationState = {
    View: "VIEW",
    Add: "ADD",
    Mod: "MOD",
    Delete: "DELETE",
}

export const Operation = {
    GuestAdd: "GUEST_ADD",
    GuestMod: "GUEST_MOD",
    GuestDel: "GUEST_DEL",
    Booked: "BOOKED",
    Table_Order: "TABLE_ORDER",
    Service_Order: "SERVICE_ORDER",
    Miscellaneous_Order: "MISCELLANEOUS_ORDER",
    Table_Despatch: "TABLE_DESPATCH",
    Service_Despatch: "SERVICE_DESPATCH",
    Miscellaneous_Despatch: "MISCELLANEOUS_DESPATCH",
    BillGenerate: "BILL_GENERATE",
    Room_PaymentAdd: "ROOM_PAYMENT_ADD",
    Table_PaymentAdd: "TABLE_PAYMENT_ADD",   
    Service_PaymentAdd: "SERVICE_PAYMENT_ADD",
    Miscellaneous_PaymentAdd: "MISCELLANEOUS_PAYMENT_ADD",
    Room_Checkout: "ROOM_CHECKOUT",
    Table_Checkout: "TABLE_CHECKOUT",
    Service_Checkout: "SERVICE_CHECKOUT",
    Miscellaneous_Checkout: "MISCELLANEOUS_CHECKOUT",
};



export const subStr = (text, len) => {
    let t = ''
    t = text && text.length > len ? text.substr(0, len) + ' ...' : text
    return t
};

export const properCase = (text) => { 
    if (text) {
        const properCaseStr = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        return properCaseStr;
    } else {
        return text;
    }
}

export const  getPage = (baseURL, url) => {
    let component = ''
    const params = url.replace(baseURL, '')
    const paramArr = params.split('/')

    paramArr.length > 0 ? component = paramArr[0] : component = params
    return component;
};

export const getPageName = (selectedCompont) => {
    let name = ''

    switch(selectedCompont) {
        case 'accesslevels':
            name = 'Role'
            break

        case 'plans':
            name = 'Plan'
            break

        case 'roomcategories':
            name = 'Room category'
            break

        case 'iddocuments':
            name = 'ID document'
            break
                
        case 'bookingagents':
            name = 'Booking agent'
            break

        case 'employees':
            name = 'Employee'
            break

        case 'rooms':
            name = 'Room'
            break

        case 'tables':
            name = 'Table'
            break

        case 'foods':
            name = 'Food'
            break

        case 'items':
            name = 'Item'
            break
                
        case 'services':
            name = 'Service'
            break
    
        case 'guestrooms':
            name = 'Guest room'
            break

        case 'guesttables':
            name = 'Guest table'
            break

        case 'guestfoods':
            name = 'Guest food'
            break

        case 'guestmiscellaneous':
            name = 'Guest miscellaneous'
            break

        case 'guestpayments':
            name = 'Guest payment'
            break
                
        default:
            name = ''
    
        }

    return name
};

export const getPageAttribute = (selectedCompont) => {
    const attribute = {
        name: null,
        dynamic: false,
        show: { 
                title: true, 
                search: false,
                add: false, 
                edit: false, 
                delete: false 
            }
    }

    switch(selectedCompont) {

        case 'dashboard':
            attribute.name = 'Dashboard'
            attribute.dynamic = false
            attribute.show.name = true
            attribute.show.search = false
            attribute.show.add = false
            attribute.show.edit = false
            attribute.show.delete = false
            
            break

        case 'support':
            attribute.name = 'Support'
            attribute.dynamic = false
            attribute.show.name = true
            attribute.show.search = false
            attribute.show.add = false
            attribute.show.edit = false
            attribute.show.delete = false
            
            break

        case 'help':
            attribute.name = 'Help Center'
            attribute.dynamic = false
            attribute.show.name = true
            attribute.show.search = false
            attribute.show.add = false
            attribute.show.edit = false
            attribute.show.delete = false
            
            break

        case 'privacy':
            attribute.name = 'Privacy'
            attribute.dynamic = false
            attribute.show.name = true
            attribute.show.search = false
            attribute.show.add = false
            attribute.show.edit = false
            attribute.show.delete = false
            
            break

        case 'terms':
            attribute.name = 'Terms of Service'
            attribute.dynamic = false
            attribute.show.name = true
            attribute.show.search = false
            attribute.show.add = false
            attribute.show.edit = false
            attribute.show.delete = false
            
            break
                
        case 'accesslevels':
            attribute.name = 'Role'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true
            
            break

        case 'plans':
            attribute.name = 'Plan'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'roomcategories':
            attribute.name = 'Room category'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'iddocuments':
            attribute.name = 'ID document'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break
                
        case 'bookingagents':
            attribute.name = 'Booking agent'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'employees':
            attribute.name = 'Employee'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'rooms':
            attribute.name = 'Room'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'tables':
            attribute.name = 'Table'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'foods':
            attribute.name = 'Food'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'miscellaneouses':
            attribute.name = 'Miscellaneous'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break
    
        case 'items':
            attribute.name = 'Item'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'services':
            attribute.name = 'Service'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break
                
        case 'guestrooms':
            attribute.name = 'Guest room'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        case 'guesttables':
            attribute.name = 'Guest table'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break

        // case 'guestfoods':
        //     attribute.name = 'Guest food'
        //     attribute.dynamic = true
        //     attribute.show.name = true
        //     attribute.show.search = true
        //     attribute.show.add = true
        //     attribute.show.edit = true
        //     attribute.show.delete = true

        //     break

        case 'guestservices':
            attribute.name = 'Services'
            attribute.dynamic = true
            attribute.show.name = true 
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break
                
        case 'guestmiscellaneous':
            attribute.name = 'Miscellaneous'
            attribute.dynamic = true
            attribute.show.name = true 
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break
            
        case 'guestpayments':
            attribute.name = 'Guest payment'
            attribute.dynamic = true
            attribute.show.name = true
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = true
            attribute.show.delete = true

            break
                    
        default:

            break
    }

    return attribute
};

export const getAccessLevel = (accessLevelArray) => {
    let names = "";

    if (accessLevelArray !== null) {
        for (const item of accessLevelArray) {
            names === "" ? names = item.name : names = names + ", " + item.name
        }
    }

    return names
};

//  get employee first name
export const getFirstName = (name) => {
    const names = name.split(" ");
    return names.length > 0 ? names[0] : name;
};

export const getRooms = (roomObject) => {
    let rooms = "";

    if (roomObject) {
        if (roomObject.length) {
            roomObject.map((room) => (
                rooms.length > 0 ? rooms = rooms + ", " + `R-${room.no}` : rooms = `R-${room.no}`
            ));
        }
    }

    rooms = rooms.split(',').filter((item, index) => {
            return rooms.indexOf(item) === index;
    });

    return rooms;
};

export const getTables = (tableObject) => {
    let tables = "";

    if (tableObject) {
        if (tableObject.length) {
            if (Array.isArray(tableObject) && tableObject.length > 0){
                tableObject.map((table) => (
                    tables.length > 0 ? tables = tables + ", " + `T-${table.no}` : tables = `T-${table.no}`));
            }
        }
    }

    return tables;
};

export const formatYYYYMMDD = (longDateTime) => {
    if ((longDateTime) && (longDateTime.length > 0)) {
        let dt = new Date(longDateTime),
        mon = ("0" + (dt.getMonth() + 1)).slice(-2),
        day = ("0" + dt.getDate()).slice(-2);
    
        return [dt.getFullYear(), mon, day].join("-");
    } else {
        return "";
    }
};

export const formatDDMMYYYY = (longDateTime) => {
    if ((longDateTime) && (longDateTime.length > 0)) {
        let dt = new Date(longDateTime);
        const formattedDate = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
        return formattedDate;
    } else {
        return "";
    }
};

export const formatHHMM = (longDateTime) => {
    if (longDateTime.length > 0) {
        return moment(longDateTime).format("hh:mm");
    } else {
        return "";
    }

    // const tim = new Date(longDateTime);
    // const moment = moment(tim).format("HH:mm");
    // return moment.format("HH:mm");
    // return moment(tim).format("HH:mm");
};

export const formatTime12Hour = (longDateTime) => {
    if (longDateTime.length > 0) {
        return moment(longDateTime).format("hh:mm a");
    } else {
        return "";
    }

    // Check correct time format and split into components
    // time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        
    // if (time.length > 1) { // If time format correct
    //     time = time.slice (1); // Remove full string match value
    //     time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    //     time[0] = +time[0] % 12 || 12; // Adjust hours
    // }

    // return time.join (''); // return adjusted time or original string
};

export const formatINR = (number) => {
    return "₹ " + parseFloat(number, 10).toFixed(2);
};

export const formatBillNo = (number) => {
    const pad = '0';
    const num = number + '';
    return pad.repeat(8 - num.length) + number;
};