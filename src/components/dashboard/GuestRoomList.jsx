import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-toastify";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import Guest from "./GuestRoom";
import useFetchWithAuth from "../common/useFetchWithAuth";

const Operation = {
    GuestAdd: "GUEST_ADD",
    GuestMod: "GUEST_MOD",
    GuestDel: "GUEST_DEL",
    Booked: "BOOKED",
    BillGenerate: "BILL_GENERATE",
    PaymentAdd: "PAYMENT_ADD",
    Checkout: "GUEST_CHECKOUT"
};


// Start:: Component
// props parameters
// pGuestId
// pName
// pMobile
// pGuestCount
// pCorporateName
// pCorporateAddress
// pGstNo
// onSaved()
// onClosed()

// useImperativeHandle
// handleShowModal
const GuestRoomList = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [dataChanged, setDataChanged] = useState(false);
    const [guestCount, setGuestCount] = useState(0);
    let cardRefs = useRef([]);
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.guestRoomAPI}/${hotelId}`,
        params: {search: ""}
    });

    // Start:: fetch data list from api
    useEffect(() => {
        (async () => {
            try {
                await doFetch();
                setDataChanged(false);
            } catch (err) {
                console.log("Error occured when fetching data");
            }
          })();
    }, [dataChanged]);      // eslint-disable-line react-hooks/exhaustive-deps
    // End:: fetch data list from api

    useEffect(() => {
        error && toast.error(error);

        let count = 0;
        data && data.map((object) => {
            count += object.guestCount;
        });
        data && setGuestCount(count);
    }, [data, error, loading]);

    // // Start:: Close modal
    // const close = () => {
    //     try {
    //         props.onClose();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // // End:: Close modal

    // Start:: on data operation successfully
    const handleSuccess = (operation) => {
        try {
            switch (operation) {
                case Operation.GuestAdd:
                    toast.success("Guest successfully added");
                    setDataChanged(true);
                    props.onSuccess();
                    break;
        
                case Operation.GuestMod:
                    toast.success("Guest successfully changed");
                    setDataChanged(true);
                    props.onSuccess();
                    break;

                case Operation.GuestDel:
                    toast.success("Guest successfully deleted");
                    setDataChanged(true);
                    props.onSuccess();
                    break;               
                        
                case Operation.Booked:
                    toast.success("Room successfully booked");
                    setDataChanged(true);
                    props.onSuccess();
                    break;               
        
                case Operation.BillGenerate:
                    setDataChanged(true);
                    props.onSuccess();
                    break;                                

                case Operation.PaymentAdd:
                    toast.success("Payment successfully done");
                    setDataChanged(true);
                    props.onSuccess();
                    break;
        
                case Operation.Checkout:
                    toast.success("Guest successfully checked out");
                    setDataChanged(true);
                    props.onSuccess();
                    break;
                        
                default:                
                    break;                
            }
        } catch (err) {
            console.log(err);
        }        
    };
    // End:: on data operation successfully

    // Start:: show all data in card format
    const displayData = (pData = []) => {
        try {
            return pData.map((object, idx) => {
                cardRefs.current.push();
                
                return (<Guest
                    ref = {(el) => cardRefs.current[idx] = el}
                    key = {`_guest_room_row_${idx}`}
                    pIndex = {idx}
                    pGuestId = {object.id} 
                    pName = {object.name}
                    pMobile = {object.mobile}
                    pGuestCount = {object.guestCount}
                    pCorporateName = {object.corporateName}
                    pCorporateAddress = {object.corporateAddress}
                    pBalance = {object.balance}
                    // pOption = {object.option}
                    pIndate = {object.inDate}
                    pRooms = {object.rooms}
                    onEdited = {() => {handleSuccess(Operation.GuestMod)}}
                    onDeleted = {() => {handleSuccess(Operation.GuestDel)}} 
                    onBooked = {() => {handleSuccess(Operation.Booked)}}
                    onBillGenerated = {() => {handleSuccess(Operation.BillGenerate)}}
                    onPaymentAdded = {() => {handleSuccess(Operation.PaymentAdd)}} 
                    onCheckedout = {() => {handleSuccess(Operation.Checkout)}} 
                    onOrdered = {() => {handleSuccess(Operation.Order)}}
                    onDespatched = {() => {handleSuccess(Operation.Despatch)}}
                    // onActivated={() => {handleActivated(idx)}}
                    // onClosed = {close}
                    />);
            });
        } catch (err) {
            console.log(err);
        }
    };
    // End:: show all data in card format

    
    // Start:: Html
    return (
        <div className="card card-xl-stretch mb-5 mb-xl-8 dashboard-card">
            <div className="dashboard-card-header">
                <h3 className="card-title align-items-start flex-column">
                    <span className="text-dark fs-4 mb-1">
                        Guest list</span>
                    <span className="text-muted mt-1 fs-8 d-block">Total <b>{guestCount}</b> guest at present</span>
                </h3>
            </div>
            <div className="card-body py-3 scrollable">
                <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                            <tr className="fw-bolder text-muted">
                                <th className="w-25px">Rooms</th>
                                <th className="min-w-150px">Guest</th>
                                <th className="min-w-140px">In/Out date</th>
                                <th className="min-w-120px text-end">Payment</th>
                                <th className="min-w-100px text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && 
                                    data && 
                                        displayData(data)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    // End:: Html
});
// End:: Component


export default GuestRoomList;