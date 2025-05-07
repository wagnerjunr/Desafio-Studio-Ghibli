import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar/Navbar";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center overflow-hidden">
        <Navbar />
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}

export default App;
