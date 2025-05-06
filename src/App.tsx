import { BrowserRouter } from 'react-router-dom';

import { Router } from '@/app/routes/Router';
import { ToastProvider } from '@/global/ui/toast';
import { Toaster } from '@/global/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}
