// const data = {
//   region: {
//     name: "Africa",
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: "days",
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };

/** *****
 * **** UTILITY FUNCTIONS
 */
const normalizeTimeInDays = (time, typeOfPeriod) => {
  const unit = typeOfPeriod.toLowerCase();
  switch (unit) {
    case 'weeks':
      return time * 7;
    case 'months':
      return time * 30;
    default:
      return time;
  }
};
const getFactorFromDuration = (time, unit) => {
  const timeInDays = normalizeTimeInDays(time, unit);
  return Math.trunc(timeInDays / 3);
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};

  /*
  *********** CHALLENGE 1
  */
  //  Estimate the number of currently infected people
  impact.currentlyInfected = input.reportedCases * 10; // ch1, p1
  severeImpact.currentlyInfected = input.reportedCases * 50; // ch1, p2

  // ch1, p3
  // To estimate the number of infected people x days from
  // now(infectedByRequestedTime)
  // note that currentlyInfected doubles every 3 days, so you'd
  // have to multiply it by a factor of 2
  const time = input.timeToElapse;
  const unit = input.periodType;

  const factor = getFactorFromDuration(time, unit);
  impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 ** factor));
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 ** factor));
  /** ************************
   * ********* CHALLENGE 2
   */
  // ch2, p1
  // Determine 15 % of infectionsByRequestedTime
  // Represent this as severeCasesByRequestedTime and
  // make it a part of your estimation output
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  // Based on the above, the totalHospitalBeds input data, and your severeCasesByRequestedTime,
  // estimate the number of available hospital beds for severe COVID - 19 positive patient
  impact.hospitalBedsByRequestedTime = Math.trunc(
    (0.35 * input.totalHospitalBeds)
    - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    (0.35 * input.totalHospitalBeds)
    - severeImpact.severeCasesByRequestedTime
  );

  /** *************************
   * ********** CHALLENGE 3
   */
  // ch3, p1
  // Determine 5 % of infectionsByRequestedTime.This is the estimated
  // number of severe positive cases
  // that will require ICU care.Represent this as casesForICUByRequestedTime
  // and make it a part of your
  // estimation output
  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * severeImpact.infectionsByRequestedTime
  );

  // ch3, p2
  // determine 2 % of infectionsByRequestedTime.This is the estimated number of severe positive
  // cases that will require ventilators.Represent this as casesForVentilatorsByRequestedTime and
  // make it a part of your estimation output
  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );

  // Finally, given the estimated number of infected people by the requested
  // time and the AVG daily income
  // of the region, estimate how much money the economy is likely to
  // lose daily, over the said period of time.
  // Save this as dollarsInFlight in your output data structure.If 65 % of the
  //  region(the majority) earn
  // $1.5 a day, you can compute the average daily dollarsInFlight for a 30 day period as:
  // (infectionsByRequestedTime x 0.65 x 1.5) / 30;
  const elapsedTimeInDays = normalizeTimeInDays(time, unit);
  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
      * input.region.avgDailyIncomeInUSD)
    / elapsedTimeInDays
  );
  severeImpact.dollarsInFlight = Math.trunc(
    (severeImpact.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
      * input.region.avgDailyIncomeInUSD) / elapsedTimeInDays
  );


  return {
    data: input,
    impact,
    severeImpact
  };
};
// console.log('Estimates :: ', covid19ImpactEstimator(data))
// export default covid19ImpactEstimator;
