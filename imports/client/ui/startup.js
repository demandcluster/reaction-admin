import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "react-apollo";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
import initApollo from "/imports/plugins/core/graphql/lib/helpers/initApollo";
import { defaultTheme } from "@reactioncommerce/catalyst";
import { loadRegisteredBlocks, loadRegisteredComponents } from "@reactioncommerce/reaction-components";
import { SnackbarProvider } from "notistack";
import appComponents from "./appComponents";
import theme from "./theme";
import App from "./layouts/App";
import getRootNode from "./utils/getRootNode";
import RouterContext from "./context/RouterContext";
import snackbarPosition from "./utils/getSnackbarPosition";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Meteor.startup(() => {
  loadRegisteredBlocks();
  loadRegisteredComponents();

  const apolloClient = initApollo();

  Tracker.autorun((computation) => {
    const primaryShopSub = Meteor.subscribe("PrimaryShop");

// sentry.io integration
Sentry.init({
  dsn: "https://42a10625f320466bb7d877df8faa5cb7@o849206.ingest.sentry.io/5816058",
  integrations: [new Integrations.BrowserTracing()],
  release: "@demandcluster-admin:"+process.env.DC_RELEASE,
  beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id,subtitle:"The DemandCluster team has been notified." });
      }
      return event;
    },
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

    if (primaryShopSub.ready()) {
      ReactDOM.render(
        (
          <ApolloProvider client={apolloClient}>
            <BrowserRouter>
              <TranslationProvider>
                <ComponentsProvider value={appComponents}>
                  <ThemeProvider theme={theme}>
                    <MuiThemeProvider theme={defaultTheme}>
                      <SnackbarProvider anchorOrigin={snackbarPosition} maxSnack={3}>
                        <DndProvider backend={HTML5Backend}>
                          <Route>
                            {(routeProps) => (
                              <RouterContext.Provider value={routeProps}>
                                <App />
                              </RouterContext.Provider>
                            )}
                          </Route>
                        </DndProvider>
                      </SnackbarProvider>
                    </MuiThemeProvider>
                  </ThemeProvider>
                </ComponentsProvider>
              </TranslationProvider>
            </BrowserRouter>
          </ApolloProvider>
        ),
        getRootNode()
      );

      computation.stop();
    }
  });
});
