type User = {
  id: number;
  created_at: string;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
};

type getUserResponse = {
  data: User[];
};

type UserRequest = {
  userId: string;
  folderId?: string;
};

const baseUrl = new URL("https://bootcamp-api.codeit.kr");
const getUrl = (path: string) => new URL(path, baseUrl);

export const fetchUserData = async ({ userId }: UserRequest) => {
  const requestUrl = getUrl(`/api/users/${userId}`);
  const response = await fetch(requestUrl, {
    method: "GET",
  });
  if (response.status === 200) {
    const jsonData = await response.json();
    return jsonData as Promise<getUserResponse>;
  }
};

export const fetchUserFolderData = async ({ userId }: UserRequest) => {
  const requestUrl = getUrl(`/api/users/${userId}/folders`);
  const response = await fetch(requestUrl, {
    method: "GET",
  });
  if (response.status === 200) {
    const jsonData = await response.json();
    return jsonData;
  }
};

export const fetchFolderLinks = async ({ userId, folderId }: UserRequest) => {
  const requestUrl = getUrl(
    `api/users/${userId}/links${folderId ? `?folderId=${folderId}` : ""}`
  );
  const response = await fetch(requestUrl, {
    method: "GET",
  });
  const jsonData = await response.json();
  const linksData = jsonData?.data;
  return [response, linksData];
};
