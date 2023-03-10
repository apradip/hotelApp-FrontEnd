import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginPasswordSchema = Yup.object({
    keyInputUser: Yup.string().required("Mobile no./ Email can't be empty!").min(10, "Invalid user!"),
    keyInputPassword: Yup.string().required("Password can't be empty!").min(4, "Invalid password!")
});

export const loginOtpSchema = Yup.object({
    keyInputUser: Yup.string().required("Mobile no./ Email can't be empty!").min(10, "Invalid user!"),
    keyInputOtp: Yup.string().required("OTP can't be empty!").min(6, "Invalid otp!")
});

export const forgetPasswordSchema = Yup.object({
    keyInputUser: Yup.string().required("Mobile no./ Email can't be empty!").min(10, "Invalid user!"),
});

export const changePasswordSchema = Yup.object({
    //keyInputOldPassword: Yup.string().required("Old password can't be empty!").min(4, "Invalid old password!"),
    keyInputNewPassword: Yup.string().required("New password can't be empty!").min(4, "Invalid new password!"),
    keyInputReEnterNewPassword: Yup.string().required("Re enter new password can't be empty!").min(4, "Invalid re enter new password!")
        .test({
            params: { },
            message: 'Invalid new password & re enter new password!',
            test: function (value) {
                return value === this.parent.keyInputNewPassword
            }
        })
});

export const accessLevelSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(3, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const idDocumentSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(3, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const bookingAgentSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(3, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const employeeSchema = Yup.object({
    keyInputAccessLevels: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        name: Yup.string(),
      })
    )
    .required("Access level can't be empty!"),
    keyInputName: Yup.string().required("Name can't be empty!").min(6, "Invalid name!"),
    keyInputAddress: Yup.string().required("Address can't be empty!").min(3, "Invalid address!"),
    keyInputMobile: Yup.string().required("Mobile can't be empty!").matches(phoneRegExp, "Invalid mobile no!"),
    keyInputEmail: Yup.string().required("Email can't be empty!").email("Invalid email!")
});

export const planSchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(6, "Invalid name!"),
    keyInputDescription: Yup.string().required("Description can't be empty!").min(10, "Invalid description!")
});

export const roomCategorySchema = Yup.object({
    keyInputName: Yup.string().required("Name can't be empty!").min(5, "Invalid name!"),
    keyInputTariff: Yup.number().required("Tariff can't be empty!").positive("Invalid tariff!").min(3, "Invalid tariff!"),
    keyInputDiscount: Yup.number().required("Maximum Discount can't be empty!").min(0, "Invalid maximum discount!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid maximum discount!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputBed: Yup.number().required("Extra bed tariff can't be empty!").min(0, "Invalid extra bed tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra bed tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputPerson: Yup.number().required("Extra person tariff can't be empty!").min(0, "Invalid extra person tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra person tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        })
});

export const roomSchema = Yup.object({
    keyInputCategoryId: Yup.string().required("Category can't be empty!").min(1, "Invalid category!"),
    keyInputNo: Yup.string().required("No can't be empty!").min(1, "Invalid no!"),
    keyInputTariff: Yup.number().required("Tariff can't be empty!").positive("Invalid tariff!").min(3, "Invalid tariff!"),
    keyInputDiscount: Yup.number().required("Maximum discount can't be empty!").min(0, "Invalid maximum discount!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid maximum discount!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputBed: Yup.number().required("Extra bed tariff can't be empty!").min(0, "Invalid extra bed tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra bed tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        }),
    keyInputPerson: Yup.number().required("Extra person tariff can't be empty!").min(0, "Invalid extra person tariff!")
        .test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Invalid extra person tariff!',
            test: function (value) {
                return value <= parseFloat(this.parent.keyInputTariff)
            }
        })
});

export const guestRoomSchema = Yup.object({
    keyInputIDDocumentId: Yup.string().required("ID can't be empty!").min(2, "Invalid ID!"),
    keyInputIDNo: Yup.string().required("ID No can't be empty!").min(4, "Invalid ID no!"),
    keyInputName: Yup.string().required("Name can't be empty!").min(5, "Invalid name!"),
    keyInputAge: Yup.number().required("Age can't be empty!").positive("Invalid age!").min(18, "Invalid age!"),
    keyInputFatherName: Yup.string().required("Father's name can't be empty!").min(5, "Invalid father's name!"),
    keyInputAddress: Yup.string().required("Address can't be empty!").min(6, "Invalid name!"),
    keyInputCity: Yup.string().required("City can't be empty!").min(2, "Invalid city!"),
    keyInputPS: Yup.string().required("Police station can't be empty!").min(2, "Invalid police station!"),
    keyInputState: Yup.string().required("State can't be empty!").min(2, "Invalid state!"),
    keyInputPIN: Yup.string().required("PIN can't be empty!").min(5, "Invalid PIN!"),
    keyInputMobile: Yup.string().required("Mobile can't be empty!").matches(phoneRegExp, "Invalid mobile no!"),
    keyInputEmail: Yup.string().required("Email can't be empty!").email("Invalid email!"),
    keyInputGuestCount: Yup.number().required("No of guest can't be empty!").positive("Invalid guest count!").min(1, "Invalid guest count!"),
    keyInputGuestCountMale: Yup.number().required("No of male guest can't be empty!"),
    keyInputGuestCountFemale: Yup.number().required("No of female guest can't be empty!"),
    keyInputDayCount: Yup.number().required("No of day can't be empty!").positive("Invalid day count!").min(1, "Invalid day count!"),
    keyInputBookingAgentId: Yup.string().required("Agent can't be empty!").min(2, "Invalid agent!"),
    keyInputPlanId: Yup.string().required("Plan can't be empty!").min(2, "Invalid Plan!"),
    keyInputCorporateName: Yup.string(),
    keyInputCorporateAddress: Yup.string()
        .test({
            params: { },
            message: 'Invalid corporate address!',
            test: function (value) {
                if (this.parent.keyInputCorporateName === "") {
                    if (value === "") {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (value === "") {
                        return false
                    } else {
                        return true
                    }
                }
            }
        }),
    keyInputGST: Yup.string()
        .test({
            params: { },
            message: 'Invalid gst no!',
            test: function (value) {
                if (this.parent.keyInputCorporateName === "") {
                    if (value === "") {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (value === "") {
                        return false
                    } else {
                        return true
                    }
                }
            }
        }),
    keyInputCheckInDate: Yup.string().required("Check In date can't be empty!"),
    keyInputCheckInTime: Yup.string().required("Check In time can't be empty!"),
    // keyInputRooms: Yup.array(),
});

export const guestPaymentSchema = Yup.object({
    keyInputPaymentAmount: Yup.number().required("Payment can't be empty!").positive("Invalid payment amount!").min(1, "Invalid payment amount!"),
    keyInputNarration: Yup.string().required("Narration can't be empty!").min(5, "Invalid narration!"),
    keyInputTransactionDate: Yup.string().required("Transaction date can't be empty!"),
    keyInputTransactionTime: Yup.string().required("Transaction time can't be empty!"),
});
