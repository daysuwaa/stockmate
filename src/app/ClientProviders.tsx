
"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { Toaster } from "react-hot-toast";
import ThemeWrapper from "./settings/ThemeProvider";
import AuthPersist from "./AuthPersists";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthPersist />
      <ThemeWrapper>{children}</ThemeWrapper>
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  );
}