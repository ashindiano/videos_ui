import React from 'react';
import { Navigate } from 'react-router';
import MainLayout from './layouts/main/main.layout';
import VideosWall from './views/videos_wall/container';
import VideoUpload from './views/video_upload/container';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    private: true,
    children: [
      {
        path: 'videos',
        element: <VideosWall />,
      },
      {
        path: 'videos/upload',
        element: <VideoUpload />,
      },
      {
        path: '/',
        element: <Navigate to="/videos" />,
      },
    ],
  },
];

export default routes;
