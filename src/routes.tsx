import { Outlet } from "react-router";
import TodoPage from "./pages/todo";
import CounterPage from "./pages/counter";
import HomePage from "./pages/home";
import AccordionPage from "./pages/Accordion";
import TabsPage from "./pages/TabsPage";

export const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <div>Home Error</div>,
      },
      {
        path: "/todo",
        element: <TodoPage />,
        errorElement: <div>Todo Error</div>,
      },
      {
        path: "/counter",
        element: <CounterPage />,
        errorElement: <div>Counter Error</div>,
      },
      {
        path: "/accordion",
        element: <AccordionPage />,
        errorElement: <div>Counter Error</div>,
      },
      {
        path: "/tabs",
        element: <TabsPage />,
        errorElement: <div>Tabs Error</div>,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
        errorElement: <div>Not Found Error</div>,
      },
    ],
  },
];
