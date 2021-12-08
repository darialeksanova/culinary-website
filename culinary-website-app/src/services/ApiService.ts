type BrokenApiKey = {
  value: string;
  validAgainFrom: number;
};

class ApiService {
  brokenApiKeys: BrokenApiKey[];
  apiKeys = ['91450e1e8b104035a853c931ff64aef1', '9e976fb2502e41999b6bb91f193034d6', 'b7131c0fc1f44834afca3d6948c676c3', '4d77b8f38e5b42cdba6ac7de68239870'];

  constructor() {
    const brokenApiKeysAsString = localStorage.getItem('brokenApiKeys');

    if (brokenApiKeysAsString === null) {
      this.brokenApiKeys = [];
    } else {
      this.brokenApiKeys = JSON.parse(brokenApiKeysAsString) as BrokenApiKey[];
    }
  }

  getApiUrl(): string {
    return 'https://api.spoonacular.com';
  }

  getApiKey(): string {
    const apiKey = this.apiKeys.find(key => !this.brokenApiKeys.find(brokenKey => brokenKey.value === key));

    if (apiKey === undefined) {
      console.warn('No available api keys left!');
      return '';
    }

    return apiKey;
  }

  addBrokenApiKey(brokenApiKey: string): void {
    if (this.brokenApiKeys.find(key => key.value === brokenApiKey)) {
      console.warn(`Provided key '${brokenApiKey}' is already in the broken keys list!`);
      return;
    }

    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    this.brokenApiKeys = [
      ...this.brokenApiKeys,
      {
        value: brokenApiKey,
        validAgainFrom: tomorrow.getTime(),
      },
    ];
    localStorage.setItem('brokenApiKeys', JSON.stringify(this.brokenApiKeys));
  }
};

const removeValidApiKeysFromLocalStorage = () => {
  const brokenApiKeysAsString = localStorage.getItem('brokenApiKeys');

  if (brokenApiKeysAsString !== null) {
    const brokenApiKeys: BrokenApiKey[] = JSON.parse(brokenApiKeysAsString);
    const now = new Date();
    const brokenApiKeysUpdated = brokenApiKeys.filter(key => key.validAgainFrom > now.getTime());
    localStorage.setItem('brokenApiKeys', JSON.stringify(brokenApiKeysUpdated));
  }
}

removeValidApiKeysFromLocalStorage();
export const apiService = new ApiService();
