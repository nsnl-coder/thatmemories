import useGetCurrentUser from '@react-query/auth/useGetCurrentUser';

function GetCurrentUser(): JSX.Element | null {
  useGetCurrentUser();

  return null;
}

export default GetCurrentUser;
