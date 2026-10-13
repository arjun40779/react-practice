import { Outlet } from "react-router";
import TodoPage from "./pages/todo";

export const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
        errorElement: <div>Home Error</div>,
      },
      {
        path: "/todo",
        element: <TodoPage />,
        errorElement: <div>Todo Error</div>,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
        errorElement: <div>Not Found Error</div>,
      },
    ],
  },
];
