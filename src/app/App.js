import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from '../store-redux/store';
import I18nProvider from '@/providers/LanguageProvider';
import { ApiRequestProvider } from "@/providers/InterceptorProvider";

export const App = ({children, lang}) => {
    const queryClient = 
        new QueryClient(
          {defaultOptions: {queries: {cacheTime: 3000, retryDelay:3000, refetchOnWindowFocus: false}}}
        );

        return (
          <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <ApiRequestProvider>
                  <I18nProvider lang={lang}>
                    {children}
                  </I18nProvider>
                </ApiRequestProvider>
              </QueryClientProvider>
          </Provider>
        )
}