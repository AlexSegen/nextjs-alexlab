const VueLogo = () => (
  <svg viewBox="0 0 29 25" width="29" height="25" fill="none" className="flex-none mr-2">
    <g filter="url(#vue-logo-filter)">
      <path
        d="M18.25.85l-4 6.5-4-6.5H1l13.25 22.5L27.5.85h-9.25z"
        stroke="#4B5563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
    <path
      d="M18.25.85l-4 6.5-4-6.5H6l8.25 13.5L22.5.85h-4.25z"
      fill="#1F2937"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <defs>
      <filter
        id="vue-logo-filter"
        x=".25"
        y="-.899"
        width="28"
        height="25"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>
        <feOffset dy="-1"></feOffset>
        <feGaussianBlur stdDeviation=".5"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
        <feBlend in2="shape" result="effect1_innerShadow"></feBlend>
      </filter>
    </defs>
  </svg>
)

export default VueLogo
