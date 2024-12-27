import { Helmet } from "react-helmet-async";

const Services = () => {
  const handleService = () => {

  }

  return (
    <>
      <Helmet>
        <title>artsense | services</title>
      </Helmet>
      <div className="flex flex-wrap md:flex-nowrap gap-6 mt-16 items-start ">
        {/* Services Section */}
        <div className="  text-right w-full md:w-1/2 mb-4">
          <h1 className="text-lg">
            <span className="text-red-600"></span>serv
            <span className="text-red-600">i</span>ces
          </h1>
          <p>selling<span className="text-red-600"> | </span>commissioning</p>
          <p>authenticating<span className="text-red-600"> | </span>cateloguing</p>
          <p>framing<span className="text-red-600"> | </span>packaging</p>
          <p>restoration by expert </p>
          <p>worldwide courier service</p>

        </div>

        {/* Contact Section */}
        <div className=" w-full md:w-1/2 mt-40">
          <h1 className="text-lg">
            <span className="text-red-600 "></span>con
            <span className="text-red-600 ">t</span>act us
          </h1>
          <div>
            <h1>
              <p>
                <span className="text-red-600">a</span>rt
                <span className="text-red-600">s</span>ense
                <span className="text-red-600"> | </span>House 29, Road 13, Baridhara, Dhaka 1212 <br />
                +880 1718 876332<span className="text-red-600"> | </span>artsensebdgallery@gmail.com </p>
            </h1>
          </div>
          <div>
            <div className=" flex items-center justify-center  p-4">
              <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                <form onSubmit={handleService} className="card-body p-6 sm:p-8 md:p-10">

                  <div className="gap-6">
                    {/* Left Column */}
                    <div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600"></span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600"></span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600"></span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="form-control h-full">
                        <label className="label">
                          <span className="label-text font-semibold text-gray-600"></span>
                        </label>
                        <textarea
                          name="message"
                          placeholder="message"
                          className="textarea textarea-bordered h-full resize-none"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <input
                      className="btn"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="relative w-full h-[400px] mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3135560562105!2d90.41363118577416!3d23.807446631502184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7003e367ad7%3A0xf14a9a69f2e94245!2sartsense!5e0!3m2!1sen!2sus!4v1733578505882!5m2!1sen!2sus"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Services;
