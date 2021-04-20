import { useState, useReducer } from 'react';
import { validateMessage } from '../../utils/validations';
import { sendMessage } from '../../services/api';

import resultReducer from './ResultReducer';

const initialResult = {
    show: false,
    message: "",
    short: "",
    type: "primary"
}

const initialPayload = {
    name: "",
    email: "",
    subject: "New message from AlexLab",
    content: ""
}

const ContactForm = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(initialPayload);
    const [result, dispatch] = useReducer(resultReducer, initialResult);

    const handleChange = e => {
        const { name, value } = e.target;
        setPayload({
          ...payload,
          [name]: value
        });
    }

    const send = () => {

        setLoading(true)

        sendMessage(payload).then(() => {
            setLoading(false);
            
            dispatch({
                type: "SUCCESS"
            });
            
            setPayload(initialPayload);

        }).catch(() => {
            setLoading(false);
            dispatch({
                type: "ERROR"
            });
        });
    }

    const validateForm = async (e) => {

        e.preventDefault();

        const result = validateMessage(payload);

        if(result.error) {

            dispatch({
                type: "VALIDATION_ERROR",
                data: {
                    show: true,
                    message: result.error.details[0].message,
                    short: "Hey,",
                    type: "text-yellow-400"
                }
            });

            return false
        }

        send()
        
        return result;
    }

    return (
        <div className="w-full rounded">
            <form onSubmit={validateForm}>
                <div className="">
                    <div className="grid grid-cols-12 mb-4">
                        <div className="flex items-center w-full col-span-6">
                            <div className="px-4">
                                <span className="text-green-500"><i className=" icons icon-user"></i></span>
                            </div>
                            <input type="text" className="w-full text-gray-200 bg-gray-800 border-gray-800" placeholder="Full name"
                                name="name"
                                disabled={loading}
                                value={payload.name}
                                onChange={handleChange}/>
                        </div>

                        <div className="flex items-center w-full col-span-6">
                            <div className="px-4">
                                <span className="text-green-500"><i className=" icons icon-envelope"></i></span>
                            </div>
                            <input type="email" className="w-full text-gray-200 bg-gray-800 border-gray-800" placeholder="Email address"
                                name="email"
                                disabled={loading}
                                value={payload.email}
                                onChange={handleChange}/>
                        </div>
                    </div>


                    <div className="mb-4">
                        <textarea className="w-full text-gray-200 bg-gray-800 border-gray-800" placeholder="Your message" cols="30" rows="3"
                            name="content"
                            disabled={loading}
                            value={payload.content}
                            onChange={handleChange}></textarea>
                    </div>
                        {
                            result.show ? <div className={`p-2 text-center ${result.type}`}> <strong>{result.short}</strong> {result.message}</div> : null
                        }
                    <div className="text-right">
                        <button type="submit" className="button is-primary" disabled={loading}>
                            {loading ? 'Sending...' : 'Send message' }
                        </button>

                    </div>

                </div>
            </form>
        </div>
    )
}

export default ContactForm;