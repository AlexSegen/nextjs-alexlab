import Button from '@/components/ui/button'

interface ContactBarProps {
  btnText: string
  contentText: string
  contentSubText?: string
  isDark?: boolean
}

const ContactBar = ({ btnText, contentText, contentSubText }: ContactBarProps) => (
  <div className={`bg-black text-white relative px-4 md:px-10 py-20 overflow-hidden `}>
    <div className="items-center justify-center block md:flex">
      <div className="relative z-20 w-full p-10 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{contentText}</h2>
        {contentSubText ? <p className="text-xl md:text-3xl">{contentSubText}</p> : null}
      </div>
      <div className="z-20 text-center md:w-1/2">
        <Button as="link" href="#contact" variant="primary" className="px-12 py-3 text-xl md:text-3xl whitespace-nowrap">
          {btnText}
        </Button>
      </div>
    </div>
    <img className="absolute top-0 object-fill w-full opacity-10" src="/img/collage.jpg" alt="" />
  </div>
)

export default ContactBar
