import axios from 'axios';

// Interface for Client Credentials data


// Replace with your actual client ID and secret (store securely!)
const clientId: string = '';
const clientSecret: string = '';

const tokenEndpoint: string = 'https://id.twitch.tv/oauth2/token';

 async function getToken() {
  const res = await axios.post(tokenEndpoint, null, {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    },
  });
  console.log(res.data);
 }


 getToken();