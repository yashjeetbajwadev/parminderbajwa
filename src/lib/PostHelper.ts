interface ApiClientOptions {
    useCustomEndpoint?: boolean;
    useJsonFormat?: boolean;
    collection: string;
  }
  
  interface ApiClientData {
    [key: string]: any;
  }
  
  export async function PostHelper(data: ApiClientData, options: ApiClientOptions): Promise<any> {
    const { useCustomEndpoint = false, useJsonFormat = false, collection } = options;
  
    const url = new URL('/api/post', window.location.origin);
    url.searchParams.append('collection', collection);
    
    if (useCustomEndpoint) {
      url.searchParams.append('custom', 'true');
    }
    
    if (useJsonFormat) {
      url.searchParams.append('json', 'true');
    }
  
    const headers: HeadersInit = {
      'Content-Type': useJsonFormat ? 'application/json' : 'application/x-www-form-urlencoded',
    };
  
    let body: string;
    if (useJsonFormat) {
      body = JSON.stringify(data);
    } else {
      body = new URLSearchParams(data as Record<string, string>).toString();
    }
  
    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: headers,
        body: body,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }