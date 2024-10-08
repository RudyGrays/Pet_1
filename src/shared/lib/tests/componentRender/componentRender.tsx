import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "shared/config/i18n/i18nForTests";
import { MemoryRouter } from "react-router-dom";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { SidebarProvider } from "app/providers/SidebarProvider/ui/SidebarProvider";

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  const { route = "/", initialState } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState as StateSchema}>
        <SidebarProvider>
          <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
        </SidebarProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
}
