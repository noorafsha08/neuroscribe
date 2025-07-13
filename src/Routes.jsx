import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Register from "pages/register";
import NoteEditor from "pages/note-editor";
import Notes from "pages/notes";
import EmotionalAnalytics from "pages/emotional-analytics";
import Tasks from "pages/tasks";
import ProfileSettings from "pages/profile-settings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Notes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/note-editor" element={<NoteEditor />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/emotional-analytics" element={<EmotionalAnalytics />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;