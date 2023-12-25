export const isFirstVisitSite = () => {
    const hasVisitedBefore = localStorage.getItem('visitedBefore');

    if (hasVisitedBefore) {
      return false;
    } else {
      localStorage.setItem('visitedBefore', 'true');
      return true;
    }
}

export const checkNumberOfSendedRequests = () => {
  const storedData = localStorage.getItem('last-sended-request');
  let apiRequestData = storedData ? JSON.parse(storedData) : null;

  const lastDate = apiRequestData ? apiRequestData.lastDate : null;
  const currentDate = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
  
  if (!apiRequestData || lastDate != currentDate) {
    apiRequestData = {
      lastDate: currentDate,
      count: 0,
    };
  }
  if (apiRequestData.count < 3) {
    apiRequestData.count += 1;
    localStorage.setItem('last-sended-request', JSON.stringify(apiRequestData));
    return true;
  }
  return false;
}