export type getUserResponse = {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
};

export const getShareUserData = async (): Promise<
  [Response, getUserResponse]
> => {
  const response = await fetch(
    "https://bootcamp-api.codeit.kr/api/sample/user"
  );

  const jsonData = await response.json();
  return [response, jsonData];
};

export const getShareData = async (): Promise<[Response, string]> => {
  const response = await fetch(
    "https://bootcamp-api.codeit.kr/api/sample/folder"
  );
  const jsonData = await response.json();
  return [response, jsonData];
};
