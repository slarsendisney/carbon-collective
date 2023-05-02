import {m} from "framer-motion";

export const Logo = ({ className }: { className: string }) => (
  <svg
    className={className}
    version="1.1"
    viewBox="100 100 500 400"
    xmlns="http://www.w3.org/2000/svg"

  >

      <m.path
        d="m159.27 388.86h381.36v45.695h-381.36z"
        className="fill-current"
      />
      <m.path
        d="m254.69 361.87c62.273 0 113.12-50.062 118.16-116.48 3.3594-43.008 33.824-74.258 72.574-74.258 39.984 0 72.465 32.48 72.465 72.465h45.695c0-65.184-53.09-118.16-118.16-118.16-63.168 0-112.89 48.945-118.16 116.48-3.2461 42.336-34.383 74.258-72.574 74.258-39.984 0-72.465-32.48-72.465-72.465h-45.809c0 65.074 53.09 118.16 118.27 118.16z"
        className="fill-current"
      />
 
  </svg>
);
