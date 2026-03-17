import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './Dashboard/Overview';
import ProjectManager from './Dashboard/ProjectManager';
import SkillManager from './Dashboard/SkillManager';
import MessageManager from './Dashboard/MessageManager';

const Dashboard = () => {
    return (
        <Routes>
            <Route index element={<Overview />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="skills" element={<SkillManager />} />
            <Route path="messages" element={<MessageManager />} />
        </Routes>
    );
};

export default Dashboard;
