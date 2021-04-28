import { useState, useReducer } from 'react';
import { validateMessage } from '../../utils/validations';
import { sendMessage } from '../../services/api';

import resultReducer from './ResultReducer';

const initialResult = {
    show: false,
    message: "",
    short: "",
    type: "blue-400"
}

const initialPayload = {
    name: "",
    email: "",
    subject: "New message from avivas.dev",
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
                    type: "blue-400"
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
                            <input type="text" className="w-full text-gray-500 bg-gray-100 border-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-800" placeholder="Full name"
                                name="name"
                                disabled={loading}
                                value={payload.name}
                                onChange={handleChange}/>
                        </div>

                        <div className="flex items-center w-full col-span-6">
                            <div className="px-4">
                                <span className="text-green-500"><i className=" icons icon-envelope"></i></span>
                            </div>
                            <input type="email" className="w-full text-gray-500 bg-gray-100 border-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-800" placeholder="Email address"
                                name="email"
                                disabled={loading}
                                value={payload.email}
                                onChange={handleChange}/>
                        </div>
                    </div>


                    <div className="mb-0">
                        <textarea className="w-full text-gray-500 bg-gray-100 border-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-800" placeholder="Your message" cols="30" rows="3"
                            name="content"
                            disabled={loading}
                            value={payload.content}
                            onChange={handleChange}></textarea>
                    </div>
                        {
                            result.show && !loading ? (
                                <div className="p-2 text-right">
                                    <div className="inline-flex items-center p-2 text-sm leading-none text-gray-500 bg-white rounded-full shadow dark:text-gray-300 dark:bg-gray-900 text-teal">
                                        <span className={`inline-flex text-white rounded-full h-6 px-3 justify-center items-center bg-${result.type}`}>{result.short}</span>
                                        <span className="inline-flex px-2">{result.message}</span>
                                    </div>
                                </div>
                            ) : null
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