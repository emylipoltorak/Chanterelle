Chanterelle
===========

Description:
------------
Chanterelle is a new way of thinking about how to get things done. By storing tasks,
dependencies, and weights as a directed acyclic graph, our to-do "list" gains access
to a number of algorithms that can optimize your workflow.

Problem:
--------
To-do lists, whether on paper or stored digitally, are a messy and incomplete
representation of the structure we're actually holding in our heads. We may write
down "go shopping, make dinner, put away groceries, fold laundry", but this
representation misses some very basic facts. To put away groceries or make dinner,
you need to have gone shopping already. Folding the laundry will probably only take
a few minutes, and can be fit in somewhere fairly easily, but you don't want to do
it while the groceries are still sitting out. Grocery shopping will take 2 hours,
and has to be done while the store is still open. The main thing our to-do lists
are missing is the concept of dependencies. It turns out, a list is simply the wrong
data structure for storing a workflow.

Solution:
---------
A directed acyclic graph, or DAG, is a common data structure made up of nodes and
directed edges, where you can never loop back around to a node you've already
visited. This seems like a natural fit for a workflow. The directed edges easily
represent both dependencies and weights (here, the amount of time a task
takes to complete, the difficulty of the task, or both). The lack of cycles means
that we will never be re-assigned a task that has already been completed: we can't
end up in a go shopping - put away food loop forever without re-adding completed
tasks. (Though life can certainly feel that way!) The DAG knows what unmet
dependencies each task has, stored as the node's "in-degree". If a node has an
in-degree of 0, it has no unmet dependencies. Chanterelle's home screen will only
show you tasks where in-degree == 0; things that you can accomplish *right now*.
When you cross an item off your list, any tasks that are dependent on that item will
have their in-degree reduced by one. If any new tasks now have an in-degree of 0,
they will automatically pop on to the home screen's task list. Beyond MVP, I can
build a number of tools based on existing topological sort and critical path
algorithms to help users accomplish their to-do list more efficiently. An exciting
feature I would love to build, if there's enough time, is a tool to split the tasks
up among any number of users in an optimal way.

User Interface:
---------------
The MVP app contains six pages: home, graph view, add a
task, graph builder, sign up, and login.

Page Descriptions:
------------------
Every page will have the logo in the upper left hand corner. When clicked, a menu
will drop down, allowing the user to select any of the main screens. When clicked again,
the menu will disappear. In the top right hand corner, there will be sign up and login
buttons. The name of the project will also appear on every page.

Home:
-----
The home page contains only tasks that can be done
right now. Tasks can be crossed off here, and the list will be
re-populated by new tasks as dependencies are met.

Graph View
----------
The graph view displays the entire workflow as a simplified DAG. This screen must support
zooming in and out.

Add a Task:
-----------
The add a task page will have the user add tasks in the order they were entered. The user
will be prompted to enter tasks by name. Optionally, they can also enter how long they think
the task will take and/or how difficult they think the task will be. These things may be
beyond MVP, this is worth considering.

Graph Builder:
--------------
The graph builder is the most challenging
part of the UI. I am considering two techniques to build a DAG from an unordered
list of nodes. Either way, the graph builder will populate the screen with bubbles
(each one is a node) spaced evenly on the screen, in the order the user entered
them.
    Option 1:
        The user can click and drag arrows between nodes.
    Option 2:
        The user clicks 'start' and the first node is highlighted. The user is
        prompted to click on any nodes that depend on this node (or, any nodes
        dependent on it? What's simpler to understand?). When they're done with that
        node, they click 'next' until all nodes are done.
Either way, the graph will organize itself into a DAG structure as the nodes are organized.

It is possible that I will chose to combine the graph view, graph builder, and add-a-task
pages to simplify the structure.

Sign up:
--------
The user will be prompted for their first and last names (or perhaps a username instead),
email, and password twice. The page will validate an actual email, strong password, and that
both entered passwords match. There will be a submit button at the bottom.

Log in:
-------
The user enters their email address and password. There will be a submit button.


Technical components:
---------------------
Front End:
----------

I will be building the front end in React. I believe that React is a good
framework for a tool that needs to keep track of its state and update
automatically when the state changes, and render lots of instances of the
same components (nodes and edges). React's focus on modular/component-based
design and managing the flow of state between components will be a good fit
for this project. I will use ES6, and babel to translate it to ES5 for the
browser.

I want to use sass for styling, but more research is necessary.
create-react-app makes my life a lot easier but it doesn't include sass,
or any other css preprocessors. A lot of React styling seems to be done with
css in javascript tools, but I haven't read up much on them yet. I can also
learn to set up React projects myself, or use Mithril instead of React.

I won't have to write almost any HTML for this project, if you don't count
JSX.

Back End:
---------
I am still researching the best way to store a DAG in a relational database.
django-dag is an option, but it doesn't support python 3. I'm familiar enough
with python 2 to write in it, but I don't love the idea of building my
capstone in python 2. Other options include writing my own DAG tools and structures
in python/Django, or translating the necessary parts of django-dag into python 3.
It will be hard to know what my best options are before I start learning django.
I do know what things I will have to store: Nodes (task names and (optional)
descriptions, edges (directional, and optionally including weights) for the graph
are the important and challenging part. Additionally, the database will store user
details including emails, passwords, and names.

Schedule:
---------

First, I'll build out the framework of the front end. This will be what the pages
look like with no tasks added. All forms and buttons such as the login screen will
be present, even though they will be static for the moment. The user will be able
to navigate through the site. Though each page will be empty, they will link correctly
with one another. I will get the basic styling in place at this stage.

Next, I will build the main back end. I don't have a good idea of the tasks involved here yet.
I assume I will learn how to store a DAG in a relational database, and create that model.

Next, I will go back to work on the front end, working to initialize nodes through the user
input and send them to the back end, and also place them on the graph view and graph builder
pages. 

After that, my next task will be to send information about edges to the database, and 
represent the same edges on the graph views. 

An important and challenging task I will have to accomplish is presenting the DAG neatly, 
with nodes with an in-degree of 0 lined up neatly at the top, no edges crossing unless 
necessary, and bubbles neatly spaced so that dependencies and workflow are clearly visualized.

With that accomplished, I will make it possible for the user to delete nodes (and all edges 
originating at that node, of course) from both the graph view(s) and the home page task list.
This should cleanly delete the node from the database and remove it from all front end pages.
The in-degree of all dependant nodes should be reduced by 1. If any new nodes now have an 
in-degree of 0, they will appear on the home screen. 

Next I will build the sign up, log in, log out system, allowing users to save their 
work flows to the database and retrieve it later. 

After that I will clean up the styling as necessary. 

Beyond MVP:
-----------

*If you've done a task before, it will pop up as a suggestion when typing.
*Allow users to choose a color scheme and save their preference.
*Cool mushroom/mycelium themed styling on the graphs.
*(with weights) An algorithm proposes an ideal order for your tasks.
*(with weights) Task times can be marked "active" or "inactive", allowing other work to be 
done while, for instance, code is compiling or bread rising.
*(with weights) optimized paths are generated for multiple people working on the same project.
*Tasks have an optional "active mode" that times how long they take, saving the times to the
database to be used as weights in the future. If "active mode" is used on the same task 
multiple times, either mode or mean value will be used. (Further research needed.)
*(weights) different types of weights can be entered (how long it will take, how difficult 
the user finds it, how resistant the user is to the task), and an algorithm presents task in
an order that will help the user complete their work flow with reduced anxiety. 

  




