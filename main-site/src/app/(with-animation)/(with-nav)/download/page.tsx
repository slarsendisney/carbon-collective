import { ExtensionIllustration } from "@/components/illustrations/Extension";

const Download = () => (
  <div className="flex items-center justify-center grow bg-blue-100">
    <div className="max-w-3xl mx-auto py-12 w-full grid gap-12 grid-cols-3">
      <div className="flex items-center justify-center">
        <ExtensionIllustration className="w-64" />
      </div>
      <div className="space-y-4 col-span-2">
        <h2 className="text-2xl tracking-tight font-extrabold sm:text-4xl ">
          Downloading Extension
        </h2>
        <p className="mt-3 text-xlsm:mt-4">
          Your download should start automatically, if it doesn't{" "}
          <a className="text-blue-800 underline">click here</a>.
        </p>
        <div className="bg-orange-100 text-orange-800 rounded p-4 flex space-x-2">
            <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          </div>

          <p className="text-gray-700">
            As this is hackathon project (and the extension is not yet on the chrome
            webstore), there are a few additional steps you will need to go
            through in order to use our extension.
          </p>
        </div>
      </div>
    </div>
  </div>
);

//idjjlniagpmakjaamghbbolfkcgholhd


export default Download;
