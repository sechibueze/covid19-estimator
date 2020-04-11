const data = {
  region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: "days",
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const goEstimate = (e) => {
  e.preventDefault();
  // TODO
  // set data props from form fields
}
const form = document.querySelector('.estimate-form');
form.addEventListener('submit', goEstimate);
const output = covid19ImpactEstimator(data);


