export const EmptyFrameIllustration = ({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) => (
  <div className={`${className} relative overflow-hidden`}>
    <div className="absolute top-0 w-full h-full left-0 flex items-center justify-center">
      <div>{children}</div>
    </div>
    <svg
      viewBox="0 0 1456 1039"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1414.91 3H40.12C19.6192 3 3 19.6192 3 40.12V997.94C3 1018.44 19.6192 1035.06 40.12 1035.06H1414.91C1435.41 1035.06 1452.03 1018.44 1452.03 997.94V40.12C1452.03 19.6192 1435.41 3 1414.91 3Z"
        fill="#F4F1ED"
        stroke="#070707"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 88.8799H1452.03"
        stroke="#070707"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M218.69 38.3701H211.35C205.557 38.3701 200.86 43.0666 200.86 48.8601V56.2001C200.86 61.9936 205.557 66.6901 211.35 66.6901H218.69C224.483 66.6901 229.18 61.9936 229.18 56.2001V48.8601C229.18 43.0666 224.483 38.3701 218.69 38.3701Z"
        fill="#FFEFF0"
      />
      <path
        d="M170.38 38.3701H163.04C157.247 38.3701 152.55 43.0666 152.55 48.8601V56.2001C152.55 61.9936 157.247 66.6901 163.04 66.6901H170.38C176.173 66.6901 180.87 61.9936 180.87 56.2001V48.8601C180.87 43.0666 176.173 38.3701 170.38 38.3701Z"
        fill="#FFEFF0"
      />
      <path
        d="M122.07 38.3701H114.73C108.937 38.3701 104.24 43.0666 104.24 48.8601V56.2001C104.24 61.9936 108.937 66.6901 114.73 66.6901H122.07C127.863 66.6901 132.56 61.9936 132.56 56.2001V48.8601C132.56 43.0666 127.863 38.3701 122.07 38.3701Z"
        fill="#FFEFF0"
      />
      <path
        d="M212.85 33.1699H205.51C199.717 33.1699 195.02 37.8664 195.02 43.6599V50.9999C195.02 56.7934 199.717 61.4899 205.51 61.4899H212.85C218.644 61.4899 223.34 56.7934 223.34 50.9999V43.6599C223.34 37.8664 218.644 33.1699 212.85 33.1699Z"
        fill="#C5DCDD"
        stroke="black"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M164.54 33.1699H157.2C151.407 33.1699 146.71 37.8664 146.71 43.6599V50.9999C146.71 56.7934 151.407 61.4899 157.2 61.4899H164.54C170.334 61.4899 175.03 56.7934 175.03 50.9999V43.6599C175.03 37.8664 170.334 33.1699 164.54 33.1699Z"
        fill="#EFAF00"
        stroke="black"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M116.22 33.1699H108.88C103.087 33.1699 98.39 37.8664 98.39 43.6599V50.9999C98.39 56.7934 103.087 61.4899 108.88 61.4899H116.22C122.013 61.4899 126.71 56.7934 126.71 50.9999V43.6599C126.71 37.8664 122.013 33.1699 116.22 33.1699Z"
        fill="#F46F40"
        stroke="black"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
)
