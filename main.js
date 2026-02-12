const activityCards = document.querySelectorAll('.section');
const timeFrameButtons = document.querySelectorAll(
  '.time-frame-selector__button',
);

let activitiesData = [];

const labels = {
  daily: 'Yesterday',
  weekly: 'Last Week',
  monthly: 'Last Month',
};

const updateCards = (timeframe, data) => {
  data.forEach((activity) => {
    const matchedCard = [...activityCards].find((card) => {
      return card.dataset.activity === activity.title;
    });

    const hoursElement = matchedCard.querySelector('h3');
    const previousHoursElement = matchedCard.querySelector('p');

    hoursElement.textContent = `${activity.timeframes[timeframe].current}hrs`;
    previousHoursElement.textContent = `${labels[timeframe]} - ${activity.timeframes[timeframe].previous}hrs`;
  });
};

timeFrameButtons.forEach((button) => {
  button.addEventListener('click', () => {
    timeFrameButtons.forEach((btn) => {
      btn.classList.remove('time-frame-selector__button--active');
    });

    button.classList.add('time-frame-selector__button--active');

    const selectedTimeframe = button.textContent.trim().toLowerCase();

    updateCards(selectedTimeframe, activitiesData);
  });
});

fetch('./data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    activitiesData = data;

    updateCards('weekly', data);
  });
