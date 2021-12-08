import fetchIntercept from 'fetch-intercept';
import { apiService } from 'services/ApiService';

export const setupFetchInterceptor = () => {
  return fetchIntercept.register({
    response: function (response) {
      if (response.status === 402) {
        const responseUrl = response.url;
        const query = new URLSearchParams(responseUrl.slice(responseUrl.indexOf('?')));
        const brokenApiKey = query.get('apiKey');

        if (brokenApiKey === null) {
          console.warn(`Provided url '${responseUrl}' does not contain api key!`);
          return response;
        }

        apiService.addBrokenApiKey(brokenApiKey);
      }

      return response;
    },
  });
};