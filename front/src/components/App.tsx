import React from 'react';
import TaskList from './TaskList';

const App: React.FC = () => {
    const handleAddTask = (name: string) => {
        console.log(`Task added: ${name}`);
    };

    return (
        <div>
            <TaskList />
        </div>
    );
};

export default App;
