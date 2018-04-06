import React, { Component } from 'react';

const Tutorial = (props) => {
  return (
    <main className='tutorial'>
      <p>
        Welcome to <span className='chantcolor'>Chanterelle!</span> Chanterelle is a tool for organizing your tasks and dependencies (which tasks rely
        on other tasks being completed first) to simplify your workflow and your life! <br/><br/>

        The "<span className='contrastcolor'>Workflows</span>" sub-menu lets you select between different workflows. When you created your account, an empty
        workflow was created for you. Feel free to change the name by clicking the edit button. You can also add more
        workflows, or delete finished ones. <br/><br/>

        "<span className='contrastcolor'>Available Tasks</span>" lets you view tasks you can do right now. As you complete
        tasks, more tasks will appear on this list as dependencies are met. You can also add new tasks here
        by clicking the "add task" button at the bottom of the screen. <br/><br/>

        "<span className='contrastcolor'>Dependency Graph</span>" is the tool that makes Chanterelle unique. Drag an
        arrow between two tasks to create a dependency. Start at the task that needs to be completed first,
        end at the task that relies on the other. Feel free to create as many dependencies as make sense to you,
        the graph will keep itself organized. Click on a task or arrow to edit or delete it. <br/><br/>

        More features coming soon!
      </p>
      <br/>
    </main>
  )
}

export default Tutorial;
