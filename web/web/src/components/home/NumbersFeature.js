import Counter from "../Counter";

const NumbersFeature = ({ data }) => {
  return (
    <div
      id="statistic-4"
      className="pt-70 pb-70 statistic-section division bg-light-pink"
    >
      <div className="container">
        {/* STATISTIC-4 WRAPPER */}
        <div className="row">
          <div className="col-lg-12 home_counter_wrapper">
            <div className="row justify-content-center counter-wrapper">
              {data?.counts &&
                data?.counts.map((single, key) => {
                  return (
                    <div className="col-md-6 col-lg-4 count-col" key={key}>
                      <div className="statistic-block pr-15 d-block align-items-center text-center">
                        {/* Digit */}
                        <div className="">
                          <h2 className="h2-lg statistic-number">
                            <Counter end={single?.countNumber} />
                            {single?.unitSign}
                          </h2>
                        </div>
                        {/* Text */}
                        <div className="grey-color">
                          <h6 className="h6-md">{single?.title}</h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>{" "}
        {/* END STATISTIC-4 WRAPPER */}
      </div>{" "}
      {/* End container */}
    </div>
  );
};

export default NumbersFeature;
