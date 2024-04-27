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
import toast from 'react-hot-toast'

export const generateParagraph = async (values) => {
  const response = await api.post(defaultAuthConfig.registerEndpoint, {
    ...values
  });
  if(response.status === 200){
    toast.success('Register Success')
  }else{
    toast.error('Register Failed')
  }
}
