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

// Utility functions
const normalizeTimeInDays = (time, unit = 'days') => {
  switch (unit) {
    case 'weeks':
      return time * 7;
      break;
    case 'months':
      return time * 30;
      break;
    default:
      return time;
      break;

  }
}
const getFactorFromDuration = (time, unit) => {
  const timeInDays = normalizeTimeInDays(time, unit);
  return Math.trunc(timeInDays / 3);
}

const covid19ImpactEstimator = (data) => {
  let input = data,
    impact = {},
    severeImpact = {};

  /*
  *********** CHALLENGE 1
  */
  //  Estimate the number of currently infected people
  impact.currentlyInfected = input.reportedCases * 10; // ch1, p1
  severeImpact.currentlyInfected = input.reportedCases * 50; //ch1, p2

  // ch1, p3
  // To estimate the number of infected people x days from 
  // now(infectedByRequestedTime)
  // note that currentlyInfected doubles every 3 days, so you'd 
  // have to multiply it by a factor of 2
  const time = input.timeToElapse;
  const unit = input.periodType;

  const factor = getFactorFromDuration(time, unit);
  impact.infectedByRequestedTime = impact.currentlyInfected * Math.pow(2, factor)
  severeImpact.infectedByRequestedTime = impact.currentlyInfected * Math.pow(2, factor)

  return {
    data: input,
    impact: impact,
    severeImpact: severeImpact
  }
};
// console.log('Estimates :: ', covid19ImpactEstimator(data))
export default covid19ImpactEstimator;
