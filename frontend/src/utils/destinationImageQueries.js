// Some city names return weak or generic photos from Wikipedia.
// For those, we search a more specific, photogenic landmark instead.
const imageQueryOverrides = {
  Varanasi: 'Dashashwamedh Ghat',
  Manali: 'Manali, Himachal Pradesh',
  Delhi: 'India Gate',
  Rishikesh: 'Lakshman Jhula',
  Srinagar: 'Dal Lake',
};

export const getImageSearchTerm = (destinationName) => {
  return imageQueryOverrides[destinationName] || destinationName;
};