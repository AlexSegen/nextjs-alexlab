const resultReducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            return action.data = {
                show: true,
                message: "Your message was send. I will contact you ASAP. Thanks!",
                short: "Very good!",
                type: "text-green-400"
            }

        case "ERROR":
                return action.data = {
                show: true,
                message: "There was a problem sending your message. Please, try again.",
                short: "Oops: ",
                type: "text-red-400"
            }

        case "VALIDATION_ERROR":
            return action.data

        case "NONE":
            return action.data = {
                show: false,
                message: "",
                short: "",
                type: "primary"
            };
    
        default:
            return state
    }

}

export default resultReducer;