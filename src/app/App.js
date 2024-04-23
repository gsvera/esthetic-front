import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from '../store-redux/store';
import I18nProvider from '@/providers/LanguageProvider';

export const App = ({children, lang}) => {
    const queryClient = 
        new QueryClient(
          {defaultOptions: {queries: {cacheTime: 30000, retryDelay:30000, refetchOnWindowFocus: false}}}
        );

        return (
          <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <I18nProvider lang={lang}>
                  {children}
                </I18nProvider>
              </QueryClientProvider>
          </Provider>
        )
}