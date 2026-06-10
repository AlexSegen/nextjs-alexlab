'use client'

import { useContactForm } from './use-contact-form'

const ContactForm = () => {
  const { loading, payload, result, handleChange, validateForm } = useContactForm()

  return (
    <div className="w-full rounded">
      <form onSubmit={validateForm}>
        <div className="">
          <div className="grid grid-cols-12 mb-4">
            <div className="flex items-center w-full col-span-6">
              <div className="px-4">
                <span className="text-green-500">
                  <i className=" icons icon-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="w-full text-gray-200 bg-gray-800 border-gray-800"
                placeholder="Full name"
                name="name"
                disabled={loading}
                value={payload.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center w-full col-span-6">
              <div className="px-4">
                <span className="text-green-500">
                  <i className=" icons icon-envelope"></i>
                </span>
              </div>
              <input
                type="email"
                className="w-full text-gray-200 bg-gray-800 border-gray-800"
                placeholder="Email address"
                name="email"
                disabled={loading}
                value={payload.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <textarea
              className="w-full text-gray-200 bg-gray-800 border-gray-800"
              placeholder="Your message"
              cols={30}
              rows={3}
              name="content"
              disabled={loading}
              value={payload.content}
              onChange={handleChange}
            ></textarea>
          </div>
          {result.show ? (
            <div className={`p-2 text-center ${result.type}`}>
              {' '}
              <strong>{result.short}</strong> {result.message}
            </div>
          ) : null}
          <div className="text-right">
            <button type="submit" className="button is-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
