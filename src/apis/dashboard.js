import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import defaultAuthConfig from 'src/configs/auth'
import api from './axios/instance';
import Cookies from 'js-cookie';

// export const useDashboardData = () => {

//   const { isLoading, isError, data } = useQuery({
//     queryKey: 'dashboard',
//     queryFn: async () => {
//       api.headers={
//         "Authorization": "Bearer " + defaultAuthConfig.getToken()
//       }
//       const { data } = await api.get(defaultAuthConfig.getDashboardData);

//       return data;
//     },
//     staleTime: 7 * 60 * 1000, // 30 seconds
//   });

//   return { isLoading, isError, data };
// };
export const getDashboardData = async () => {
  try {
    const response = await api.get(defaultAuthConfig.getDashboardData,{
      headers: {
        "Authorization": "Bearer " + Cookies.get('accessToken')
      }

    });
    console.log("response",response)

    return response.data;

  } catch (error) {
    throw new Error('Failed to fetch dashboard data');
  }
};

export const useGetParagraphs = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: 'paragraphs',
    queryFn: async () => {

      const { data } = await api.get("/generateParagraph",{
        headers: {
          "Authorization": "Bearer " + Cookies.get('accessToken')
        }

      });
      console.log("data",data)
      return data;
    },

  });
}
