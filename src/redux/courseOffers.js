export const reset = (offers) => ({
  type: 'RESET_COURSE_OFFERS',
  offers: offers
});

const courseOffers = (state = [], action) => {
  switch (action.type) {
    case 'RESET_COURSE_OFFERS':
      return action.offers;
    default:
      return state;
  }
}

export default courseOffers;
