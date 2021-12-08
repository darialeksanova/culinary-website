class ApiService {
  brokenApiKeys: string[];
  apiKeys = ['91450e1e8b104035a853c931ff64aef1', '9e976fb2502e41999b6bb91f193034d6', 'b7131c0fc1f44834afca3d6948c676c3', '4d77b8f38e5b42cdba6ac7de68239870'];

  constructor() {
    const brokenApiKeysAsString = localStorage.getItem('brokenApiKeys');

    if (brokenApiKeysAsString === null) {
      this.brokenApiKeys = [];
    } else {
      this.brokenApiKeys = JSON.parse(brokenApiKeysAsString);
    }
  }

  getApiUrl(): string {
    return 'https://api.spoonacular.com';
  }

  getApiKey(): string {
    const apiKey = this.apiKeys.find(key => !this.brokenApiKeys.includes(key));

    if (apiKey === undefined) {
      throw new Error('No available api keys left!');
    }

    return apiKey;
  }

  addBrokenApiKey(brokenApiKey: string): void {
    if (this.brokenApiKeys.includes(brokenApiKey)) {
      console.warn(`Provided key '${brokenApiKey}' is already in the broken keys list!`);
      return;
    }

    this.brokenApiKeys = [...this.brokenApiKeys, brokenApiKey];
    localStorage.setItem('brokenApiKeys', JSON.stringify(this.brokenApiKeys));
  }
};

export const apiService = new ApiService();
