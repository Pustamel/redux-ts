const baseURL = 'https://api.blagoroda.org/api/';

const user_uuid =
  getCookie('uuid') !== null && getCookie('uuid') !== undefined
    ? getCookie('uuid')
    : '';

export const authTelegram = async (user: object) => {
  const body = JSON.stringify(user);

  const response = await fetch(baseURL + 'auth/telegram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const data = await response.json();
  document.cookie = `token=${data.auth_token}`;
  document.cookie = `uuid=${data.user_uuid}`;

  // const body = JSON.stringify(user);
  // const headers = { 'Content-Type': 'application/json' };
  // const { data } = await instance.post('auth/telegram', body, { headers });
  // document.cookie = `token=${data.auth_token}`;
  // document.cookie = `uuid=${data.user_uuid}`;
  // return data;
};

export const getProfileInfo = async () => {
  // const headers = { 'Content-Type': 'application/json' };
  // const { data } = await instance.get(`profile?uuid=${user_uuid}`, { headers });

  const response = await fetch(baseURL + `profile?uuid=${user_uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
