import moment from 'moment';

export const subStr = (text, len) => {
    let t = "";
    t = text && text.length > len ? text.substr(1, len) + " ..." : text;
    return t;
}

export const  getPage = (baseURL, url) => {
    let component = "";
    const params = url.replace(baseURL, "");
    const paramArr = params.split("/");

    if (paramArr.length > 0) {
      component = paramArr[0];
    } else {
      component = params;
    }
    
    return component;
};

export const getPageName = (selectedCompont) => {
    let name = "";

    switch(selectedCompont) {
        case "accesslevels":
            name = "Role";
            break;

        case "plans":
            name = "Plan";
            break;

        case "roomcategories":
            name = "Room category";
            break;

        case "iddocuments":
            name = "ID document";
            break;
                
        case "bookingagents":
            name = "Booking agent";
            break;

        case "employees":
            name = "Employee";
            break;

        case "rooms":
            name = "Room";
            break;

        case "tables":
            name = "Table";
            break;

        case "foods":
            name = "Food";
            break;

        case "items":
            name = "Item";
            break;
                
        case "services":
            name = "Service";
            break;
    
        case "guestrooms":
            name = "Guest room";
            break;

        case "guesttables":
            name = "Guest table";
            break;

        case "guestfoods":
            name = "Guest food";
            break;

        case "guestmiscellaneous":
            name = "Guest miscellaneous";
            break;

        case "guestpayments":
            name = "Guest payment";
            break;
                
        default:
            name = "";
    
        }

    return name;
};

export const getPageAttribute = (selectedCompont) => {
    const attribute = {
        "name": null,
        "dynamic": false,
        "show": { "title": true, "search": false, "add": false, "edit": false, "delete": false }
    };

    switch(selectedCompont) {
        case "dashboard":
            attribute.name = "Dashboard";
            attribute.dynamic = false;
            attribute.show.name = true; 
            attribute.show.search = false;
            attribute.show.add = false;
            attribute.show.edit = false
            attribute.show.delete = false;
            
            break;

        case "support":
            attribute.name = "Support";
            attribute.dynamic = false;
            attribute.show.name = true; 
            attribute.show.search = false;
            attribute.show.add = false;
            attribute.show.edit = false
            attribute.show.delete = false;
            
            break;

        case "help":
            attribute.name = "Help Center";
            attribute.dynamic = false;
            attribute.show.name = true; 
            attribute.show.search = false;
            attribute.show.add = false;
            attribute.show.edit = false
            attribute.show.delete = false;
            
            break;

        case "privacy":
            attribute.name = "Privacy";
            attribute.dynamic = false;
            attribute.show.name = true; 
            attribute.show.search = false;
            attribute.show.add = false;
            attribute.show.edit = false
            attribute.show.delete = false;
            
            break;

        case "terms":
            attribute.name = "Terms of Service";
            attribute.dynamic = false;
            attribute.show.name = true; 
            attribute.show.search = false;
            attribute.show.add = false;
            attribute.show.edit = false
            attribute.show.delete = false;
            
            break;
                
        case "accesslevels":
            attribute.name = "Role";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;
            
            break;

        case "plans":
            attribute.name = "Plan";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "roomcategories":
            attribute.name = "Room category";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "iddocuments":
            attribute.name = "ID document";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;
                
        case "bookingagents":
            attribute.name = "Booking agent";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "employees":
            attribute.name = "Employee";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "rooms":
            attribute.name = "Room";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "tables":
            attribute.name = "Table";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "foods":
            attribute.name = "Food";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "items":
            attribute.name = "Item";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "services":
            attribute.name = "Service";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;
                
        case "guestrooms":
            attribute.name = "Guest room";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "guesttables":
            attribute.name = "Guest table";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;

        case "guestfoods":
            attribute.name = "Guest food";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;
        
        case "guestmiscellaneous":
            attribute.name = 'Guest miscellaneous'
            attribute.dynamic = true
            attribute.show.name = true 
            attribute.show.search = true
            attribute.show.add = true
            attribute.show.edit = false
            attribute.show.delete = true

            break;
            
        case "guestpayments":
            attribute.name = "Guest payment";
            attribute.dynamic = true;
            attribute.show.name = true; 
            attribute.show.search = true;
            attribute.show.add = true;
            attribute.show.edit = true
            attribute.show.delete = true;

            break;
                    
        default:
            // attribute = {
            //     name: "",
            //     dynamic : false,
            //     show: {name: true, search: false, add: false, edit: false, delete: false}
            // };

            break;
        }

    return attribute;
};

export const getAccessLevel = (accessLevelArray) => {
    let names = "";

    if (accessLevelArray !== null) {
        for (const item of accessLevelArray) {
            names === "" ? names = item.name : names = names + ", " + item.name;
        }
    }

    return names;
};

export const getRooms = (roomList) => {
    let rooms = "";
    const roomArr = roomList && roomList.split(",");

    if (roomArr !== "undefined") {
        for (const item of roomArr) {
            rooms === "" ? rooms = item.no : rooms = rooms + ", " + item.no;
        }
    }

    return rooms;
};

export const formatYYYYMMDD = (longDateTime) => {
    let dt = new Date(longDateTime),
      mon = ("0" + (dt.getMonth() + 1)).slice(-2),
      day = ("0" + dt.getDate()).slice(-2);
    
    return [dt.getFullYear(), mon, day].join("-");
}

export const formatDDMMYYYY = (longDateTime) => {
    let dt = new Date(longDateTime),
      mon = ("0" + (dt.getMonth() + 1)).slice(-2),
      day = ("0" + dt.getDate()).slice(-2);
    
    return [day, mon, dt.getFullYear()].join("/");
}

export const formatHHMM = (longDateTime) => {
    const tim = new Date(longDateTime);
    const tim1 = moment(tim);
    return tim1.format('HH:mm');
}

export const formatINR = (number) => {
    return "₹ " + parseFloat(number, 10).toFixed(2);
     
};


//  get employee first name
export const getFirstName = (name) => {
    const names = name.split(" ");
    return names.length > 0 ? names[0] : name;
};
