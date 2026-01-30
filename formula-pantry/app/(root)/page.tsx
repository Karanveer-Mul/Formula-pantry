export const Home = () => {
  return (
    <div className="relative isolate pt-14">
      <div className="relative w-full">
        <div className="absolute inset-0 top-10 overflow-hidden" aria-hidden="true">
          <div className="bg-[linear-gradient(180deg,#fffa00,#fffa00_10%,rgba(255,250,0,0)_85%)] pt-11">
            <span className="text-center text-white tracking-tighter font-extrabold z-1 text-9xl block max-w-[100vw] whitespace-nowrap overflow-hidden">
              FORMULA ONE
            </span>
          </div>
          <div className="pointer-events-none overflow-hidden">
            <span className="leading-48 block max-w-[100vw] whitespace-nowrap overflow-hidden text-[10rem] text-center font-extrabold tracking-tighter bg-[repeating-linear-gradient(135deg,#6a7282_0px,#6a7282_1px,transparent_1px,transparent_4px)] bg-clip-text text-transparent opacity-20">
              SECTOR TALKS
            </span>
          </div>
        </div>
        <div className="px-6 lg:px-8 mx-auto max-w-4xl pb-32 sm:pb-48 lg:pb-56 relative z-10">
          <div className="text-left">
            <h1 className="text-5xl font-bold tracking-tight text-balance text-gray-900 sm:text-7xl">
              SECTOR
              <br />
              TALKS
            </h1>
            <div className="py-10 sm:mb-20">
              <p className="z-3 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl ">
                <span className="px-1">REV YOUR CURIOSITY</span>
              </p>
              <span className="my-3 mx-2 z-3 text-md font-light tracking-tight text-gray-500 sm:text-xl/8">
                ver. 0.0.1
              </span>
            </div>
            <div className="flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-8 mx-auto max-w-4xl pb-32 sm:pb-48 lg:pb-56">
        <div className="text-left">
          <h1 className="text-5xl font-bold tracking-tight text-balance text-gray-900 sm:text-7xl">
            SECTOR
            <br />
            TALKS
          </h1>
          <div className="py-10 mt-10 sm:py-30">
            <p className="z-3 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl ">
              <span className="bg-white px-1">REV YOUR CURIOSITY</span>
            </p>
            <p className="my-3 mx-2 z-3 text-md font-light tracking-tight text-gray-500 sm:text-xl/8">
              ver. 0.0.1
            </p>
          </div>
          <div className="flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className=" px-6 lg:px-8 mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding.{" "}
            <a href="#" className="font-semibold text-indigo-600">
              <span aria-hidden="true" className="absolute inset-0" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Data to enrich your online business
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
