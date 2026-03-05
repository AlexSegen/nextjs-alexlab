const resultReducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
        case "ERROR":
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